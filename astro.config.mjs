// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwind from '@astrojs/tailwind';


// https://astro.build/config
export default defineConfig({
  site: 'https://sarisusanti.id',
  output: 'static',
  server: { port: 3000 },
  adapter: vercel(),
  integrations: [
    preact({ compat: true }),
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: 'id',
        locales: {
          id: 'id-ID',
          en: 'en-US',
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'id',
    locales: ['id', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
    fallback: {
      en: 'id',
    },
  },
});
