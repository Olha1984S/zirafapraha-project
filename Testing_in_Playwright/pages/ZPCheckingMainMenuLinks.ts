import { Page, expect } from '@playwright/test';

export class ZPCheckingMainMenuLinks {
  constructor(private page: Page) {}

  /** Click on the logo to return to the main page */
  async clickLogo() {
    const logo = this.page.locator('div[data-id="e164408"] img');
    await logo.click();

    // Wait for the page to load.
    await this.page.waitForLoadState('domcontentloaded');

    // Checking the current URL
    const currentURL = this.page.url();

    // Let's check that we are on the main page
    if (currentURL === 'https://zirafapraha.cz/' || currentURL === 'https://zirafapraha.cz') {
      console.log('✅ Logo clicked: transition completed successfully, link correct!');
    } else {
      console.log(`⚠️ After clicking, you were not redirected to the home page. Current URL: ${currentURL}`);
    }
  }

  /** Checking all main menu items with internal links */
  async checkMenuItems() {
    // ul menu selector
    const menuItems = this.page.locator('ul#menu-1-ea4ab7e > li');
    const count = await menuItems.count();

    for (let i = 0; i < count; i++) {
      const menuItem = menuItems.nth(i);
      const link = menuItem.locator('a').first();
      const linkText = await link.innerText();
      const href = await link.getAttribute('href');

      if (!href) continue;

      console.log(`Checking the menu item: "${linkText}" с href: ${href}`);

      // If the link leads to an internal site
      if (href.includes('zirafapraha.cz/')) {
        await link.click();
        await this.page.waitForLoadState('domcontentloaded');

        const currentURL = this.page.url();
        console.log(`Compare href: ${href} with the current URL: ${currentURL}`);
        expect(currentURL).toContain(href);
        console.log(`✅ The link is correct`);

        // Generating a secure file name and timestamp
        const safeName = linkText.replace(/[^\wа-яё]+/gi, '_');
        const now = new Date();

        // Format: hh.mm_dd.mm.yy
        const timestamp = `${now.getHours().toString().padStart(2, '0')}
        .${now.getMinutes().toString().padStart(2, '0')}_${now.getDate().toString().padStart(2, '0')}
        .${(now.getMonth() + 1)
          .toString()
          .padStart(2, '0')}.${now.getFullYear().toString().slice(-2)}`;

        // Example name: Atrakce_14.27_10.10.25.png
        const filePath = `screenshots/${safeName}_${timestamp}.png`;

        await this.page.screenshot({
          path: filePath,
          fullPage: true,
        });

        console.log(`Screenshot saved: ${filePath}`);


        // Return to the main page via the logo
        await this.clickLogo();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page).toHaveURL('https://zirafapraha.cz/');
      } else {
        // External link - skip
        console.log(`❌The link leads to an external site, please skip it.: ${href}`);
      }
    }
  }
}
