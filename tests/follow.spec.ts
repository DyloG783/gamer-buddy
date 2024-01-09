// @ts-check

import { test, expect } from '@playwright/test';

// connected with
test('Test Connected WITH test user is present', async ({ page }) => {
  await page.goto('/connections');
  const connection = page.locator("id=connected_with_container");
  await expect(connection.getByRole('link', { name: 'kingdon7' })).toBeVisible();
  await expect.soft(connection.getByRole('link', { name: 'thebestofmelbour' })).not.toBeVisible();
  await expect.soft(connection.getByRole('link', { name: 'jimmytool2' })).not.toBeVisible();
});

test('Test Connected WITH link on click displays page with Disconnect and chat buttons', async ({ page }) => {
  await page.goto('/connections');
  const connection = page.locator("id=connected_with_container");
  await connection.getByRole('link', { name: 'kingdon7' }).click();
  await expect(page).toHaveURL('/connections/view-player/user_2ZtFP1wPGdH5oITfJTmrU9OKA2w')
  await expect(page.getByRole('button', { name: 'Disconnect' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Chat' })).toBeVisible();
});

// request
test('Test Connectoin REQUESTS with test user is present', async ({ page }) => {
  await page.goto('/connections');
  const connection = page.locator("id=connection_request_container")
    .filter({ hasText: 'thebestofmelbour' });

  await expect(connection).toBeVisible();
  await expect.soft(connection.getByRole('link', { name: 'kingdon7' })).not.toBeVisible();
  await expect.soft(connection.getByRole('link', { name: 'jimmytool2' })).not.toBeVisible();
});

// following
test('Test FOLLOWING with test user is present', async ({ page }) => {
  await page.goto('/connections');
  const connection = page.locator("id=following_container")
    .filter({ hasText: 'jimmytool2' });

  await expect(connection).toBeVisible();
  await expect.soft(connection.getByRole('link', { name: 'kingdon7' })).not.toBeVisible();
  await expect.soft(connection.getByRole('link', { name: 'thebestofmelbour' })).not.toBeVisible();
});

