// @ts-check

import { test, expect } from '@playwright/test';
import { automation_users } from '../../prisma/automation_test_users';
import prisma from '@/lib/db';

test.describe(`View connections page tests /connections`, () => {

  test.beforeEach(async ({ page }) => {

    // delete test users except permanent from clerk
    try {
      await prisma.user.deleteMany({
        where: {
          email: { endsWith: 'gbtest.com' },
        }
      })
    } catch (error) {
      console.log("Failed to deleting users during global tear down Playwright:", error)
    }

    // create test users
    try {
      for (let user of automation_users) {
        await prisma.user.upsert({
          where: {
            email: user.email,
          },
          update: {},
          create: {
            id: user.id,
            email: user.email,
            userName: user.userName,
            bio: user.bio,
            timezone: user.timezone,
            games: {
              connect: user.games?.map(g => ({ id: g })) || [],
            }
          }
        })
      }

    } catch (error) {
      console.log("Fail creating test users in playwright global setup:", error)
    }

    // create follow realations between test users
    try {
      await prisma.follows.createMany({
        data: [
          {
            followedById: automation_users[0].id,
            followedByEmail: automation_users[0].email,
            followedByUName: automation_users[0].userName,
            followingId: automation_users[1].id,
            followingUName: automation_users[1].userName,
            followingEmail: automation_users[1].email
          },
          {
            followedById: automation_users[0].id,
            followedByEmail: automation_users[0].email,
            followedByUName: automation_users[0].userName,
            followingId: automation_users[3].id,
            followingUName: automation_users[3].userName,
            followingEmail: automation_users[3].email
          },
          {
            followedById: automation_users[3].id,
            followedByEmail: automation_users[3].email,
            followedByUName: automation_users[3].userName,
            followingId: automation_users[0].id,
            followingUName: automation_users[0].userName,
            followingEmail: automation_users[0].email
          },
          {
            followedById: automation_users[2].id,
            followedByEmail: automation_users[2].email,
            followedByUName: automation_users[2].userName,
            followingId: automation_users[0].id,
            followingUName: automation_users[0].userName,
            followingEmail: automation_users[0].email
          },
        ]
      })
    } catch (error) {
      console.log("Fail setting up test connections in playwright global setup:", error)
    }

    await page.goto(`/connections`);
  });

  test.describe(`Connected with Connections`, () => {
    test('Test Connected WITH test user is present /connections', async ({ page }) => {
      // test.skip(browserName === 'firefox', 'mutating tests only to run on Chrome');
      // test.skip(browserName === 'webkit', 'mutating tests only to run on Chrome');

      const connection = page.locator("id=connected_with_container");

      await expect(connection.getByTestId('connected_card')).toContainText(automation_users[3].userName);
      await expect.soft(connection.getByTestId('connected_card')).not.toContainText(automation_users[2].userName);
      await expect.soft(connection.getByTestId('connected_card')).not.toContainText(automation_users[1].userName);
    });
  });

  test.describe(`Request Connections tests (requested to connect with us)`, () => {
    test('Test Connection REQUESTS with test user is present /connections', async ({ page }) => {
      // test.skip(browserName === 'firefox', 'mutating tests only to run on Chrome');
      // test.skip(browserName === 'webkit', 'mutating tests only to run on Chrome');

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



