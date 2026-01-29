import { Page, expect } from '@playwright/test';

export class ZPAtrakcePage {
  constructor(private page: Page) {}

  /** Открыть страницу "Atrakce"*/
  async goto() {
    await this.page.goto('https://zirafapraha.cz/atrakce/'); 
  }

  /** Проверка видимости уникального блока на главной странице */
  async checkAtrakcePage() {
    const block = this.page.locator('search.e-filter'); // data-id блока на главной
    await expect(block).toBeVisible(); // expect - проверка соответствия
  }
}
