import { Page, expect } from '@playwright/test';

export class ZPCheckingEventCards {
  constructor(private page: Page) {}

  /** Проверка карточек мероприятий на странице Akce */
  async checkingEventCards() {
    const { page } = this;
    

    // Находим все карточки
    const cards = page.locator('.elementor-loop-container.elementor-grid .e-loop-item');
    const cardCount = await cards.count();
    console.log(` Найдено карточек мероприятий: ${cardCount}`);

    // Проходим по всем карточкам
    for (let i = 0; i < cardCount; i++) {
      const card = cards.nth(i);

      // Получаем название и дату
      const title = (await card.locator('h4.elementor-heading-title').textContent())?.trim() || '';
      const date = (await card.locator('.elementor-icon-list-text').textContent())?.replace(/\s+/g, ' ').trim() || '';

      console.log(`🟨 Проверяется карточка ${i + 1}: "${title}" — ${date}`);

      // Кликаем по кнопке "Zjistit více"
      const button = card.locator('a.elementor-button');
      const [newPage] = await Promise.all([
        page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
        button.click(),
      ]);

      // Проверка заголовка на новой странице
      const eventTitle = (await page.locator('h1.elementor-heading-title').textContent())?.trim() || '';
      const eventDate = (await page.locator('.elementor-icon-list-text').first().textContent())?.replace(/\s+/g, ' ').trim() || '';

      // Сравнение с данными карточки
      if (title === eventTitle && date === eventDate) {
        console.log(`✅ "${title}" — данные совпадают (${date})`);
      } else {
        console.warn(`⚠️ Несовпадение в карточке "${title}":`);
        if (title !== eventTitle) console.warn(`   • Название: ожидалось "${title}", получено "${eventTitle}"`);
        if (date !== eventDate) console.warn(`   • Дата: ожидалось "${date}", получено "${eventDate}"`);
      }

      // Возвращаемся обратно на страницу Akce
      await page.goto('https://zirafapraha.cz/akce/');
      await page.waitForSelector('.elementor-loop-container.elementor-grid');
    }

    console.log(`Проверка карточек завершена. Проверено карточек: "${cardCount}"`);
  }
}


