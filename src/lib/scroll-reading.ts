// Scroll-linked reading — the client half of issue #133 (+ #138).
//
// One shared hook, loaded once from Base.astro, active on every page. Two
// jobs:
//
//   1. Filmstrip sync. Center the active card in the sticky strip on load,
//      and reflect how far the reader is through the current page as a fill
//      on that card (a --read-progress custom property).
//
//   2. Auto-advance / -rewind. Watch the article-end sentinel; once the
//      reader has reached the end of the content, reveal a "keep scrolling
//      for <next>" hint near the pager and, if they over-scroll past the very
//      bottom of the page, navigate to the next page. Symmetrically, if the
//      reader is at the very top and over-scrolls up, navigate to the
//      previous page. Both target the same pages as the visible "Next ->" /
//      "<- Previous" pager links, fire once, guard against loops, and are
//      normal navigations so browser back/forward just works.
//
// The whole thing is progressive enhancement: with JS off, the pager still
// links every page in book order. prefers-reduced-motion disables the
// auto-advance/rewind gestures entirely and makes the filmstrip jump instead
// of glide.

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// --- Filmstrip: center the active card ------------------------------------
const strip = document.querySelector<HTMLElement>('.film-scroll');
const activeCard = strip?.querySelector<HTMLElement>('[data-active="true"]');

function centerActiveCard(behavior: ScrollBehavior) {
  if (!strip || !activeCard) return;
  const target =
    activeCard.offsetLeft - strip.clientWidth / 2 + activeCard.clientWidth / 2;
  strip.scrollTo({ left: Math.max(0, target), behavior });
}

// Center on load. Smooth so the strip visibly settles on "where you are"
// after each navigation; instant under reduced-motion.
centerActiveCard(reduce ? 'auto' : 'smooth');

// --- Filmstrip: reflect read progress on the active card ------------------
const article = document.querySelector<HTMLElement>('article');

function readFraction(): number {
  if (!article) return 0;
  const rect = article.getBoundingClientRect();
  const scrollable = rect.height - window.innerHeight;
  if (scrollable <= 0) return 1;
  return Math.min(1, Math.max(0, -rect.top / scrollable));
}

function paintProgress() {
  if (activeCard) {
    activeCard.style.setProperty('--read-progress', String(readFraction()));
  }
}

// --- Auto-advance / -rewind -----------------------------------------------
const sentinel = document.querySelector<HTMLElement>('[data-article-end]');
const nextLink = document.querySelector<HTMLAnchorElement>(
  '.pager-next:not(.disabled)'
);
// The "Previous" link is the pager link that is NOT the next one.
const prevLink = document.querySelector<HTMLAnchorElement>(
  '.pager-link:not(.pager-next):not(.disabled)'
);
const nextHref = nextLink?.getAttribute('href') || null;
const prevHref = prevLink?.getAttribute('href') || null;
const nextTitle =
  nextLink?.querySelector('.pager-title')?.textContent?.trim() || '';

// A direction is live only when that neighbour exists and the reader hasn't
// asked for reduced motion.
const autoAdvance = Boolean(nextHref) && !reduce; // down -> next
const autoRewind = Boolean(prevHref) && !reduce; // up -> previous

let armed = false; // reader has reached the end-of-content sentinel
let overscroll = 0; // accumulated downward intent past the page bottom
let overscrollUp = 0; // accumulated upward intent past the page top
let navigated = false; // one-shot guard against navigation loops
const OVERSCROLL_TRIGGER = 170; // px of deliberate over-scroll to turn a page

function atBottom(): boolean {
  return (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 2
  );
}

function atTop(): boolean {
  return window.scrollY <= 2;
}

// Normal navigations: each pushes a history entry, so back/forward behaves.
function go() {
  if (navigated || !nextHref) return;
  navigated = true;
  window.location.href = nextHref;
}

function goPrev() {
  if (navigated || !prevHref) return;
  navigated = true;
  window.location.href = prevHref;
}

// Bottom hint + arming: the sentinel reveals a "keep scrolling for <next>"
// cue and arms the downward gesture once the reader reaches the end.
if (autoAdvance && sentinel) {
  const hint = document.createElement('div');
  hint.className = 'keep-scrolling';
  hint.setAttribute('aria-hidden', 'true');
  hint.innerHTML =
    'Keep scrolling for <span class="ks-title"></span> <span class="ks-arrow">&darr;</span>';
  hint.querySelector('.ks-title')!.textContent = nextTitle;
  const pager = article?.querySelector('.pager');
  pager?.parentElement?.insertBefore(hint, pager);

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        armed = entry.isIntersecting;
        hint.classList.toggle('show', armed);
        if (!armed) overscroll = 0;
      }
    },
    { rootMargin: '0px 0px -20% 0px' }
  );
  io.observe(sentinel);
}

// Gesture listeners serve both directions; each branch is independently
// gated, so a page with only a previous (the last recipe) still rewinds, and
// a page with only a next (the intro) still advances. Passive listeners —
// normal scrolling is never blocked; only a deliberate over-scroll past an
// edge turns the page.
if (autoAdvance || autoRewind) {
  window.addEventListener(
    'wheel',
    (e) => {
      if (navigated) return;
      // Down -> next: extra downward wheeling while pinned at the bottom.
      if (autoAdvance && armed && atBottom() && e.deltaY > 0) {
        overscroll += e.deltaY;
        if (overscroll >= OVERSCROLL_TRIGGER) go();
      } else if (e.deltaY < 0) {
        overscroll = 0;
      }
      // Up -> previous: extra upward wheeling while pinned at the top.
      if (autoRewind && atTop() && e.deltaY < 0) {
        overscrollUp += -e.deltaY;
        if (overscrollUp >= OVERSCROLL_TRIGGER) goPrev();
      } else if (e.deltaY > 0) {
        overscrollUp = 0;
      }
    },
    { passive: true }
  );

  // Touch: a drag past an edge is the same intent. Finger up = scroll-down
  // intent (dragDelta > 0); finger down = scroll-up intent (dragDelta < 0).
  let touchY = 0;
  window.addEventListener(
    'touchstart',
    (e) => {
      touchY = e.touches[0]?.clientY ?? 0;
    },
    { passive: true }
  );
  window.addEventListener(
    'touchmove',
    (e) => {
      if (navigated) return;
      const y = e.touches[0]?.clientY ?? 0;
      const dragDelta = touchY - y;
      touchY = y;
      if (autoAdvance && armed && atBottom() && dragDelta > 0) {
        overscroll += dragDelta;
        if (overscroll >= OVERSCROLL_TRIGGER) go();
      } else if (dragDelta < 0) {
        overscroll = 0;
      }
      if (autoRewind && atTop() && dragDelta < 0) {
        overscrollUp += -dragDelta;
        if (overscrollUp >= OVERSCROLL_TRIGGER) goPrev();
      } else if (dragDelta > 0) {
        overscrollUp = 0;
      }
    },
    { passive: true }
  );
}

// --- Scroll listener (progress + overscroll reset) ------------------------
let ticking = false;
window.addEventListener(
  'scroll',
  () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      paintProgress();
      if (!atBottom()) overscroll = 0;
      if (!atTop()) overscrollUp = 0;
      ticking = false;
    });
  },
  { passive: true }
);

paintProgress();
