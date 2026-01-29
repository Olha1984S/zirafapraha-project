import { Page, expect, request as playwrightRequest } from '@playwright/test';

export class ZPCheckingFooterMenuLinks {
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

  /** Проверка всех ссылок внутри блока footer */
  async checkFooterMenuItems() {
    const footerBlock = this.page.locator('div[data-id="58bb0a0"]');
    await expect(footerBlock).toBeVisible({ timeout: 5000 });

    const linkLocators = footerBlock.locator('a');
    const linkCount = await linkLocators.count();
    console.log(`🔗 Найдено ссылок внутри блока footer data-id="58bb0a0": ${linkCount}`);

    const checkedLinks: { url: string; status: number }[] = [];
    const badLinks: { url: string; status: number }[] = [];

    const contextRequest = await playwrightRequest.newContext({
      extraHTTPHeaders: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141 Safari/537.36',
      },
    });

    // 🔹 Основной цикл проверки ссылок
    for (let i = 0; i < linkCount; i++) {
      const href = await linkLocators.nth(i).getAttribute('href');
      if (!href) continue;

      // Пропускаем невалидные ссылки
      if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
        console.log(`⏭️ Пропущена невалидная ссылка: ${href}`);
        continue;
      }

      const absoluteUrl = href.startsWith('http') ? href : new URL(href, this.page.url()).toString();

      // Проверяем внутренние и внешние ссылки по-разному
      if (absoluteUrl.includes('zirafapraha.cz')) {
        // 🔹 Внутренние ссылки: строгая проверка
        try {
          const response = await contextRequest.get(absoluteUrl);
          const status = response.status();
          console.log(`🌐 ${absoluteUrl} → ${status}`);
          checkedLinks.push({ url: absoluteUrl, status });

          if (status < 200 || status >= 400) {
            badLinks.push({ url: absoluteUrl, status });
          }
        } catch (error) {
          console.warn(`⚠️ Ошибка запроса: ${absoluteUrl}`);
          checkedLinks.push({ url: absoluteUrl, status: 0 });
          badLinks.push({ url: absoluteUrl, status: 0 });
        }
      } else {
        // 🔹 Внешние соцсети: логируем статус без падения теста
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

    // Тест падает только если битые внутренние ссылки
    expect(badLinks, 'Обнаружены битые внутренние ссылки').toEqual([]);
  }
}



