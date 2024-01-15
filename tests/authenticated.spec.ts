// @ts-check

import { test, expect } from '@playwright/test';

test('Test clerk user menu is visible on login', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('button', { name: 'Open user button' })).toBeVisible();
});

// flakey
// test('Test users name SALLY is displayed beside clerk user menu', async ({ page }) => {
//   await page.goto('/');

//   await expect(page.locator('#non_responsive_layout')).toContainText('auto1');
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
