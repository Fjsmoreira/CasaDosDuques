// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  site: 'https://casadosduques.pt',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt', 'nl', 'fr'],
    routing: {
      prefixDefaultLocale: false,
      fallbackType: 'redirect',
    },
  },
});
