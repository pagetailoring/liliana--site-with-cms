/** Shared by the prerendered page and its on-demand visual editing route. */
import type { IslandConfig, IslandRegistry } from '@tinacms/astro/experimental';
import PageBody from '../components/islands/PageBody.astro';
import { getPage } from './data';

export const islands = {
  page: {
    fetch: (_request, params) => getPage(params.get('path') ?? 'home.json'),
    // A plain TypeScript file cannot infer the component factory from an .astro import.
    component: PageBody as IslandConfig['component'],
    wrapper: { tag: 'main' },
    propsFromData: (result) => ({
      data: (result as Awaited<ReturnType<typeof getPage>>).data.page,
    }),
  },
} satisfies IslandRegistry;
