import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
    // Perform authentication steps. Replace these actions with your own.
    await page.goto('https://pro-marmoset-77.accounts.dev/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F');
    await page.getByLabel('Email address or username').fill('test1@test.com');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByLabel('Password', { exact: true }).fill('password');
    await page.getByRole('button', { name: 'Continue' }).click();
    // Wait until the page receives the cookies.
    //
    // Sometimes login flow sets cookies in the process of several redirects.
    // Wait for the final URL to ensure that the cookies are actually set.
    await page.waitForURL('http://localhost:3000/');
    // Alternatively, you can wait until the page reaches a state where all cookies are set.
    await expect(page.getByRole('button', { name: 'Open user button' })).toBeVisible();

    // End of authentication steps.

    await page.context().storageState({ path: authFile });
});