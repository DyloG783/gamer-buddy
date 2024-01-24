// @ts-check

import { test, expect } from '@playwright/test';

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

test('Test clerk user menu is not visible when viewing home page not authenticated', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('button', { name: 'Open user button' })).not.toBeVisible();
});

test('Test sign-in button is visible in place of usermenu when not authenticated', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
});

test('Test "sign-in" to see games link displays on games page ', async ({ page }) => {
    await page.goto('/games');

    await expect(page.getByRole('link', { name: 'Sign in to see your games' })).toBeVisible();
});

test('Add Connect and Remove game buttons are not visible when user views a game', async ({ page }) => {
    await page.goto('/games');

    await expect.soft(page.getByRole('button', { name: 'Add game' })).not.toBeVisible();
    await expect.soft(page.getByRole('button', { name: 'Remove game' })).not.toBeVisible();
    await expect.soft(page.getByRole('button', { name: 'Connect' })).not.toBeVisible();
});