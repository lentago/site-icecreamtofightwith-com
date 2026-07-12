// Scroll-linked reading — the client half of issue #133.
//
// One shared hook, loaded once from Base.astro, active on every page. Two
// jobs:
//
//   1. Filmstrip sync. Center the active card in the sticky strip on load,
//      and reflect how far the reader is through the current page as a fill
//      on that card (a --read-progress custom property).
//
//   2. Auto-advance. Watch the article-end sentinel; once the reader has
//      reached the end of the content, reveal a "keep scrolling for <next>"
//      hint near the pager and, if they over-scroll past the very bottom of
//      the page, navigate to the next page in book order (the same target as
//      the visible "Next ->" pager link). Fires once, guards against loops,
//      and is a normal navigation so browser back/forward just works.
//
// The whole thing is progressive enhancement: with JS off, the pager still
// links every page in book order. prefers-reduced-motion disables the
// auto-advance gesture entirely and makes the filmstrip jump instead of
// glide.

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

// --- Auto-advance ---------------------------------------------------------
const sentinel = document.querySelector<HTMLElement>('[data-article-end]');
const nextLink = document.querySelector<HTMLAnchorElement>(
  '.pager-next:not(.disabled)'
);
const nextHref = nextLink?.getAttribute('href') || null;
const nextTitle =
  nextLink?.querySelector('.pager-title')?.textContent?.trim() || '';

// Auto-advance only makes sense when there IS a next page and the reader
// hasn't asked for reduced motion. Everything below is skipped otherwise.
const autoAdvance = Boolean(nextHref) && !reduce;

let armed = false; // reader has reached the end-of-content sentinel
let overscroll = 0; // accumulated downward intent past the page bottom
let navigated = false; // one-shot guard against navigation loops
const OVERSCROLL_TRIGGER = 170; // px of deliberate over-scroll to advance

function atBottom(): boolean {
  return (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 2
  );
}

function go() {
  if (navigated || !nextHref) return;
  navigated = true;
  // Normal navigation: pushes a history entry, so back/forward behaves.
  window.location.href = nextHref;
}

if (autoAdvance && sentinel) {
  // A subtle, discoverable hint that scrolling on will turn the page.
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

  // Desktop: at the very bottom, extra downward wheeling is over-scroll.
  window.addEventListener(
    'wheel',
    (e) => {
      if (!armed || navigated) return;
      if (e.deltaY > 0 && atBottom()) {
        overscroll += e.deltaY;
        if (overscroll >= OVERSCROLL_TRIGGER) go();
      } else if (e.deltaY < 0) {
        overscroll = 0;
      }
    },
    { passive: true }
  );

  // Touch: a drag-up gesture while pinned at the bottom is the same intent.
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
      if (!armed || navigated) return;
      const y = e.touches[0]?.clientY ?? 0;
      const dragUp = touchY - y; // finger up = scroll-down intent
      touchY = y;
      if (dragUp > 0 && atBottom()) {
        overscroll += dragUp;
        if (overscroll >= OVERSCROLL_TRIGGER) go();
      } else if (dragUp < 0) {
        overscroll = 0;
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
      ticking = false;
    });
  },
  { passive: true }
);

paintProgress();
