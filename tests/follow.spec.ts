// @ts-check

import { test, expect } from '@playwright/test';
import { automation_users } from '../prisma/automation_test_users';

// connected with
test('Test Connected WITH test user is present', async ({ page }) => {
  await page.goto('/connections');
  const connection = page.locator("id=connected_with_container");
  await expect(connection.getByRole('link', { name: automation_users[3].userName, exact: true })).toBeVisible();
  await expect.soft(connection.getByRole('link', { name: automation_users[2].userName, exact: true })).not.toBeVisible();
  await expect.soft(connection.getByRole('link', { name: automation_users[1].userName, exact: true })).not.toBeVisible();
});

test('Test Connected WITH link on click displays View Player page with Disconnect and chat buttons', async ({ page }) => {
  await page.goto(`/connections/view-player/${automation_users[3].id}`);
  // const connection = page.locator("id=connected_with_container");
  // await connection.getByRole('link', { name: automation_users[3].userName }).click();
  // await expect(page).toHaveURL(`/connections/view-player/${automation_users[3].id}`)
  await expect(page.getByRole('button', { name: 'Remove player' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Chat' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Add player' })).not.toBeVisible();
});

// request
test('Test Connection REQUESTS with test user is present', async ({ page }) => {
  await page.goto('/connections');
  const connection = page.locator("id=connection_request_container")
  await expect(connection.getByRole('link', { name: automation_users[2].userName, exact: true })).toBeVisible();
  await expect.soft(connection.getByRole('link', { name: automation_users[3].userName, exact: true })).not.toBeVisible();
  await expect.soft(connection.getByRole('link', { name: automation_users[1].userName, exact: true })).not.toBeVisible();
});

test('Test Connection REQUESTS link on click displays View Player page with Connect buttons', async ({ page }) => {
  // await page.goto('/connections');
  // const connection = page.locator("id=connection_request_container");
  // await connection.getByRole('link', { name: automation_users[2].userName }).click();
  await page.goto(`/connections/view-player/${automation_users[2].id}`);
  // await expect(page).toHaveURL(`/connections/view-player/${automation_users[2].id}`)
  await expect(page.getByRole('button', { name: 'Remove player' })).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'Chat' })).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'Add player' })).toBeVisible();
});

// following
test('Test FOLLOWING with test user is present', async ({ page }) => {
  await page.goto('/connections');
  const connection = page.locator("id=following_container")
  await expect(connection.getByRole('link', { name: automation_users[1].userName, exact: true })).toBeVisible();
  await expect.soft(connection.getByRole('link', { name: automation_users[3].userName, exact: true })).not.toBeVisible();
  await expect.soft(connection.getByRole('link', { name: automation_users[2].userName, exact: true })).not.toBeVisible();
});

test('Test Following user link on click displays View Player page with Disconnect button', async ({ page }) => {
  await page.goto(`/connections/view-player/${automation_users[1].id}`);
  // const connection = page.locator("id=following_container");
  // await connection.getByRole('link', { name: automation_users[1].userName }).click();
  // await expect(page).toHaveURL(`/connections/view-player/${automation_users[1].id}`)
  await expect(page.getByRole('button', { name: 'Remove player' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Chat' })).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'Add player' })).not.toBeVisible();
});

