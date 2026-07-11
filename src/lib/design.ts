// Bridges between the site's content pipeline and the editorial design's
// data keys (Claude Design project "Ice Cream Blog Redesign").
//
// The site's recipeSlug keeps the numbered filename stem ("01_coconut_pandan")
// so URLs don't churn; the design keys its per-recipe data (backgrounds,
// field diagrams) by clean slugs ("coconut-pandan"). designSlug() is the join.

/** "01_coconut_pandan" → "coconut-pandan" */
export function designSlug(recipeSlug: string): string {
  return recipeSlug.replace(/^\d+_/, '').replace(/_/g, '-');
}

/** "Recipe #07" chip text etc.: 7 → "07" */
export function pad2(n: number): string {
  return String(n).padStart(2, '0');
}
