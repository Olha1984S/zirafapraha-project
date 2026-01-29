import { Page, expect } from '@playwright/test';

export class ZPAkcePage {
  constructor(private page: Page) {}

  /** Открыть страницу "Akce"*/
  async goto() {
    await this.page.goto('https://zirafapraha.cz/akce/'); 
  }

  /** Проверка видимости уникального блока на главной странице */
  async checkAkcePage() {
    const block = this.page.locator('h1.elementor-heading-title:has-text("Akce připravené v Žirafě")');
    await expect(block).toBeVisible(); // expect - проверка соответствия
    
    // Получаем текст заголовка
    const headingText = await block.textContent();

    // Выводим подтверждение в консоль
    console.log(`✅ Заголовок страницы найден: "${headingText?.trim()}"`);
  }
}

