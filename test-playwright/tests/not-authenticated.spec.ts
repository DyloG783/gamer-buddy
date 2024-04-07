// @ts-check

import { test, expect } from '@playwright/test';

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

test('Test sign-in button is visible in place of usermenu when not authenticated', async ({ page }) => {
    // test.slow();
    await page.goto('/');

    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
});

test('Test "sign-in" to see games link displays on games page', async ({ page }) => {
    await page.goto('/games');

    await expect(page.getByRole('link', { name: 'Sign in to see your games' })).toBeVisible();
});

test('Add Connect and Remove game buttons are not visible when user views a game', async ({ page }) => {
    await page.goto('/games');

    await expect.soft(page.getByRole('button', { name: 'Add game' })).not.toBeVisible();
    await expect.soft(page.getByRole('button', { name: 'Remove game' })).not.toBeVisible();
    await expect.soft(page.getByRole('button', { name: 'Connect' })).not.toBeVisible();
});

test('Homepage displays sign-in link in place of connection requests when user is not authenticated', async ({ page }) => {
    await page.goto('/');

    const connectionUpdates = await page.locator("id=no_session_container");

    await expect.soft(connectionUpdates.getByRole('link', { name: 'Sign in to see Messages, Connection requests, and more!' })).toBeVisible();
    await expect(connectionUpdates.getByTestId('sign-in')).toBeVisible();
});