// @ts-check
import { test, expect } from '@playwright/test';
import { HerokuAppPage } from '../pages/herokuapp.page.js';

test.describe('HerokuApp Page Tests', () => {
  let herokuAppPage;

  test.beforeEach(async ({ page }) => {
    await test.step('Navigate to the HerokuApp page', async () => {
      herokuAppPage = new HerokuAppPage(page);
      await herokuAppPage.navigate();
    });
    await test.step('Set cookie "testKey" with value "testValue"', async () => {
      await herokuAppPage.setCookie('testKey', 'testValue');
    });
  });

  test('should verify that the cookie is added', async () => {
    const cookieExists = await herokuAppPage.isCookiesExists('testKey');
    expect(cookieExists).toBe(true);
  });

  test('should delete the cookie and verify it is removed', async ({ page }) => {
    await page.context().clearCookies();
    const cookieExists = await herokuAppPage.isCookiesExists('testKey');
    expect(cookieExists).toBe(false);
  });
});
