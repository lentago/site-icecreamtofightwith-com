import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { redactPlain } from '../lib/redact.mjs';

export async function GET(context: APIContext) {
  const recipes = await getCollection('recipes');
  // Newest dispatch first — a proper reverse-chronological wire feed.
  recipes.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: 'Ice Cream to Fight With',
    description: redactPlain("Recipes You'll Fuck Up At Least Once — a photocopied ice cream zine from around the world."),
    site: context.site!,
    items: recipes.map(recipe => ({
      title: recipe.data.title,
      description: recipe.data.subtitle,
      link: `/recipes/${recipe.data.recipeSlug}/`,
      pubDate: recipe.data.date,
      categories: [
        redactPlain(recipe.data.tier),
        ...(recipe.data.cuisine ? [recipe.data.cuisine] : []),
        ...(recipe.data.dietary ?? []),
      ],
    })),
    customData: '<language>en-us</language>',
  });
}
