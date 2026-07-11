import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const recipes = await getCollection('recipes');
  // Order by recipeNumber so the feed walks the book front-to-back.
  // The frontmatter doesn't carry a pubDate; this is the closest stable
  // proxy until we start tracking real publish dates.
  recipes.sort((a, b) => a.data.recipeNumber - b.data.recipeNumber);

  return rss({
    title: 'Ice Cream to Fight With',
    description: "Recipes You'll Fuck Up At Least Once — custard-based ice cream from around the world.",
    site: context.site!,
    items: recipes.map(recipe => ({
      title: recipe.data.title,
      description: recipe.data.subtitle,
      link: `/recipes/${recipe.data.recipeSlug}/`,
      categories: [
        recipe.data.tier,
        ...(recipe.data.cuisine ? [recipe.data.cuisine] : []),
        ...(recipe.data.dietary ?? []),
      ],
    })),
    customData: '<language>en-us</language>',
  });
}
