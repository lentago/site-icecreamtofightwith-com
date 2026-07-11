import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// The 10 front-matter chapters of the book ("The Front Shit"). No YAML
// frontmatter of their own — num/slug/title are derived from filename and
// first heading in src/lib/essays.ts. 01 (title page) and 02 (TOC) are
// print-only and excluded at the query layer, not here.
const essays = defineCollection({
  loader: glob({ pattern: '[0-9][0-9]_*.md', base: './front_matter' }),
});

const recipes = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    subtitle: z.string(),
    tier: z.string(),
    tierOrder: z.number(),
    tierColor: z.string(),
    difficultyText: z.string(),
    totalTime: z.string(),
    recipeSlug: z.string(),
    recipeNumber: z.number(),
    illustration: image().optional(),
    cuisine: z.string().optional(),
    activeTimeMinutes: z.number().optional(),
    totalTimeMinutesMin: z.number().optional(),
    totalTimeMinutesMax: z.number().optional(),
    recipeYield: z.string().optional(),
    dietary: z.array(z.string()).optional(),
  }),
});

export const collections = { recipes, essays };
