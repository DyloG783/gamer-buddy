// @ts-check

import { test, expect } from '@playwright/test';
import { automation_users } from '../../prisma/automation_test_users';

test.describe(`View connections page tests /connections`, () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(`/connections`);
  });

  test.describe(`Connected with Connections`, () => {
    test('Test Connected WITH test user is present /connections', async ({ page, browserName }) => {
      test.skip(browserName === 'firefox', 'mutating tests only to run on Chrome');
      test.skip(browserName === 'webkit', 'mutating tests only to run on Chrome');

      const connection = page.locator("id=connected_with_container");

      await expect(connection.getByTestId('connected_card')).toContainText(automation_users[3].userName);
      await expect.soft(connection.getByTestId('connected_card')).not.toContainText(automation_users[2].userName);
      await expect.soft(connection.getByTestId('connected_card')).not.toContainText(automation_users[1].userName);
    });
  });

  test.describe(`Request Connections tests (requested to connect with us)`, () => {
    test('Test Connection REQUESTS with test user is present /connections', async ({ page, browserName }) => {
      test.skip(browserName === 'firefox', 'mutating tests only to run on Chrome');
      test.skip(browserName === 'webkit', 'mutating tests only to run on Chrome');

      await page.goto('/connections');

      const connection = page.locator("id=connection_request_container");

      await expect(connection.getByTestId('requested_card')).toContainText(automation_users[2].userName);
      await expect.soft(connection.getByTestId('requested_card')).not.toContainText(automation_users[3].userName);
      await expect.soft(connection.getByTestId('requested_card')).not.toContainText(automation_users[1].userName);
    });
  });

  test.describe(`Following Connections tests (we follow)`, () => {
    test('Connections page - FOLLOWING section (who we follow) - test user is present /connections', async ({ page }) => {
      // test.slow();

      await page.goto('/connections');

      const connection = page.locator("id=following_container");

      await expect(connection.getByTestId('following_card')).toContainText(automation_users[1].userName);
      await expect.soft(connection.getByTestId('following_card')).not.toContainText(automation_users[3].userName);
      await expect.soft(connection.getByTestId('following_card')).not.toContainText(automation_users[2].userName);
    });
  });
});



