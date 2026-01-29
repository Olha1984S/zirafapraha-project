import { Page, expect } from '@playwright/test';

export class ZPNarozeninyPage {
  constructor(private page: Page) {}

  /** Открыть страницу "Narozeniny"*/
  async goto() {
    await this.page.goto('https://zirafapraha.cz/Narozeniny/'); 
  }

  /** Проверка видимости уникального блока на главной странице */
  async checkNarozeninyPage() {
    const block = this.page.locator('h1.elementor-heading-title:has-text("Narozeninová párty pro děti")'); 
    await expect(block).toBeVisible(); // expect - проверка соответствия
  
    // Получаем текст заголовка
    const headingText = await block.textContent();

    // Выводим подтверждение в консоль
    console.log(`✅ Заголовок страницы найден: "${headingText?.trim()}"`);
  
  }
}
