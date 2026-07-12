// Rehype plugin structuring rendered recipe/essay markdown into the editorial
// design's section layout (Claude Design project "Ice Cream Blog Redesign",
// file "Ice Cream to Fight With.dc.html"):
//
//   - Each `## Heading` and its following siblings are wrapped in
//     <section class="recipe-section" data-section="<slug>">.
//   - A paragraph that is nothing but a single <strong> ("**Steep the
//     Base:**") is promoted to an <h3 class="subhead"> — the design's
//     component/step labels.
//   - Inside the Instructions section, each subhead gets a numbered
//     <span class="step"> chip (01, 02, ...), colored per tier via CSS.
//   - The logic-checked "Field Diagrams" (src/data/diagrams.js) are injected
//     inline, immediately after the step/section each one explains, rather
//     than dumped in a trailing/leading block.
//
// Runs after rehypeRedact in the chain, so profanity inside headings has
// already been wrapped; this plugin only moves nodes and appends figures,
// never edits body text.
//
// Plain .mjs so astro.config.mjs can import it.

import { fromHtml } from 'hast-util-from-html';
import { h } from 'hastscript';
import { diagrams } from '../data/diagrams.js';

const isH2 = (node) => node.type === 'element' && node.tagName === 'h2';
const isHeading = (node) =>
  node.type === 'element' && /^h[1-6]$/.test(node.tagName);

const textOf = (node) => {
  if (node.type === 'text') return node.value;
  if (node.children) return node.children.map(textOf).join('');
  return '';
};

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** <p><strong>…</strong></p> (whitespace tolerated) → subhead. */
function isBoldOnlyPara(node) {
  if (node.type !== 'element' || node.tagName !== 'p') return false;
  const meaningful = (node.children ?? []).filter(
    (c) => !(c.type === 'text' && !c.value.trim())
  );
  return meaningful.length === 1 &&
    meaningful[0].type === 'element' &&
    meaningful[0].tagName === 'strong';
}

// --- Field-diagram injection -------------------------------------------

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));

/** Escape, then render the caption/note's **bold** / *em* markdown. */
const mdInline = (text) =>
  escapeHtml(text)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');

const frag = (html) => fromHtml(html, { fragment: true }).children;

/** Build the framed <figure class="dg"> node for one field diagram. Title and
 *  note are <div>s, not <h3>/<p>: the recipe/essay bodies style bare <h3>/<p>
 *  with higher (scoped) specificity, and figures live inside those bodies. */
function figureNode(fig) {
  const corrected = fig.noteType === 'corrected';
  return h('figure', { className: ['dg'] }, [
    h('div', { className: ['dg-head'] }, [
      h('span', { className: ['dg-kicker'] }, 'Field Diagram'),
      h('span', { className: ['dg-fig'] }, fig.fig),
      h('div', { className: ['dg-title'], role: 'heading', 'aria-level': '4' },
        fig.title),
    ]),
    h('div', { className: ['dgdraw'] }, frag(fig.svg)),
    h('figcaption', { className: ['dg-caption'] }, frag(mdInline(fig.caption))),
    h('div', { className: ['dg-note', corrected ? 'corrected' : 'checked'] }, [
      h('span', { className: ['dg-note-label'] },
        `${corrected ? 'CORRECTED' : 'CHECKED'} — `),
      h('span', {}, frag(mdInline(fig.note))),
    ]),
  ]);
}

/** "10_rum_banana.md" / "09_custard_fundamentals.md" → design slug. */
function slugFromFile(file) {
  const path = file?.path || file?.history?.[file.history.length - 1] || '';
  const stem = (path.split(/[\\/]/).pop() || '').replace(/\.md$/, '');
  return stem.replace(/^\d+_/, '').replace(/_/g, '-');
}

/** A heading node matches an anchor slug if its (number-stripped) label
 *  equals the anchor or begins with it — tolerating the trailing
 *  parentheticals recipe step labels carry ("Candied Almonds (make ahead)"). */
function headingMatches(node, anchor) {
  // Prefer the promoted subhead's label span (no leading "01" step chip).
  const labelSpan = (node.children ?? []).find(
    (c) => c.type === 'element' &&
      (c.properties?.className ?? []).includes('subhead-text')
  );
  const slug = slugify(textOf(labelSpan ?? node));
  return slug === anchor || slug.startsWith(anchor + '-');
}

