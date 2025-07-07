import { test, expect } from '@playwright/test';

test('landing page loads and shows hero text', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText(/계약서 분석/).first()).toBeVisible();
}); 