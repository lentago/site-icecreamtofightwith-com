// Render-layer profanity redaction for icecreamtofightwith.com.
//
// The book swears on purpose — the linter (ice_cream_linter.py) *requires*
// 3-5 strategic profanities per recipe, so the markdown source must stay
// uncensored. This module bleeps the website at render time instead:
//
//   - redactHtml():  visible text → <span class="redacted"> hover-to-reveal
//                    black bars (CSS lives in Base.astro)
//   - redactPlain(): plain-text sinks (<title>, meta description, JSON-LD,
//                    RSS, pagefind metadata) → "F*ck*ng" asterisk style,
//                    so crawlers and link previews never see the whole word
//   - rehypeRedact:  applies the span treatment to rendered markdown
//                    bodies (the 28 recipes), wired up in astro.config.mjs
//
// Redaction is deliberately partial: only the vowels of each profanity
// are barred ("F█CK█NG ORDEAL"), so the word stays perfectly legible
// while remaining technically, deniably redacted. You can't prove
// anything.
//
// Plain .mjs (not .ts) so astro.config.mjs can import it too.

// Mirrors the linter's PROFANITY list (fuck, shit, damn, hell, ass) plus
// the compound/derived forms that actually appear in the corpus. Boundaries
// are tuned so class, molasses, grass, glass, mass, hello, and Hass (the
// avocado) survive unredacted.
const REDACT_SOURCE = [
  String.raw`\w*(?:fuck|shit|damn)\w*`, // fucking, bullshit, batshit, goddamn, ...
  String.raw`\bbastard\w*`, //              bastard, bastardizing, ...
  String.raw`\bbitch\w*`,
  String.raw`\bhell(?:fire|ish|hole|acious)?\b`, // hell, hellfire — not hello, shell
  String.raw`\b(?:dumb|jack|bad)?ass(?:hole)?(?:es|ed|s)?\b`, // ass(es), badass, half-assed
].join('|');

const redactRe = () => new RegExp(REDACT_SOURCE, 'gi');

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[c]);

// data-pagefind-ignore keeps the barred letters out of the on-site search
// index — the black bars stay black even in search excerpts.
const SPAN_OPEN = '<span class="redacted" data-pagefind-ignore>';

/**
 * Split a matched profanity into alternating keep/bar segments: each
 * vowel run gets the bar, consonants stay visible. A vowelless match
 * (shouldn't happen with this word list) is barred whole.
 */
function partialSegments(word) {
  const segs = [];
  const re = /[aeiou]+/gi;
  let last = 0;
  let m;
  while ((m = re.exec(word))) {
    if (m.index > last) segs.push({ text: word.slice(last, m.index), bar: false });
    segs.push({ text: m[0], bar: true });
    last = m.index + m[0].length;
  }
  if (last < word.length) segs.push({ text: word.slice(last), bar: false });
  if (!segs.some((s) => s.bar)) return [{ text: word, bar: true }];
  return segs;
}

/** Escape `text` and bar the vowels of each profanity (hover to reveal). */
export function redactHtml(text) {
  const re = redactRe();
  let out = '';
  let last = 0;
  let m;
  while ((m = re.exec(text))) {
    out += escapeHtml(text.slice(last, m.index));
    for (const seg of partialSegments(m[0])) {
      out += seg.bar ? SPAN_OPEN + escapeHtml(seg.text) + '</span>' : escapeHtml(seg.text);
    }
    last = m.index + m[0].length;
  }
  return out + escapeHtml(text.slice(last));
}

/** Bowdlerize for plain-text contexts: "Fucking" → "F*ck*ng". */
export function redactPlain(text) {
  return text.replace(redactRe(), (w) =>
    partialSegments(w)
      .map((seg) => (seg.bar ? '*'.repeat(seg.text.length) : seg.text))
      .join('')
  );
}

const SKIP_TAGS = new Set(['code', 'pre', 'script', 'style']);

function redactTextNode(value) {
  const re = redactRe();
  const nodes = [];
  let last = 0;
  let m;
  while ((m = re.exec(value))) {
    if (m.index > last) nodes.push({ type: 'text', value: value.slice(last, m.index) });
    for (const seg of partialSegments(m[0])) {
      if (seg.bar) {
        nodes.push({
          type: 'element',
          tagName: 'span',
          properties: { className: ['redacted'], dataPagefindIgnore: '' },
          children: [{ type: 'text', value: seg.text }],
        });
      } else {
        nodes.push({ type: 'text', value: seg.text });
      }
    }
    last = m.index + m[0].length;
  }
  if (last < value.length) nodes.push({ type: 'text', value: value.slice(last) });
  return nodes;
}

function walk(node) {
  if (!node.children) return;
  if (node.type === 'element' && SKIP_TAGS.has(node.tagName)) return;
  const out = [];
  for (const child of node.children) {
    if (child.type === 'text' && redactRe().test(child.value)) {
      out.push(...redactTextNode(child.value));
    } else {
      walk(child);
      out.push(child);
    }
  }
  node.children = out;
}

/** Rehype plugin: redact profanity in rendered markdown (recipe bodies). */
export function rehypeRedact() {
  return (tree) => walk(tree);
}
