import { test as setup, expect } from '@playwright/test';
import { automation_users } from '../prisma/automation_test_users';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
    // Perform authentication steps. Replace these actions with your own.
    await page.goto(`${process.env.CLERK_SIGNIN}`);
    await page.getByLabel('Email address or username').fill(automation_users[0].email);
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByLabel('Password', { exact: true }).fill('password');
    await page.getByRole('button', { name: 'Continue' }).click();
    // Wait until the page receives the cookies.
    //
    // Sometimes login flow sets cookies in the process of several redirects.
    // Wait for the final URL to ensure that the cookies are actually set.
    await page.waitForURL(`${process.env.NEXT_PUBLIC_BASE_URL}`);
    // Alternatively, you can wait until the page reaches a state where all cookies are set.
    await expect(page.getByRole('button', { name: 'Open user button' })).toBeVisible();

    // End of authentication steps.

    await page.context().storageState({ path: authFile });
});