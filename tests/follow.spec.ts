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

test('Test Connected WITH link on click displays View Player page with Disconnect and chat buttons', async ({ page }) => {
  await page.goto('/connections');
  const connection = page.locator("id=connected_with_container");
  await connection.getByRole('link', { name: 'kingdon7' }).click();
  await expect(page).toHaveURL('/connections/view-player/user_2ZtFP1wPGdH5oITfJTmrU9OKA2w')
  await expect((page).locator("id=disconnect_button")).toBeVisible();
  await expect((page).locator("id=chat_button")).toBeVisible();
  await expect((page).locator("id=connect_button")).not.toBeVisible();
});

// request
test('Test Connection REQUESTS with test user is present', async ({ page }) => {
  await page.goto('/connections');
  const connection = page.locator("id=connection_request_container")
    .filter({ hasText: 'thebestofmelbour' });

  await expect(connection).toBeVisible();
  await expect.soft(connection.getByRole('link', { name: 'kingdon7' })).not.toBeVisible();
  await expect.soft(connection.getByRole('link', { name: 'jimmytool2' })).not.toBeVisible();
});

test('Test Connection REQUESTS link on click displays View Player page with Connect buttons', async ({ page }) => {
  await page.goto('/connections');
  const connection = page.locator("id=connection_request_container");
  await connection.getByRole('link', { name: 'thebestofmelbour' }).click();
  await expect(page).toHaveURL('/connections/view-player/user_2ZtFu6LzPOsaLVmDiZeac9r2VRU')
  await expect((page).locator("id=connect_button")).toBeVisible();
  await expect((page).locator("id=chat_button")).not.toBeVisible();
  await expect((page).locator("id=disconnect_button")).not.toBeVisible();
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

test('Test Following user link on click displays View Player page with Disconnect button', async ({ page }) => {
  await page.goto('/connections');
  const connection = page.locator("id=following_container");
  await connection.getByRole('link', { name: 'jimmytool2' }).click();
  await expect(page).toHaveURL('/connections/view-player/user_2ZtF7sj1agf3O5bCSciz511eRzj')
  await expect((page).locator("id=disconnect_button")).toBeVisible();
  await expect((page).locator("id=connect_button")).not.toBeVisible();
  await expect((page).locator("id=chat_button")).not.toBeVisible();
});

