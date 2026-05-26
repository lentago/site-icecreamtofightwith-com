// Cuisine slug helpers shared between the [slug] route and any
// component that wants to link to a cuisine page (e.g. RecipeMeta).
//
// "Caribbean (Jamaican)"          → "caribbean-jamaican"
// "African (Portuguese-influenced)" → "african-portuguese-influenced"
// "American (Cajun/Creole)"       → "american-cajun-creole"

export function cuisineToSlug(cuisine: string): string {
  return cuisine
    .toLowerCase()
    .replace(/[()]/g, '')      // drop parens
    .replace(/[/]/g, '-')      // slashes become separators
    .replace(/\s+/g, '-')      // whitespace too
    .replace(/-+/g, '-')       // collapse runs
    .replace(/^-|-$/g, '');    // trim
}
