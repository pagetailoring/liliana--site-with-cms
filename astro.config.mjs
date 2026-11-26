// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tina from '@tinacms/astro/integration';
import { tinaAdminDevRedirect } from '@tinacms/astro/vite';

// Pages prerender to HTML. The Worker renders /tina-island/* on demand
// so the editor can display draft content without publishing it.
export default defineConfig({
  site: process.env.SITE_URL || 'https://liliana.gd',
  output: 'static',
  // Tina exposes its build-only GraphQL URL through the Node process environment.
  // The deployed island endpoint still runs inside the Cloudflare Worker.
  adapter: cloudflare({
    prerenderEnvironment: process.env.TINA_LOCAL_URL ? 'node' : 'workerd',
  }),
  integrations: [sitemap(), tina()],
  vite: {
    plugins: [tinaAdminDevRedirect()],
    ssr: { noExternal: ['@tinacms/astro', '@tinacms/bridge'] },
  },
});
