import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { rehypeRedact } from './src/lib/redact.mjs';
import { rehypeRecipeSections } from './src/lib/sections.mjs';

export default defineConfig({
  site: 'https://icecreamtofightwith.com',
  integrations: [sitemap()],
  markdown: {
    // Redact first (wraps profanity in spans), then sectionize — the
    // sections plugin only moves nodes, so order keeps both correct.
    rehypePlugins: [rehypeRedact, rehypeRecipeSections],
  },
});
