import { test } from '@playwright/test';
import { ZPHomePage } from '../pages/ZPHomePage';
import { ZPCheckingMainMenuLinks } from '../pages/ZPCheckingMainMenuLinks';

test('Checking transitions across all menu items and returning to the main page', async ({ page }) => {
  const homePage = new ZPHomePage(page);
  const mainMenuLinks = new ZPCheckingMainMenuLinks(page);

  // Open the main page
  await homePage.goto();

  // We accept cookies
  await homePage.acceptCookies();

  // Checking the visibility of the block on the home page
  await homePage.checkHomePage();

  await mainMenuLinks.clickLogo();

  //  We check all menu items
  await mainMenuLinks.checkMenuItems();
});
