// @ts-check

import { test, expect } from '@playwright/test';
import { automation_users } from '../prisma/automation_test_users';

// connected with
test('Test Connected WITH test user is present', async ({ page }) => {
  await page.goto('/connections');
  const connection = page.locator("id=connected_with_container");
  await expect(connection.getByTestId('connected_card')).toContainText(automation_users[3].userName);
  await expect.soft(connection.getByTestId('connected_card')).not.toContainText(automation_users[2].userName);
  await expect.soft(connection.getByTestId('connected_card')).not.toContainText(automation_users[1].userName);
});

test('Test Connected WITH link on click displays View Player page with Disconnect and chat buttons', async ({ page }) => {
  await page.goto(`/connections/view-player/${automation_users[3].id}`);

  await expect(page.getByRole('button', { name: 'Remove player' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Chat' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Add player' })).not.toBeVisible();
});

// request
test('Test Connection REQUESTS with test user is present', async ({ page }) => {
  await page.goto('/connections');
  const connection = page.locator("id=connection_request_container")
  await expect(connection.getByTestId('requested_card')).toContainText(automation_users[2].userName);
  await expect.soft(connection.getByTestId('requested_card')).not.toContainText(automation_users[3].userName);
  await expect.soft(connection.getByTestId('requested_card')).not.toContainText(automation_users[1].userName);
});

test('Test Connection REQUESTS link on click displays View Player page with Connect buttons', async ({ page }) => {
  await page.goto(`/connections/view-player/${automation_users[2].id}`);

  await expect(page.getByRole('button', { name: 'Remove player' })).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'Chat' })).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'Add player' })).toBeVisible();
});

// following
test('Test FOLLOWING with test user is present', async ({ page }) => {
  test.slow();
  await page.goto('/connections');
  const connection = page.locator("id=following_container")
  await expect(connection.getByTestId('following_card')).toContainText(automation_users[1].userName);
  await expect.soft(connection.getByTestId('following_card')).not.toContainText(automation_users[3].userName);
  await expect.soft(connection.getByTestId('following_card')).not.toContainText(automation_users[2].userName);
});

test('Test Following View Player page with Disconnect button', async ({ page }) => {
  await page.goto(`/connections/view-player/${automation_users[1].id}`);

  await expect(page.getByRole('button', { name: 'Remove player' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Chat' })).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'Add player' })).not.toBeVisible();
});

