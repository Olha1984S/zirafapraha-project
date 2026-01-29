import { Page, expect } from '@playwright/test';

export class ZPCheckingMainMenuLinksMobile {
  constructor(private page: Page) {}

  /** Открытие бургер-меню, если оно присутствует */
  async openBurgerMenuIfExists() {
    const burgerButton = this.page.locator('[data-id="ea4ab7e"] .elementor-menu-toggle');

    if (await burgerButton.isVisible()) {
      const expanded = await burgerButton.getAttribute('aria-expanded');
      if (expanded === 'false') {
        console.log('➡️ Обнаружено бургер-меню — открываем...');
        await burgerButton.click();

        // 🔧 Ждём, пока меню действительно откроется
        await this.page.waitForSelector(
          'nav.elementor-nav-menu--dropdown[aria-hidden="false"]',
          { timeout: 10000 }
        );
        console.log('✅ Меню раскрыто');
      } else {
        console.log('ℹ️ Меню уже раскрыто');
      }
    } else {
      console.log('❌ Бургер-меню не найдено — возможно, десктопная версия.');
    }
  }

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

  /** 🔧 Проверка всех пунктов меню мобильной версии */
  async checkMenuItems() {
    // Открываем бургер, если нужно
    await this.openBurgerMenuIfExists();

    // 🔧 Ждём появления активного выпадающего меню
    await this.page.waitForSelector(
      'nav.elementor-nav-menu--dropdown[aria-hidden="false"]',
      { timeout: 10000 }
    );

    console.log('✅ Мобильное меню раскрыто, начинаем проверку ссылок');

    // 🔧 Используем ul#menu-2-... — это именно мобильное меню
    const menuItems = this.page.locator('ul#menu-2-ea4ab7e > li');
    const count = await menuItems.count();

    for (let i = 0; i < count; i++) {
      // 🔧 Иногда меню закрывается после клика — открываем снова
      await this.openBurgerMenuIfExists();

      const menuItem = menuItems.nth(i);
      const link = menuItem.locator('a').first();
      const linkText = (await link.innerText()).trim();
      const href = await link.getAttribute('href');

      if (!href) continue;
      console.log(`🔹 Проверяем пункт меню: "${linkText}" → ${href}`);

      if (href.includes('zirafapraha.cz/')) {
        await link.scrollIntoViewIfNeeded(); // 🔧 гарантируем, что ссылка в зоне видимости
        await link.click({ timeout: 10000 });
        await this.page.waitForLoadState('domcontentloaded');

        const currentURL = this.page.url();
        expect(currentURL).toContain(href);
        console.log(`✅ Переход по "${linkText}" успешен`);

        // 🔧 Формируем безопасное имя файла и метку времени
        const safeName = linkText.replace(/[^\wа-яё]+/gi, '_');
        const now = new Date();

        // Формат: чч.мм_дд.мм.гг
        const timestamp = `${now.getHours().toString().padStart(2, '0')}.${now.getMinutes().toString().padStart(2, '0')}_${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1)
          .toString()
          .padStart(2, '0')}.${now.getFullYear().toString().slice(-2)}`;
        
        // приставка
        const prefix = 'MV_';

        // Пример имени: Atrakce_14.27_10.10.25.png
        const filePath = `screenshots/${prefix}${safeName}_${timestamp}.png`;

        await this.page.screenshot({
          path: filePath,
          fullPage: true,
        });

        console.log(`📸 Скриншот сохранён: ${filePath}`);

        // Возврат на главную
        await this.clickLogo();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page).toHaveURL('https://zirafapraha.cz/');
      } else {
        console.log(`❌ Внешняя ссылка, пропускаем: ${href}`);
      }
    }

    console.log('✅ Проверка всех пунктов мобильного меню завершена');
  }
}
