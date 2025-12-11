// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
   site: 'https://tntpot.github.io',
   base: '/http-418',
   integrations: [mdx(), sitemap()],

   vite: {
      plugins: [tailwindcss()],
   },
});
