import type { Collection } from 'tinacms';

export const PageCollection: Collection = {
  name: 'page',
  label: 'Pages',
  path: 'src/content/page',
  format: 'json',
  ui: {
    router: ({ document }) => {
      const path = document._sys.breadcrumbs.join('/');
      return path === 'home' ? '/' : `/${path}`;
    },
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'string',
      isTitle: true,
      required: true,
    },
    { name: 'description', label: 'Meta description', type: 'string' },
    {
      name: 'body',
      label: 'Body',
      type: 'string',
      ui: { component: 'textarea' },
    },
  ],
};
