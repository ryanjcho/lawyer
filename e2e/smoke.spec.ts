import { test, expect } from '@playwright/test';

test('landing page loads and shows hero text', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText(/AI와 변호사의 하이브리드/).first()).toBeVisible();
}); 