import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';

export default defineConfig({
  site: 'https://icecreamtofightwith.com',
  integrations: [sitemap(), pagefind()],
});
