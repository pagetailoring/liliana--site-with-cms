---
title: Site foundation on Astro + TinaCMS Cloud + Cloudflare
triage: ready-for-agent
createdAt: 2026-11-25
status: Phase 1 is fully decided; Phases 2-3 are blocked by the open questions in Further Notes
---

# Site foundation on Astro + TinaCMS Cloud + Cloudflare

## Problem Statement

An existing website built with a different framework has to move to a new
stack: Astro, TinaCMS (free Tina Cloud plan) and Cloudflare hosting. The
repository currently holds an unmodified copy of the official
`tinacms/tina-astro-starter` template. That template ships a lot of demo
material (blog posts, block library, space-themed decorations, placeholder
images, mascot assets), adapters for four hosting platforms, and dependency
versions one major release behind current (Astro 6 vs 7, Vite 7 vs 8,
TypeScript 6 vs 7, Cloudflare adapter 13 vs 14). It has no linting or
formatting setup, its SEO setup has gaps, and the lockfile is ignored by Git.

The developer wants a clean, current foundation to port the existing site
onto. Two risks pull in opposite directions:

- Upgrading packages may break the TinaCMS integration. Earlier experience
  with Tina + Astro showed that Tina makes a strict TypeScript setup hard,
  and the template itself still excludes the Tina config from type checking.
- Leaving outdated packages and demo leftovers means dragging technical debt
  into the new project.

The developer also needs confidence that connecting the repository to a fresh
Tina Cloud account and to Cloudflare works before any changes are made, so
that later failures can be attributed to our changes and not to account or
hosting setup.

## Solution

Work in three stacked branches, each a known-good, comparable snapshot:

1. **Baseline** (`develop`): the untouched template, connected end-to-end to
   a fresh Tina Cloud project and to Cloudflare. Proves the account, repo,
   credentials and deploy pipeline work.
2. **Cleanup** (branched from baseline): all demo content, demo assets, demo
   styles and unused hosting adapters removed, leaving a "Hello world" page
   with lorem ipsum content that is still editable in Tina. Package versions
   unchanged.
3. **Upgrade** (branched from cleanup): packages bumped to current majors and
   base tooling configured (linting, formatting, SEO gaps closed), in small
   commits, each verified against Tina and Cloudflare.

If the upgrade branch breaks the integration, the developer can diff it
against the cleanup branch and re-apply changes one at a time to find the
culprit, or restart from the baseline, without losing prepared work.

Content lives in the repository as Markdown/MDX/JSON. Tina Cloud indexes it
from GitHub and writes edits back as commits, so connecting a new account
requires no content migration.

## User Stories

1. As the developer, I want the first commit message typo fixed before
   anything is connected, so that external services index a clean history.
2. As the developer, I want the lockfile committed, so that every branch and
   every Cloudflare build installs exactly the same dependency versions.
3. As the developer, I want the untouched template connected to a new Tina
   Cloud project, so that I know the account and GitHub connection work.
4. As the developer, I want the untouched template deployed to Cloudflare, so
   that I know the hosting pipeline works before I change code.
5. As the developer, I want Tina credentials stored locally in an ignored env
   file and in Cloudflare build variables, so that secrets never reach Git.
6. As the developer, I want Tina to default to our working branch instead of
   `main`, so that the CMS edits the branch we actually use.
7. As the developer, I want the production site URL configured on
   Cloudflare, so that canonical URLs, sitemap and OpenGraph tags do not
   point at localhost.
8. As the developer, I want a baseline branch that never changes after it is
   verified, so that I can always restart from a known-good state.
9. As the developer, I want a cleanup branch with all demo content removed,
   so that I start porting the old site onto an empty foundation.
10. As the developer, I want demo blog posts, demo pages and demo images
    removed, so that no template content leaks into production.
11. As the developer, I want demo-only components (space decorations, block
    library, demo UI pieces) removed, so that the codebase holds only what we
    use.
12. As the developer, I want demo styles removed, so that our design starts
    from a neutral stylesheet.
13. As the developer, I want a single "Hello world" page with lorem ipsum
    content, so that I have a minimal page proving rendering works.
