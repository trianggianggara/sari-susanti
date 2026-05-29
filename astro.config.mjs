// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://sarisusanti.id',
  output: 'static',
  server: { port: 3000 },
  adapter: node({ mode: 'standalone' }),
  integrations: [
    preact({ compat: true }),
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
      prefixDefaultLocale: true,
    },
    fallback: {
      en: 'id',
    },
  },
});
