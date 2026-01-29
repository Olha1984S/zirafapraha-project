import { Page, expect } from '@playwright/test';

export class ZPCheckingFooterMenuLinksMobileP3 {
  constructor(private page: Page) {}

  /** Клик по логотипу для возврата на главную */
  async clickLogo() {
    const logo = this.page.locator('div[data-id="e164408"] img');
    await logo.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForURL(/zirafapraha\.cz\/?$/, { timeout: 5000 });

    const currentURL = this.page.url();
    if (currentURL.includes('zirafapraha.cz')) {
      console.log('✅ [Моб] Логотип кликнут: переход выполнен успешно!');
    } else {
      console.log(`⚠️ [Моб] После клика перешли не на главную. Текущий URL: ${currentURL}`);
    }
  }

  /** Проверка ссылки для покупки билетов в блоке Footer (мобильная версия) */
  async checkFooterMenuItemsMobileP3() {
    console.log('\n🟦 Проверка ссылки для покупки билетов в третьем блоке footer (мобильная версия)...');

    const menuItems = this.page.locator('div[data-id="5b6785a"]');
    const count = await menuItems.count();
    console.log(`🔗 Найдено элементов в блоке: ${count}`);

    for (let i = 0; i < count; i++) {
      const menuItem = menuItems.nth(i);
      const link = menuItem.locator('a').first();
      const linkText = await link.innerText();
      const href = await link.getAttribute('href');

      if (!href) continue;

      console.log(`\n➡️ Проверяем пункт [моб]: "${linkText}" → ${href}`);

      // Проверяем внутренние ссылки
      if (href.includes('zirafapraha.cz/')) {
        await link.click();
        await this.page.waitForLoadState('domcontentloaded');

        const currentURL = this.page.url();
        console.log(`🌐 Текущий URL: ${currentURL}`);
        expect(currentURL).toContain(href);
        console.log(`✅ Ссылка "${linkText}" корректна`);

        // Формируем безопасное имя файла и метку времени
        const safeName = linkText.replace(/[^\wа-яё]+/gi, '_');
        const now = new Date();
        const timestamp = `${now.getHours().toString().padStart(2, '0')}.${now
          .getMinutes()
          .toString()
          .padStart(2, '0')}_${now
          .getDate()
          .toString()
          .padStart(2, '0')}.${(now.getMonth() + 1)
          .toString()
          .padStart(2, '0')}.${now.getFullYear().toString().slice(-2)}`;

        const filePath = `mobile_screenshots/${safeName}_${timestamp}.png`;
        
        // указываем время задержки
        await this.page.waitForTimeout(4000); 
        await this.page.screenshot({ path: filePath});
        console.log(`📸 Скриншот сохранён: ${filePath}`);

        // Возврат на главную
        await this.clickLogo();
        await expect(this.page).toHaveURL(/zirafapraha\.cz\/?$/);
      } else {
        console.log(`⏭️ [Моб] Внешняя ссылка, пропускаем: ${href}`);
      }
    }

    console.log('\n✅ Проверка третьего блока footer для мобильной версии завершена!');
  }
}
