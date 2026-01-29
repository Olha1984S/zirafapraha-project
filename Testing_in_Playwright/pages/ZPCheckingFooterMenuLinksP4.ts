import { Page, expect, request as playwrightRequest } from '@playwright/test';

export class ZPCheckingFooterMenuLinksP4 {
  constructor(private page: Page) {}

  /** Клик по логотипу для возврата на главную */
  async clickLogo() {
    const logo = this.page.locator('div[data-id="e164408"] img');
    await logo.click();
    await this.page.waitForLoadState('domcontentloaded');

    const currentURL = this.page.url();

    if (currentURL === 'https://zirafapraha.cz/' || currentURL === 'https://zirafapraha.cz') {
      console.log('✅ Логотип кликнут: переход выполнен успешно, ссылка верна!');
    } else {
      console.log(`⚠️ После клика перешли не на главную. Текущий URL: ${currentURL}`);
    }
  }

  /** Проверяем ссылки на вспомогательные страницы */
  async checkFooterMenuItemsP4() {
    
    // Селектор ul меню
    const menuItems = this.page.locator('ul#menu-1-ccd1037 > li'); 
    const count = await menuItems.count();

    for (let i = 0; i < count; i++) {
      const menuItem = menuItems.nth(i);
      const link = menuItem.locator('a').first();
      const linkText = await link.innerText();
      const href = await link.getAttribute('href');

      if (!href) continue;

      console.log(`Проверяем пункт меню: "${linkText}" с href: ${href}`);

      // Если ссылка ведет на внутренний сайт
      if (href.includes('zirafapraha.cz/')) {
        await link.click();
        await this.page.waitForLoadState('domcontentloaded');

        const currentURL = this.page.url();
        console.log(`Сравниваем href: ${href} с текущим URL: ${currentURL}`);
        expect(currentURL).toContain(href);
        console.log(`✅ Ссылка правильная`);

        // 🔧 Формируем безопасное имя файла и метку времени
        const safeName = linkText.replace(/[^\wа-яё]+/gi, '_');
        const now = new Date();

        // Формат: чч.мм_дд.мм.гг
        const timestamp = `${now.getHours().toString().padStart(2, '0')}.${now.getMinutes().toString().padStart(2, '0')}_${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1)
          .toString()
          .padStart(2, '0')}.${now.getFullYear().toString().slice(-2)}`;

        // Пример имени: Atrakce_14.27_10.10.25.png
        const filePath = `screenshots/${safeName}_${timestamp}.png`;

        await this.page.screenshot({
          path: filePath,
          fullPage: true,
        });

        console.log(`📸 Скриншот сохранён: ${filePath}`);


        // Возврат на главную через логотип
        await this.clickLogo();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page).toHaveURL('https://zirafapraha.cz/');
      } else {
        // Внешняя ссылка — пропускаем
        console.log(`❌ Ссылка ведет на внешний сайт, пропускаем: ${href}`);
      }
    }
  }
}

