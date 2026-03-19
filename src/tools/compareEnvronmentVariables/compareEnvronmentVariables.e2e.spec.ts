import { test, expect } from '@playwright/test';

test.describe('Tool - CompareEnvronmentVariables', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/compareEnvronmentVariables');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('CompareEnvronmentVariables - IT Tools');
  });

  test('', async ({ page }) => {

  });
});