/** Insert `figure` into `section` right after the step block whose heading
 *  matches `anchor` (before the next heading, else at the section end). With
 *  no anchor, append to the end of the section. Returns true on placement. */
function placeInSection(section, anchor, figure) {
  const kids = section.children;
  if (!anchor) {
    kids.push(figure);
    return true;
  }
  const start = kids.findIndex((n) => isHeading(n) && headingMatches(n, anchor));
  if (start < 0) return false;
  let end = kids.length;
  for (let i = start + 1; i < kids.length; i++) {
    if (isHeading(kids[i])) { end = i; break; }
  }
  kids.splice(end, 0, figure);
  return true;
}

/** Drop each mapped figure inline next to the text it explains. */
function injectFigures(sections, slug) {
  const mapping =
    diagrams.byRecipe[slug] ?? diagrams.byEssay[slug] ?? [];
  for (const entry of mapping) {
    const fig = diagrams.figures[entry.fig];
    if (!fig) continue;
    const figure = figureNode(fig);

    // If a section slug is given, confine the search to it. Otherwise scan
    // every section, but try Instructions first: recipes repeat component
    // names as bold ingredient subgroups ("Rum-Caramelized Bananas:"), and a
    // figure explains the *step*, not the ingredient list.
    const inSection = (s) => {
      const ds = s.properties?.dataSection ?? '';
      return ds === entry.section || ds.startsWith(entry.section + '-');
    };
    const candidates = entry.section
      ? sections.filter(inSection)
      : [...sections].sort((a, b) =>
          (b.properties?.dataSection === 'instructions') -
          (a.properties?.dataSection === 'instructions'));

    let placed = false;
    for (const s of candidates) {
      if (placeInSection(s, entry.after, figure)) { placed = true; break; }
    }
    // Fallback: never the very end — append to the Instructions section if
    // present, else the first content section.
    if (!placed) {
      const fallback =
        sections.find((s) => s.properties?.dataSection === 'instructions') ??
        sections[0];
      if (fallback) fallback.children.push(figure);
    }
  }
}

export function rehypeRecipeSections() {
  return (tree, file) => {
    const out = [];
    let section = null;
    // Prose before the first h2 (the recipe's intro paragraphs) is wrapped
    // in .recipe-intro so pages can order intro → sections.
    const intro = {
      type: 'element',
      tagName: 'div',
      properties: { className: ['recipe-intro'] },
      children: [],
    };

    const openSection = (h2) => {
      const name = slugify(textOf(h2));
      section = {
        type: 'element',
        tagName: 'section',
        properties: { className: ['recipe-section'], dataSection: name },
        children: [h2],
        _steps: name === 'instructions',
        _stepCount: 0,
      };
      out.push(section);
    };

    for (const node of tree.children) {
      if (isH2(node)) {
        openSection(node);
        continue;
      }
      if (!section) {
        intro.children.push(node);
        continue;
      }
      if (isBoldOnlyPara(node)) {
        const strong = node.children.find(
          (c) => c.type === 'element' && c.tagName === 'strong'
        );
        const heading = {
          type: 'element',
          tagName: 'h3',
          properties: { className: ['subhead'] },
          children: strong.children,
        };
        if (section._steps) {
          section._stepCount += 1;
          heading.children = [
            {
              type: 'element',
              tagName: 'span',
              properties: { className: ['step'], ariaHidden: 'true' },
              children: [{ type: 'text', value: String(section._stepCount).padStart(2, '0') }],
            },
            {
              type: 'element',
              tagName: 'span',
              properties: { className: ['subhead-text'] },
              children: strong.children,
            },
          ];
        }
        section.children.push(heading);
        continue;
      }
      section.children.push(node);
    }

    // Field diagrams go in before the step-bookkeeping is stripped, so the
    // subhead label spans are still around to match anchors against.
    injectFigures(out, slugFromFile(file));

    for (const s of out) {
      if (s._steps !== undefined) {
        delete s._steps;
        delete s._stepCount;
      }
    }
    tree.children = intro.children.length ? [intro, ...out] : out;
  };
}
