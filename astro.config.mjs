import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { rehypeRecipeSections } from './src/lib/sections.mjs';

export default defineConfig({
  site: 'https://icecreamtofightwith.com',
  integrations: [sitemap()],
  markdown: {
    // Structure recipe bodies into the editorial section layout. The book's
    // profanity renders uncensored — no redaction pass.
    rehypePlugins: [rehypeRecipeSections],
  },
});
