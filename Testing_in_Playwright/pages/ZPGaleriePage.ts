import { Page, expect } from '@playwright/test';

export class ZPGaleriePage {
  constructor(private page: Page) {}

  /** Открыть страницу "Galerie"*/
  async goto() {
    await this.page.goto('https://zirafapraha.cz/galerie/'); 
  }

  /** Проверка видимости уникального блока на главной странице */
  async checkGaleriePage() {
    const block = this.page.locator('h1.elementor-heading-title:has-text("Galerie")'); 
    await expect(block).toBeVisible(); // expect - проверка соответствия
  
    // Получаем текст заголовка
    const headingText = await block.textContent();

    // Выводим подтверждение в консоль
    console.log(`✅ Заголовок страницы найден: "${headingText?.trim()}"`);
  
  }
}
