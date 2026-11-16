// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages: https://theodorofelipe.github.io/mediakit/
// Com domínio próprio no futuro: trocar `site` pelo domínio, `base` volta a ser '/'
// e criar public/CNAME com o domínio.
export default defineConfig({
  site: 'https://theodorofelipe.github.io',
  base: '/mediakit',
  vite: {
    plugins: [tailwindcss()],
  },
});
