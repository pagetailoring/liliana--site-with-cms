import type { Collection } from 'tinacms';

export const GlobalConfigCollection: Collection = {
  name: 'config',
  label: 'Site settings',
  path: 'src/content/config',
  format: 'json',
  ui: { global: true },
  fields: [
    { name: 'title', label: 'Site title', type: 'string', required: true },
    {
      name: 'description',
      label: 'Default meta description',
      type: 'string',
      required: true,
    },
  ],
};
