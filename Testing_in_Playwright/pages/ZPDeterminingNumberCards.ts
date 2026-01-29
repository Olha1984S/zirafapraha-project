import { Page, expect } from '@playwright/test';

export class ZPDeterminingNumberCards {
  constructor(private page: Page) {}

  /** Подсчет карточек товара и проверка фильтров */
  async determingNumberCards() {
    const { page } = this;

    // Проверяем, что кнопка "Vše" активна
    const vseButton = page.locator('button.e-filter-item[data-filter="__all"]');
    await expect(vseButton).toHaveAttribute('aria-pressed', 'true');

    // Функция для подсчета карточек
    const countCards = async () => {
      return await page.locator('.elementor-loop-container .e-loop-item:visible').count();
    };

    const allCount = await countCards();
    console.log(`☑️ Количество карточек для "Vše": ${allCount}`);

    // Фильтр "Pro nejmenší"
    await page.locator('button.e-filter-item[data-filter="pro-nejmensi"]').click();
    await page.waitForTimeout(1500);
    const count1 = await countCards();
    console.log(`☑️ Количество карточек для "Pro nejmenší": ${count1}`);

    // Фильтр "Sportovní"
    await page.locator('button.e-filter-item[data-filter="sportovni"]').click();
    await page.waitForTimeout(1500);
    const count2 = await countCards();
    console.log(`☑️ Количество карточек для "Sportovní": ${count2}`);

    // Фильтр "Zážitkové"
    await page.locator('button.e-filter-item[data-filter="zazitkove"]').click();
    await page.waitForTimeout(1500);
    const count3 = await countCards();
    console.log(`☑️ Количество карточек для "Zážitkové": ${count3}`);

    const totalFiltered = count1 + count2 + count3;
    console.log(`☑️ Общее количество карточек после фильтрации: ${totalFiltered}`);

    // Проверка совпадения
    if (allCount > totalFiltered) {
      console.log(`✅ Количество карточек во вкладке "Vše" (${allCount}) больше количества карточек в остальных вкладках (${totalFiltered})`);
    } else if (allCount === totalFiltered) {
      console.log(`✅ Количество карточек во вкладке "Vše" (${allCount}) совпадает с количеством карточек в остальных вкладках (${totalFiltered})`);
    } else {
      console.warn(`⚠️ Количество карточек во вкладке "Vše" (${allCount}) меньше количества карточек в остальных вкладках (${totalFiltered})`);
    }

    // Для надёжности можно добавить автопроверку
    await expect(allCount).toBeGreaterThanOrEqual(totalFiltered);
  }
}

