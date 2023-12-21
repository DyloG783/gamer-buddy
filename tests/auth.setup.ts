import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
    await page.goto('http://localhost:3000/api/auth/signin');
    await page.getByRole('button', { name: 'Sign in with Google' }).click();
    // await page.getByText('Use another account').click();
    // await page.getByRole('link', { name: 'Use another account' }).click();
    await page.locator('id=identifierId').fill('dgdevelopment65@gmail.com');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.locator('[type="password"]').fill('Tre3safeDevelopment!');
    await page.getByRole('button', { name: 'Next' }).click();

  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('http://localhost:3000/');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
    // await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();
    await expect(page.getByTitle('Bringing Gamers Together')).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});