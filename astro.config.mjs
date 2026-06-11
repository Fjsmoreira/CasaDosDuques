// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
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
