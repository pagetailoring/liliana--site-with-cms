import { randomUUID } from 'node:crypto';
import { readFile, rm, writeFile } from 'node:fs/promises';
import { expect, test } from '@playwright/test';

test('preview a draft, save its JSON, and render the saved title', async ({
  page,
}) => {
  const slug = `editor-test-${randomUUID()}`;
  const file = new URL(`../src/content/page/${slug}.json`, import.meta.url);
  const initial = {
    title: 'Original test title',
    body: 'An editable test page.',
  };
  const draft = 'Updated in the visual editor';
  await writeFile(file, JSON.stringify(initial), { flag: 'wx' });

  try {
    await expect(async () => {
      await page.goto(`/${slug}/`);
      await expect(
        page.getByRole('heading', { name: initial.title }),
      ).toBeVisible();
    }).toPass({ timeout: 20000 });

    await page.goto(`/admin/index.html#/~/${slug}/`);
    await page.getByRole('button', { name: 'Enter Edit Mode' }).click();
    const titleField = page.locator('input[name="title"]');
    await titleField.fill(draft);
    const preview = page
      .frameLocator('iframe')
      .getByRole('heading', { name: draft });
    await expect(preview).toBeVisible();
    expect(JSON.parse(await readFile(file, 'utf8')).title).toBe(initial.title);

    await page.getByRole('button', { name: 'Save', exact: true }).click();
    await expect
      .poll(async () => JSON.parse(await readFile(file, 'utf8')).title)
      .toBe(draft);
    await page.goto(`/${slug}/`);
    await expect(page.getByRole('heading', { name: draft })).toBeVisible();
  } finally {
    await rm(file, { force: true });
  }
});
