// @ts-check

import { test, expect } from '@playwright/test';
import { automation_users } from '../../prisma/automation_test_users';

test.describe(`View player profile page tests /connections/view-player/[player id]}`, () => {

  test.describe(`Connected with Connections`, () => {

    test.beforeEach(async ({ page }) => {
      await page.goto(`/connections/view-player/${automation_users[3].id}`);
    });

    test('View Player page(connected with) - displays Disconnect & Chat buttons only', async ({ page, browserName }) => {
      test.skip(browserName === 'firefox', 'mutating tests only to run on Chrome');
      test.skip(browserName === 'webkit', 'mutating tests only to run on Chrome');

      await expect(page.getByRole('button', { name: 'Remove player' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Chat' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Add player' })).not.toBeVisible();
    });

    // Chrome only test to run data mutations without effecting other browsers
    test('Remove player button updates buttons as expected', async ({ page, browserName }) => {
      // test.slow();

      test.skip(browserName === 'firefox', 'mutating tests only to run on Chrome');
      test.skip(browserName === 'webkit', 'mutating tests only to run on Chrome');

      await page.getByRole('button', { name: 'Remove player' }).click();

      await expect.soft(page.getByRole('button', { name: 'Add player' })).toBeVisible();
      await expect.soft(page.getByRole('button', { name: 'Chat' })).not.toBeVisible();
    });
  });

  test.describe(`Request Connections tests (requested to connect with us)`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/connections/view-player/${automation_users[2].id}`);
    });

    test('View Player page(following us) - displays Connect button only', async ({ page, browserName }) => {
      test.skip(browserName === 'firefox', 'mutating tests only to run on Chrome');
      test.skip(browserName === 'webkit', 'mutating tests only to run on Chrome');

      await expect(page.getByRole('button', { name: 'Remove player' })).not.toBeVisible();
      await expect(page.getByRole('button', { name: 'Chat' })).not.toBeVisible();
      await expect(page.getByRole('button', { name: 'Add player' })).toBeVisible();
    });

    // Chrome only test to run data mutations without effecting other browsers
    test('Add player button updates buttons as expected', async ({ page, browserName }) => {
      // test.slow();

      test.skip(browserName === 'firefox', 'mutating tests only to run on Chrome');
      test.skip(browserName === 'webkit', 'mutating tests only to run on Chrome');

      await page.getByRole('button', { name: 'Add player' }).click();

      await expect.soft(page.getByRole('button', { name: 'Remove player' })).toBeVisible();
      await expect.soft(page.getByRole('button', { name: 'Chat' })).toBeVisible();
    });
  });

  test.describe(`Following Connections tests (we follow)`, () => {

    test.beforeEach(async ({ page }) => {
      await page.goto(`/connections/view-player/${automation_users[1].id}`);
    });

    test('View Player page(user we follow) - displays Disconnect button only', async ({ page }) => {
      await expect(page.getByRole('button', { name: 'Remove player' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Chat' })).not.toBeVisible();
      await expect(page.getByRole('button', { name: 'Add player' })).not.toBeVisible();
    });
  });
});



