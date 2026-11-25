import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import astro from 'eslint-plugin-astro';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
  globalIgnores([
    '.agents/**',
    '.astro/**',
    '.wrangler/**',
    '.pnpm-store/**',
    'dist/**',
    'public/**',
    'tina/__generated__/**',
  ]),
  { files: ['**/*.{js,mjs,ts}'], extends: [js.configs.recommended] },
  {
    files: ['src/**/*.{js,ts}'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['*.mjs', 'tests/**/*.mjs', 'tina/**/*.ts'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['**/*.ts'],
    extends: [tseslint.configs.recommendedTypeChecked],
    languageOptions: { parserOptions: { projectService: true } },
  },
  astro.configs.recommended,
);
