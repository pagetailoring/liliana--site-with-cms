import { requestWithMetadata } from '@tinacms/astro/data';
import client from '../../tina/__generated__/client';

// The editor uses query metadata to overlay unpublished changes in the preview.
export const getPage = (relativePath: string) =>
  requestWithMetadata(client.queries.page({ relativePath }), {
    priority: 'primary',
  });

export const getConfig = () =>
  client.queries.config({ relativePath: 'config.json' });

export type CmsPage = Awaited<ReturnType<typeof getPage>>['data']['page'];