14. As a content editor, I want to edit the "Hello world" page title,
    description and body in Tina, so that the editing flow is proven on the
    clean foundation.
15. As a content editor, I want visual (click-to-edit) editing to keep
    working after cleanup, so that the editing experience is not lost.
16. As a content editor, I want site-wide settings (site title, default SEO
    description) editable in Tina, so that I can change them without a
    developer.
17. As the developer, I want unused hosting adapters and their auto-detection
    removed, so that only Cloudflare remains and the dependency list is
    smaller.
18. As the developer, I want the Cloudflare config renamed from the template
    name to the project name, so that the deployed worker is identifiable.
19. As the developer, I want an upgrade branch built on top of cleanup, so
    that the upgrade touches as little code as possible.
20. As the developer, I want Astro, its Cloudflare adapter and MDX upgraded
    together in one commit, so that peer dependencies stay consistent.
21. As the developer, I want Vite upgraded in its own commit, so that a break
    in the Tina admin build (which runs on Vite) can be isolated.
22. As the developer, I want TypeScript upgraded last and in its own commit,
    so that tooling breakage (type checking, Tina generated types) can be
    isolated or deferred.
23. As the developer, I want any package that cannot be upgraded pinned with
    a written reason, so that the remaining debt is explicit and minimal.
24. As the developer, I want strict TypeScript in the site source, so that
    our own code is type-safe even if the Tina config cannot be.
25. As the developer, I want a type-check script, so that type errors are
    caught before deploy.
26. As the developer, I want linting and formatting configured with scripts,
    so that code style is consistent and checkable.
27. As the developer, I want the Node version pinned to one LTS version used
    locally and on Cloudflare, so that builds are reproducible.
28. As a site owner, I want a robots.txt that references the sitemap, so that
    search engines crawl the site correctly.
29. As a site owner, I want the page language set to the site's language, so
    that search engines and screen readers treat content correctly.
30. As a site owner, I want OpenGraph locale and a project-owned default
    social image, so that shared links do not show template placeholders.
31. As a site owner, I want basic structured data (JSON-LD) for the site, so
    that search engines understand who owns it.
32. As a site owner, I want each page's title and description editable in
    Tina, so that SEO metadata is managed with the content.
33. As the developer, I want each branch verified with the same checks, so
    that branches are comparable and a regression is visible immediately.
34. As the developer, I want to compare the cleanup and upgrade branches with
    a plain diff, so that I can locate a breaking change quickly.

## Implementation Decisions

- **Branch strategy.** `develop` holds the verified, untouched template and
  is the baseline. A cleanup branch is created from it; an upgrade branch is
  created from the cleanup branch. Branches are kept after merge decisions so
  they stay available for comparison.
- **Order of work.** Prerequisites (history fix, lockfile) → Phase 1 baseline
  connection → Phase 2 cleanup → Phase 3 upgrade and tooling. Each phase must
  pass the verification checks before the next starts.
- **Prerequisite: history fix.** The root commit message typo is fixed by
  amending the root commit and force-pushing with lease. It must happen
  before Tina Cloud and Cloudflare are connected. Requires explicit user
  confirmation at execution time.
- **Prerequisite: lockfile.** The template's ignore rule for lockfiles is
  removed (the template marks it as a TODO) and the pnpm lockfile is
  committed.
- **Phase 1: Tina Cloud.** A new Tina Cloud project (free plan) is connected
  to the GitHub repository. The client ID and token are provided through
  environment variables, never committed. The default Tina branch fallback is
  changed from `main` to `develop`. Each branch is indexed by Tina Cloud
  separately.
- **Phase 1: Cloudflare.** The site is deployed with the existing Cloudflare
  configuration (with `nodejs_compat`, needed by the Tina visual editing
  route). Tina credentials and the production site URL are set as Cloudflare
  build variables.
- **Phase 2: content model.** Demo collections and demo content are removed
  down to the minimum that still exercises Tina: a page collection rendering a
  "Hello world" page with lorem ipsum body, plus site-wide settings. Whether
  the blog, RSS feed and block system survive is an open question.
