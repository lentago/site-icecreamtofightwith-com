import { defineCollection, z } from 'astro:content';

const recipes = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    subtitle: z.string(),
    date: z.coerce.date(),
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

export const collections = { recipes };
