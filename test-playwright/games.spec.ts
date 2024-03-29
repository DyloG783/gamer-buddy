// @ts-check

import { test, expect } from '@playwright/test';

const unsavedGame = 10753;
const savedGame = 16851;
const mutableSavedGame = 9384;
const mutableUnsavedGame = 2941;

test.describe("Saved game", () => {

  test('Remove and Connect game buttons are visible when a user has this game saved', async ({ page }) => {
    await page.goto(`/game/${savedGame}`);

    await expect.soft(page.getByTestId('remove')).toBeVisible();
    await expect.soft(page.getByTestId('link')).toBeVisible();
    await expect.soft(page.getByTestId('submit')).not.toBeVisible();
  });

  test('Chat button takes user to game chat forum when they have a game saved', async ({ page }) => {
    // test.slow();

    await page.goto(`/game/${savedGame}`);

    await page.getByTestId('link').click();
    await expect(page).toHaveURL(`/connect/16851`)
  });

  // can't do this as test are asynchronous?
  test('Remove game button updates buttons as expected', async ({ page, browserName }) => {
    // test.slow();
    test.skip(browserName === 'firefox', 'mutating tests only to run on Chrome')
    test.skip(browserName === 'webkit', 'mutating tests only to run on Chrome')

    await page.goto(`/game/${mutableSavedGame}`);

    await page.getByRole('button', { name: 'Remove game' }).click();
    await expect(page.getByRole('button', { name: 'Add game' })).toBeVisible();
    await expect.soft(page.getByRole('button', { name: 'Chat' })).not.toBeVisible();
  });
});

test.describe("Unsaved game", () => {

  test('Add game button is visible when a user does not have this game saved', async ({ page }) => {
    await page.goto(`/game/${unsavedGame}`);

    await expect.soft(page.getByTestId('submit')).toBeVisible();
    await expect.soft(page.getByTestId('remove')).not.toBeVisible();
    await expect.soft(page.getByTestId('link')).not.toBeVisible();
  });

  test('Add game button updates buttons as expected', async ({ page, browserName }) => {
    // test.slow();

    test.skip(browserName === 'firefox', 'mutating tests only to run on Chrome')
    test.skip(browserName === 'webkit', 'mutating tests only to run on Chrome')

    await page.goto(`/game/${mutableUnsavedGame}`);

    await page.getByRole('button', { name: 'Add game' }).click();
    await expect(page.getByRole('button', { name: 'Remove game' })).toBeVisible();
    await expect.soft(page.getByRole('button', { name: 'Chat' })).toBeVisible();
    await expect.soft(page.getByRole('button', { name: 'Add game' })).not.toBeVisible();
  });
});
