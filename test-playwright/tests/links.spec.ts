// @ts-check

import { test, expect } from '@playwright/test';
import { automation_users } from '../../prisma/automation_test_users';

test.describe(`Navigation link tests`, () => {

  test.describe(`Game page (viewing a specific game) /game/[gameid]`, () => {

    const gameId = "85245"; // gameid 85245 exists in data set
    test.beforeEach(async ({ page }) => {
      await page.goto(`/game/${gameId}`);
    });

    test('Test link button (Chat) takes user to game connect page', async ({ page }) => {
      await page.getByTestId('link').click();
      await expect(page).toHaveURL(`/connect/${gameId}`);
    });
  });

  test.describe(`Connections page (viewing anothers user profile) /connections/view-player/[user id]`, () => {

    test.beforeEach(async ({ page }) => {
      await page.goto(`/connections/view-player/${automation_users[3].id}`);
    });

    test('Test link button (Chat) takes user to private chat page', async ({ page, browserName }) => {
      // test.slow();

      await page.getByTestId('link').click();
      await expect(page).toHaveURL(`/connections/${automation_users[0].id}/${automation_users[3].id}`);
    });
  });
});





