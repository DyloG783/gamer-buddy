// @ts-check

import { test, expect } from '@playwright/test';

const unsavedGame = 25581;
const savedGame = 85245;
const mutableSavedGame = 77752;
const mutableUnsavedGame = 105680;

test.describe("Viewing a game /game/[game id]", () => {

  test.describe("Saved game state", () => {

    test('Remove and Connect game buttons are visible when a user has this game saved', async ({ page }) => {
      await page.goto(`/game/${savedGame}`);

      await expect.soft(page.getByTestId('remove')).toBeVisible();
      await expect.soft(page.getByTestId('link')).toBeVisible();
      await expect.soft(page.getByTestId('submit')).not.toBeVisible();
    });

    // Chrome only test to run data mutations without effecting other browsers
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

  test.describe("Unsaved game state", () => {

    test('Add game button is visible when a user does not have this game saved', async ({ page }) => {
      await page.goto(`/game/${unsavedGame}`);

      await expect.soft(page.getByTestId('submit')).toBeVisible();
      await expect.soft(page.getByTestId('remove')).not.toBeVisible();
      await expect.soft(page.getByTestId('link')).not.toBeVisible();
    });

    // Chrome only test to run data mutations without effecting other browsers
    test('Add game button onclick: Page displays remove, and chat buttons only', async ({ page, browserName }) => {
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

});

