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





    // // Проверяем, что кнопка "Vše" активна
    // const vseButton = page.locator('button.e-filter-item[data-filter="__all"]');
    // await expect(vseButton).toHaveAttribute('aria-pressed', 'true');

    // // Функция для подсчета карточек
    // const countCards = async () => {
    //   return await page.locator('.elementor-loop-container .e-loop-item:visible').count();
    // };

    // const allCount = await countCards();
    // console.log(`☑️ Количество карточек для "Vše": ${allCount}`);

    // // Фильтр "Pro nejmenší"
    // await page.locator('button.e-filter-item[data-filter="pro-nejmensi"]').click();
    // await page.waitForTimeout(1500);
    // const count1 = await countCards();
    // console.log(`☑️ Количество карточек для "Pro nejmenší": ${count1}`);

    // // Фильтр "Sportovní"
    // await page.locator('button.e-filter-item[data-filter="sportovni"]').click();
    // await page.waitForTimeout(1500);
    // const count2 = await countCards();
    // console.log(`☑️ Количество карточек для "Sportovní": ${count2}`);

    // // Фильтр "Zážitkové"
    // await page.locator('button.e-filter-item[data-filter="zazitkove"]').click();
    // await page.waitForTimeout(1500);
    // const count3 = await countCards();
    // console.log(`☑️ Количество карточек для "Zážitkové": ${count3}`);

    // const totalFiltered = count1 + count2 + count3;
    // console.log(`☑️ Общее количество карточек после фильтрации: ${totalFiltered}`);

    // // Проверка совпадения
    // if (allCount > totalFiltered) {
    //   console.log(`✅ Количество карточек во вкладке "Vše" (${allCount}) больше количества карточек в остальных вкладках (${totalFiltered})`);
    // } else if (allCount === totalFiltered) {
    //   console.log(`✅ Количество карточек во вкладке "Vše" (${allCount}) совпадает с количеством карточек в остальных вкладках (${totalFiltered})`);
    // } else {
    //   console.warn(`⚠️ Количество карточек во вкладке "Vše" (${allCount}) меньше количества карточек в остальных вкладках (${totalFiltered})`);
    // }

    // // Для надёжности можно добавить автопроверку
    // await expect(allCount).toBeGreaterThanOrEqual(totalFiltered);
  
