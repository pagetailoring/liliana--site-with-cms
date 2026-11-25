import { defineConfig } from 'tinacms';
import { GlobalConfigCollection } from './collections/global-config';
import { PageCollection } from './collections/page';

export default defineConfig({
  branch:
    process.env.WORKERS_CI_BRANCH || process.env.GITHUB_BRANCH || 'develop',
  clientId: process.env.PUBLIC_TINA_CLIENT_ID ?? null,
  token: process.env.TINA_TOKEN ?? null,
  build: { outputFolder: 'admin', publicFolder: 'public' },
  media: { tina: { mediaRoot: 'uploads', publicFolder: 'public' } },
  schema: { collections: [PageCollection, GlobalConfigCollection] },
});
