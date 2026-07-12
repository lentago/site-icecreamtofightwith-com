// The book as one flat reading sequence, shared by every page's pager and
// by the scroll-linked auto-advance (see the client hook in Base.astro).
//
// Order mirrors the filmstrip exactly: front-matter essays 03-10 (Final
// Thoughts sorts last, right before the divider), then recipes 01-28 in
// difficulty order. Back matter (99_closing) is print-only and has no site
// page, so the last recipe simply has no "next".
//
// Each page already knew its own neighbours, but only within its own
// collection — an essay's "next" stopped at the last essay, a recipe's
// "prev" stopped at recipe 01. This module joins the two so the seam
// (last essay -> first recipe) is a real link, which is what lets the
// end-of-scroll gesture carry the reader across it.

import { getCollection } from 'astro:content';
import { getEssays } from './essays';
import { designSlug } from './design';

export interface BookStop {
  kind: 'essay' | 'recipe';
  /** Matches the filmstrip's data-active slug: essay slug or recipe design slug. */
  slug: string;
  href: string;
  /** Short title for the pager label and the "keep scrolling" affordance. */
  title: string;
}

/** The full front-to-back reading order, essays then recipes. */
export async function getBookOrder(): Promise<BookStop[]> {
  const essays = await getEssays();
  const recipes = (await getCollection('recipes')).sort(
    (a, b) => a.data.recipeNumber - b.data.recipeNumber
  );

  const essayStops: BookStop[] = essays.map((e) => ({
    kind: 'essay',
    slug: e.slug,
    href: e.href,
    title: e.shortTitle,
  }));
  const recipeStops: BookStop[] = recipes.map((r) => ({
    kind: 'recipe',
    slug: designSlug(r.data.recipeSlug),
    href: `/recipes/${r.data.recipeSlug}/`,
    title: r.data.title,
  }));

  return [...essayStops, ...recipeStops];
}

/** Prev/next around the given page in book order (null past either end). */
export function bookNeighbors(
  order: BookStop[],
  kind: BookStop['kind'],
  slug: string
): { prev: BookStop | null; next: BookStop | null } {
  const i = order.findIndex((s) => s.kind === kind && s.slug === slug);
  return {
    prev: i > 0 ? order[i - 1] : null,
    next: i >= 0 && i < order.length - 1 ? order[i + 1] : null,
  };
}
