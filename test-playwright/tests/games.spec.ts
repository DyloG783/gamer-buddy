// @ts-check

import { test, expect } from '@playwright/test';

test.describe(`Viewing games page /games`, () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(`/games`);
  });

  test.describe(`Your games`, () => {

    // ensure saved games display in expected section
    test(`Titles of test data games is present on page load`, async ({ page }) => {

      const yourGamesContainer = page.locator(`id=games_container`);

      await expect.soft(yourGamesContainer).toContainText(`Blade Mistress`);
      await expect.soft(yourGamesContainer).toContainText(`Leif's Adventure: Netherworld Hero`);
    });

    // ensure non saved games do not display in expected section
    test(`Title of non test data games is not present on page load`, async ({ page }) => {

      const yourGamesContainer = page.locator(`id=games_container`);

      await expect.soft(yourGamesContainer).not.toContainText(`Solium Infernum`);
    });
  });
});

