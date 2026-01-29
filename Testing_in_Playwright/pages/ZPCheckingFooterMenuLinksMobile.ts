import { Page, expect, request as playwrightRequest } from '@playwright/test';

export class ZPCheckingFooterMenuLinksMobile {
  constructor(private page: Page) {}

  /** Клик по логотипу для возврата на главную */
  async clickLogo() {
    const logo = this.page.locator('div[data-id="e164408"] img');
    await logo.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForURL(/zirafapraha\.cz\/?$/, { timeout: 5000 });

    const currentURL = this.page.url();
    if (currentURL.includes('zirafapraha.cz')) {
      console.log('✅ Логотип кликнут: переход выполнен успешно, ссылка верна!');
    } else {
      console.log(`⚠️ После клика перешли не на главную. Текущий URL: ${currentURL}`);
    }
  }

  /** Проверка всех пунктов меню мобильной версии */
  async checkFooterMenuItemsMobile() {
    console.log('\n🟦 Проверка ссылок в мобильной версии footer...');
    const footerBlock = this.page.locator('div[data-id="58bb0a0"]');
    await expect(footerBlock).toBeVisible({ timeout: 5000 });

    const linkLocators = footerBlock.locator('a');
    const linkCount = await linkLocators.count();
    console.log(`🔗 Найдено ссылок внутри блока footer data-id="58bb0a0": ${linkCount}`);

    const checkedLinks: { url: string; status: number }[] = [];
    const badLinks: { url: string; status: number }[] = [];

    // Создаём безопасный HTTP контекст с User-Agent
    const contextRequest = await playwrightRequest.newContext({
      extraHTTPHeaders: {
        'User-Agent':
          'Mozilla/5.0 (Linux; Android 15; Redmi Note 14 Pro+ 5G Build/XXXXXX) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141 Mobile Safari/537.36',
      },
    });

    // Проверяем все ссылки по очереди
    for (let i = 0; i < linkCount; i++) {
      const href = await linkLocators.nth(i).getAttribute('href');
      if (!href) continue;

      // Пропускаем невалидные ссылки
      if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
        console.log(`⏭️ Пропущена невалидная ссылка: ${href}`);
        continue;
      }

      const absoluteUrl = href.startsWith('http')
        ? href
        : new URL(href, this.page.url()).toString();

      // Разделяем внутренние и внешние ссылки
      if (absoluteUrl.includes('zirafapraha.cz')) {
        // Внутренние ссылки: строгая проверка
        try {
          const response = await contextRequest.get(absoluteUrl);
          const status = response.status();
          console.log(`🌐 ${absoluteUrl} → ${status}`);
          checkedLinks.push({ url: absoluteUrl, status });

          if (status < 200 || status >= 400) {
            badLinks.push({ url: absoluteUrl, status });
          }
        } catch {
          console.warn(`⚠️ Ошибка запроса: ${absoluteUrl}`);
          checkedLinks.push({ url: absoluteUrl, status: 0 });
          badLinks.push({ url: absoluteUrl, status: 0 });
        }
      } else {
        // Внешние соцсети: проверяем, но не падаем при ошибке
        try {
          const response = await contextRequest.get(absoluteUrl);
          console.log(`🌐 Соцсеть ${absoluteUrl} → ${response.status()}`);
        } catch {
          console.warn(`⚠️ Не удалось проверить соцсеть ${absoluteUrl}`);
        }
      }
    }

    console.log('\n📋 Все проверенные внутренние ссылки:');
    checkedLinks.forEach(({ url, status }) => console.log(` - ${url} → ${status}`));

    if (badLinks.length > 0) {
      console.log('\n❌ Битые внутренние ссылки:');
      badLinks.forEach(({ url, status }) => console.log(` - ${url} → ${status}`));
    } else {
      console.log('\n✅ Все внутренние ссылки успешны!');
    }

    // Падение теста только при битых внутренних ссылках
    expect(badLinks, 'Обнаружены битые внутренние ссылки').toEqual([]);
  }
}
