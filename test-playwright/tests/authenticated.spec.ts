// @ts-check

import { test, expect } from '@playwright/test';

test('Test clerk user menu is visible on login', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('button', { name: 'Open user button' })).toBeVisible();
});
