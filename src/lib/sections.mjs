// Rehype plugin structuring rendered recipe markdown into the editorial
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
//
// Runs after rehypeRedact in the chain, so profanity inside headings has
// already been wrapped; this plugin only moves nodes, never edits text.
//
// Plain .mjs so astro.config.mjs can import it, same as redact.mjs.

const isH2 = (node) => node.type === 'element' && node.tagName === 'h2';

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

export function rehypeRecipeSections() {
  return (tree) => {
    const out = [];
    let section = null;
    // Prose before the first h2 (the recipe's intro paragraphs) is wrapped
    // in .recipe-intro so pages can order intro → diagrams → sections.
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

    for (const s of out) {
      if (s._steps !== undefined) {
        delete s._steps;
        delete s._stepCount;
      }
    }
    tree.children = intro.children.length ? [intro, ...out] : out;
  };
}
