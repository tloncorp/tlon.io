import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/static';

// https://astro.build/config
export default defineConfig({
  redirects: {
    '/landscape': '/tlonward',
    '/tlon': '/a-place-to-call-our-own',
  },
  integrations: [tailwind()],
  output: 'static',
  adapter: vercel(),
});