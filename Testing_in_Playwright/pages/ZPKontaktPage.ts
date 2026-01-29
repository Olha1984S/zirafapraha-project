import { Page, expect } from '@playwright/test';

export class ZPKontaktPage {
  constructor(private page: Page) {}

  /** Открыть страницу "Kontakt"*/
  async goto() {
    await this.page.goto('https://zirafapraha.cz/kontakt/'); 
  }

  /** Проверка видимости уникального блока на главной странице */
  async checkKontaktPage() {
    const block = this.page.locator('h1.elementor-heading-title:has-text("Kontakt")'); 
    await expect(block).toBeVisible(); // expect - проверка соответствия
  
    // Получаем текст заголовка
    const headingText = await block.textContent();

    // Выводим подтверждение в консоль
    console.log(`✅ Заголовок страницы найден: "${headingText?.trim()}"`);
  
  }
}
