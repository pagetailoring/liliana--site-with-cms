import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  workers: 1,
  timeout: 60000,
  use: {
    baseURL: 'http://localhost:4412',
    ...(process.env.PLAYWRIGHT_CHANNEL && {
      channel: process.env.PLAYWRIGHT_CHANNEL,
    }),
  },
  webServer: {
    command:
      'tinacms dev --port 4411 --datalayer-port 9411 -c "astro dev --ignore-lock --host localhost --port 4412"',
    url: 'http://localhost:4412/admin/index.html',
    timeout: 120000,
    reuseExistingServer: false,
  },
});
