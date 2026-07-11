// Essay ("The Front Shit") helpers for the editorial redesign.
//
// Essays are the book's front-matter chapters 03-10. 01 (title page) and
// 02 (table of contents) are print artifacts and never rendered on the
// site. The Intro (03) is the homepage; the rest live at /read/<slug>;
// Final Thoughts (10) sorts after the recipes in the filmstrip.

import { getCollection, type CollectionEntry } from 'astro:content';

export interface EssayMeta {
  entry: CollectionEntry<'essays'>;
  num: string; // zero-padded book chapter number, e.g. "03"
  slug: string; // design slug, e.g. "custard-fundamentals"
  title: string; // first heading of the markdown body
  shortTitle: string; // title truncated at "(" or ":" for nav cards
  href: string; // "/" for the intro, "/read/<slug>/" otherwise
}

/** "09_custard_fundamentals" → { num: "09", slug: "custard-fundamentals" } */
export function parseEssayId(id: string): { num: string; slug: string } {
  const m = id.match(/^(\d{2})[_-](.+)$/);
  if (!m) return { num: '00', slug: id };
  return { num: m[1], slug: m[2].replace(/_/g, '-') };
}

function firstHeading(body: string): string {
  const m = body.match(/^#{1,2}\s+(.+)$/m);
  return m ? m[1].trim() : '';
}

/** Mirror of the design's shortTitle(): split at "(" or ":". */
export function shortTitle(title: string): string {
  return title.split(/\s*[(:]/)[0].trim();
}

/** Essays 03-10 in book order, with derived metadata. */
export async function getEssays(): Promise<EssayMeta[]> {
  const entries = await getCollection('essays');
  return entries
    .map((entry) => {
      const { num, slug } = parseEssayId(entry.id);
      const title = firstHeading(entry.body ?? '');
      return {
        entry,
        num,
        slug,
        title,
        shortTitle: shortTitle(title),
        href: slug === 'intro' ? '/' : `/read/${slug}/`,
      };
    })
    .filter((e) => e.num !== '01' && e.num !== '02')
    .sort((a, b) => a.num.localeCompare(b.num));
}