- **Phase 2: hosting adapters.** Only the Cloudflare adapter remains. The
  adapter auto-detection and site URL detection for other platforms are
  removed; site URL comes from an explicit variable with a local fallback.
- **Phase 2: no version changes.** Package versions stay as in the baseline,
  only removals happen, so cleanup and upgrade risks are not mixed.
- **Phase 3: upgrade order.** (a) Astro 7 with the Cloudflare adapter 14
  (which also requires `wrangler` as a peer) and MDX 8; (b) Vite 8;
  (c) TypeScript 7; (d) remaining minor/major bumps (sharp, Node types, and
  any surviving front-end packages). One commit per step, verified after each.
  `@tinacms/astro` declares support for Astro 7, so step (a) is moderate risk;
  steps (b) and (c) are higher risk.
- **Phase 3: TypeScript strictness.** Strict mode applies to the site source.
  The Tina config and collections stay excluded from strict type checking, as
  in the template, because they are compiled by Tina's own bundler.
- **Phase 3: tooling.** A type-check script, a lint script and a format
  script are added. The tool choice is an open question.
- **Phase 3: SEO.** Add robots.txt with sitemap reference, set the document
  language, add OpenGraph locale, replace the template default social image,
  add site-level JSON-LD, and keep canonical, sitemap and OpenGraph tags
  driven by the configured site URL.
- **Repository language.** All repository text (code, comments, content,
  commits, docs) is English. Demo content is "Hello world" and lorem ipsum.

## Testing Decisions

- **What makes a good test.** Tests check external behavior only: does the
  site build, what does the built HTML contain, does editing in Tina and
  deploying to Cloudflare work. They do not check component internals or file
  layout.
- **Seam 1: build.** The full production build (Tina build followed by Astro
  build) completes without errors. This is the primary automated seam and runs
  on every branch and every upgrade commit.
- **Seam 2: built HTML.** The static output of the "Hello world" page is
  inspected for: title and meta description from Tina content, canonical URL
  on the configured site URL, OpenGraph tags, document language, and the
  presence of the sitemap and robots.txt. Applies from Phase 3 onward (Phase 1
  and 2 only check the page renders).
- **Seam 3: manual smoke test.** The Tina admin loads, an edit made in Tina
  is committed back to the repository on the correct branch, visual editing
  works on the page, and the Cloudflare deploy serves the change. Run once per
  phase and after each risky upgrade step.
- **Prior art.** The repository has no tests. The template's README documents
  the build and deploy commands used by Seam 1 and Seam 3.

## Out of Scope

- Porting content, pages and design from the existing site in the other
  framework.
- Final visual design, theming and component library.
- Tina Cloud paid features (editorial workflow, extra users) and Tina search
  indexing.
- Hosting platforms other than Cloudflare.
- Custom domain, DNS and analytics setup.
- End-to-end browser test automation (e.g. Playwright).

## Further Notes

Open questions that must be answered before Phase 2 starts:

1. Cloudflare Workers or Cloudflare Pages? The template's Cloudflare config
   targets Workers.
2. Linting and formatting: ESLint + Prettier, or Biome?
3. Node version to pin: 22 LTS (current template pin) or 24 LTS? The local
   machine runs Node 26.
4. Front-end packages to keep: Tailwind and its plugins (typography,
   tailwind-variants, clsx, tailwind-merge), astro-icon with Tabler icons,
   the Inter font, the dark mode toggle, and client-side page transitions.
5. Content features to keep: blog collection and RSS feed, the block system
   (Hero, CTA, etc.), MDX custom components (YouTube embed, code block).
6. Site language code for the document language attribute.

Context from the initial review (2026-11-24):

- Current vs latest: astro 6.4.8 → 7.4.13; @astrojs/cloudflare 13.7.0 →
  14.4.9; @astrojs/mdx 6.0.3 → 8.1.6; vite 7.3.8 → 8.3.8; typescript 6.0.3
  → 7.0.2; tailwind-variants 3 → 4; sharp 0.34 → 0.35. Tina packages are
  current.
- The template has no robots.txt, no structured data, a hardcoded document
  language, and a template placeholder as default social image.
- Cloudflare Workers does not inject a deploy URL, so the site URL variable
  must be set there explicitly.
