// Difficulty-tier palette — verbatim from the Claude Design project
// "Ice Cream Blog Redesign" (content.js `tiers`). The four tiers are the
// load-bearing color system of the editorial design: a heat ramp from
// CHILL green to A FUCKING ORDEAL red. The design reuses CHILL green and
// REAL DEAL orange for the diagrams' CHECKED/CORRECTED notes.
//
// Note: the tierColor field in recipe frontmatter (sync_recipes.py's
// TIER_MAP) predates this palette and is no longer read by any page —
// this module is the single source of truth for tier colors.

export interface TierMeta {
  key: string;
  label: string;
  color: string;
  tint: string;
}

export const TIERS: TierMeta[] = [
  { key: 'CHILL', label: 'CHILL', color: '#2E8B6A', tint: '#E4EFE7' },
  { key: 'LEGIT', label: 'LEGIT', color: '#C98A22', tint: '#F3E9D2' },
  { key: 'THE REAL DEAL', label: 'THE REAL DEAL', color: '#C4562A', tint: '#F3E1D6' },
  { key: 'A FUCKING ORDEAL', label: 'A FUCKING ORDEAL', color: '#A32B29', tint: '#F0DAD7' },
];

export function tierMeta(key: string): TierMeta {
  return (
    TIERS.find((t) => t.key === key) ?? {
      key,
      label: key,
      color: '#A32B29',
      tint: '#F0DAD7',
    }
  );
}
