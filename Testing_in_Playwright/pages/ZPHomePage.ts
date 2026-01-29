import { Page, expect } from '@playwright/test';

export class ZPHomePage {
  constructor(private page: Page) {}

  /** Open the main page */
  async goto() {
    await this.page.goto('https://www.zirafapraha.cz'); 
  }

  /** Accept cookies if a window appears */
  async acceptCookies() {
    const cookieButton = this.page.locator('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelection'); // ID кнопки cookie
    if (await cookieButton.isVisible()) {
      await cookieButton.click();
    }
  }

  /** Checking the visibility of a unique block on the home page */
  async checkHomePage() {
    const block = this.page.locator('[data-elementor-id="1322"]'); // data-id block on the main
    await expect(block).toBeVisible(); // expect - compliance check
  }

  /** Open page "Vstupenky" */
  async lincVstupenky() {
    const lincVstupenky = this.page.locator('a[href="https://zirafapraha.cz/vstupenky-online/"]').first();
    await expect(lincVstupenky).toBeVisible();

    await lincVstupenky.click();
    console.log('➡️ Go to page "Vstupenky"');

    // Проверяем, что заголовок страницы загрузился
    const heading = this.page.locator('h1.elementor-heading-title.elementor-size-default');
    await expect(heading).toHaveText('Výběr vstupenek');
    console.log('✅ Headline "Výběr vstupenek" найден');
  }  
    /**Open page "Vouchery" */
  async lincVouchery() {
    const lincVouchery = this.page.locator('a[href="https://zirafapraha.cz/vouchery/"]').first();
    await expect(lincVouchery).toBeVisible();

    await lincVouchery.click();
    console.log('➡️ Go to page "Vouchery"');

    // Проверяем, что заголовок страницы загрузился
    const heading = this.page.locator('h1.elementor-heading-title.elementor-size-default');
    await expect(heading).toHaveText('Výběr voucherů');
    console.log('✅ Headline "Výběr voucherů" найден');
  }
}
