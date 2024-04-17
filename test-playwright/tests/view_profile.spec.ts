// @ts-check

import { test, expect } from '@playwright/test';
import { automation_users } from '../../prisma/automation_test_users';
import prisma from '@/lib/db';

test.describe(`View player profile page tests /connections/view-player/[player id]}`, () => {

  test.beforeEach(async () => {

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
  });

  test.describe(`Connected with Connections`, () => {

    test.beforeEach(async ({ page }) => {
      await page.goto(`/connections/view-player/${automation_users[3].id}`);
    });

    test('View Player page(connected with) - displays Disconnect & Chat buttons only', async ({ page }) => {
      // test.skip(browserName === 'firefox', 'mutating tests only to run on Chrome');
      // test.skip(browserName === 'webkit', 'mutating tests only to run on Chrome');

      await expect(page.getByRole('button', { name: 'Remove player' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Chat' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Add player' })).not.toBeVisible();
    });

    // Chrome only test to run data mutations without effecting other browsers
    test('Remove player button updates buttons as expected', async ({ page }) => {
      // test.slow();

      // test.skip(browserName === 'firefox', 'mutating tests only to run on Chrome');
      // test.skip(browserName === 'webkit', 'mutating tests only to run on Chrome');

      await page.getByRole('button', { name: 'Remove player' }).click();

      await expect.soft(page.getByRole('button', { name: 'Add player' })).toBeVisible();
      await expect.soft(page.getByRole('button', { name: 'Chat' })).not.toBeVisible();
    });
  });

  test.describe(`Request Connections tests (requested to connect with us)`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/connections/view-player/${automation_users[2].id}`);
    });

    test('View Player page(following us) - displays Connect button only', async ({ page }) => {
      // test.skip(browserName === 'firefox', 'mutating tests only to run on Chrome');
      // test.skip(browserName === 'webkit', 'mutating tests only to run on Chrome');

      await expect(page.getByRole('button', { name: 'Remove player' })).not.toBeVisible();
      await expect(page.getByRole('button', { name: 'Chat' })).not.toBeVisible();
      await expect(page.getByRole('button', { name: 'Add player' })).toBeVisible();
    });

    // Chrome only test to run data mutations without effecting other browsers
    test('Add player button updates buttons as expected', async ({ page }) => {
      // test.slow();

      // test.skip(browserName === 'firefox', 'mutating tests only to run on Chrome');
      // test.skip(browserName === 'webkit', 'mutating tests only to run on Chrome');

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



