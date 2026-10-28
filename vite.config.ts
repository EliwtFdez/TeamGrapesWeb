import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineSiteConfig } from './src/site.config';

const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
export default defineConfig(({ mode }) => {
  const site = defineSiteConfig({ ...loadEnv(mode, process.cwd(), 'VITE_'), ...process.env });
  return {
    appType: 'mpa',
    plugins: [react(), {
      name: 'team-grapes-page-metadata',
      transformIndexHtml(html, ctx) {
        const path = ctx.path;
        const privacy = path.includes('/privacidad');
        const terms = path.includes('/terminos');
        const missing = path.includes('404');
        const title = privacy ? 'Aviso de privacidad — Team Grapes' : terms ? 'Términos y condiciones — Team Grapes' : missing ? 'Página no encontrada — Team Grapes' : site.title;
        const description = privacy ? 'Conoce cómo Team Grapes trata tus datos, tus derechos y las preferencias de analítica.' : terms ? 'Condiciones de uso del sitio, las demos y el contacto con Team Grapes.' : site.description;
        const canonical = site.origin + (privacy ? '/privacidad/' : terms ? '/terminos/' : missing ? '/404.html' : '/');
        const values = { PAGE_TITLE: title, PAGE_DESCRIPTION: description, PAGE_URL: canonical, SITE_NAME: site.name, OG_IMAGE: site.origin + '/assets/og-image.png', ROBOTS: missing ? 'noindex, nofollow' : 'index, follow' };
        return html.replace(/__([A-Z_]+)__/g, (_, key: keyof typeof values) => escape(values[key] ?? ''));
      },
    }],
    build: {
      target: 'es2022',
      outDir: '.sites-runtime/client',
      emptyOutDir: true,
      rolldownOptions: { input: Object.fromEntries(['index.html', 'privacidad/index.html', 'terminos/index.html', '404.html'].map((entry) => [entry, fileURLToPath(new URL(entry, import.meta.url))])) },
    },
  };
});
