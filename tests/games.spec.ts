// @ts-check

import { automation_users } from '../prisma/automation_test_users';
import { test, expect } from '@playwright/test';

test('Add game button is visible when a user does not have this game saved', async ({ page }) => {
  await page.goto('/game/116090');

  await expect.soft(page.getByRole('button', { name: 'Add game' })).toBeVisible();
  await expect.soft(page.getByRole('button', { name: 'Remove game' })).not.toBeVisible();
  await expect.soft(page.getByRole('button', { name: 'Connect' })).not.toBeVisible();
});

// can't do this as test are asynchronous?
// test('Add game button updates buttons as expected', async ({ page }) => {
//   await page.goto('/game/262186');

//   await page.getByRole('button', { name: 'Add game' }).click();
//   await expect(page.getByRole('button', { name: 'Remove game' })).toBeVisible();
//   await expect.soft(page.getByRole('button', { name: 'Connect' })).toBeVisible();
//   await expect.soft(page.getByRole('button', { name: 'Add game' })).not.toBeVisible();
// });

test('Remove and Connect game buttons are visible when a user has this game saved', async ({ page }) => {
  await page.goto('/game/83563');

  // await expect.soft(page.getByRole('link', { name: 'NeptuneGL' })).toBeVisible(); // test game
  await expect.soft(page.getByRole('button', { name: 'Remove game' })).toBeVisible();
  await expect.soft(page.getByRole('button', { name: 'Connect' })).toBeVisible();
  await expect.soft(page.getByRole('button', { name: 'Add game' })).not.toBeVisible();
});

// can't do this as test are asynchronous?
// test('Remove game button updates buttons as expected', async ({ page }) => {
//   await page.goto('/game/250630');

//   await page.getByRole('button', { name: 'Remove game' }).click();
//   await expect(page.getByRole('button', { name: 'Add game' })).toBeVisible();
//   await expect.soft(page.getByRole('button', { name: 'Connect' })).not.toBeVisible();
// });


test('Chat button takes user to game chat forum', async ({ page }) => {
  await page.goto('/game/83563');

  await page.getByRole('button', { name: 'Connect' }).click();
  await expect(page).toHaveURL(`/connect/83563`)
  // await expect(page.getByRole('link', { name: 'Zix Chat' })).toBeVisible();
});
