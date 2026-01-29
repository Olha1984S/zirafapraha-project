import { Page, expect } from '@playwright/test';

export class ZPVstupenkyPage {
  constructor(private page: Page) {}

  /** Открыть главную страницу */
  async goto() {
    await this.page.goto('https://www.zirafapraha.cz'); 
  }

  /** Принять cookie, если появляется окно */
  async acceptCookies() {
    const cookieButton = this.page.locator('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelection'); 
    if (await cookieButton.isVisible()) {
      await cookieButton.click();
    }
  }

  /** Проверка видимости уникального блока на главной странице */
  async checkHomePage() {
    const block = this.page.locator('[data-elementor-id="1322"]'); 
    await expect(block).toBeVisible(); // expect - проверка соответствия
  }

  /** Открыть страницу "Vstupenky" */
  async lincVstupenky() {
    await this.page.goto('https://zirafapraha.cz/vstupenky-online/'); 
    const heading = this.page.locator('h1.elementor-heading-title.elementor-size-default');
    await expect(heading).toHaveText('Výběr vstupenek');
    console.log('✅ Заголовок "Výběr vstupenek" найден');
  }
}
