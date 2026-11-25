# Liliana

Astro prerenders pages from Tina's JSON documents. Cloudflare Workers serves the site and the on-demand visual editing endpoint.

## Local development

Use Node 24 and the pnpm version pinned in `package.json`.

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm dev
```

Open the site at `http://localhost:4321/` or the editor at `http://localhost:4321/admin/`. Local editing writes to the repository. Pages live in `src/content/page/`; `home.json` renders at the root. Site settings live in `src/content/config/config.json`.

## Verification

```sh
corepack pnpm build:local
corepack pnpm verify
```

The local build generates Tina's client, the admin UI and the Worker using local content. Run `corepack pnpm preview` to serve the built output with Wrangler.

## Cloudflare Workers Builds

Set `PUBLIC_TINA_CLIENT_ID`, `TINA_TOKEN`, and `SITE_URL` in the Worker's **Build variables and secrets**. Keep the token secret. The build uses the Git branch supplied by Workers Builds. TinaCloud must have indexed the branch and its committed schema.

Use `pnpm run build` for the build command and `pnpm run deploy` for the deploy command. The production build reads local documents while generating a client connected to TinaCloud for the editor.
