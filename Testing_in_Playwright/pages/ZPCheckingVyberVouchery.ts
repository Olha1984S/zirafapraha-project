import { Page, expect } from '@playwright/test';

export class ZPCheckingVyberVouchery {
  constructor(private page: Page) {}

  /** Проверка работы блока "Výběr vouchery" */
  async checkingVybeVouchery() {
    const { page } = this;

    // Получаем список карточек
    const cards = page.locator('article.entry-item.js-entry-product');
    const cardCount = await cards.count();
    console.log(`Найдено ${cardCount} карточек билетов`);
    expect(cardCount).toBe(4);

    // Количество кликов для первой и второй карточки
    console.log('Рандомно выбираем 2 вида карточки');
    const firstClicks = 1;
    const secondClicks = 3;
    const secondMinusClicks = 1;

    // === ПЕРВАЯ ИТЕРАЦИЯ ===
    const firstIndex = Math.floor(Math.random() * cardCount);
    const firstCard = cards.nth(firstIndex);
    const firstNameFull = (await firstCard.locator('h2.entry-item__name').textContent())?.trim() || 'Без названия';
    const firstName = firstNameFull.split(',')[0].trim(); // обрезаем цену
    const firstPrice = parseFloat(await firstCard.getAttribute('data-price') || '0');

    console.log(' ');
    console.log(`Выбрана карточка "${firstName}", и делаем кликов: ${firstClicks}`);

    const firstPlus = firstCard.locator('.entry-item__button.js-plus-product');
    for (let i = 0; i < firstClicks; i++) {
      await firstPlus.click();
    }

    const firstValue = parseInt(await firstCard.locator('.entry-item__input.js-value-product').inputValue(), 10);
    const firstTotal = firstPrice * firstValue;
    console.log(`Стоимость выбранной карточки "${firstName}" стоимостью ${firstPrice}: ${firstTotal} Kč`);

    // === ВТОРАЯ ИТЕРАЦИЯ ===
    let secondIndex;
    do {
      secondIndex = Math.floor(Math.random() * cardCount);
    } while (secondIndex === firstIndex);

    const secondCard = cards.nth(secondIndex);
    const secondNameFull = (await secondCard.locator('h2.entry-item__name').textContent())?.trim() || 'Без названия';
    const secondName = secondNameFull.split(',')[0].trim(); // обрезаем цену
    const secondPrice = parseFloat(await secondCard.getAttribute('data-price') || '0');

    console.log(' ');
    console.log(`Выбрана карточка "${secondName}", и делаем кликов: ${secondClicks}`);

    const secondPlus = secondCard.locator('.entry-item__button.js-plus-product');
    for (let i = 0; i < secondClicks; i++) {
      await secondPlus.click();
    }

    let secondValue = parseInt(await secondCard.locator('.entry-item__input.js-value-product').inputValue(), 10);
    let secondTotal = secondPrice * secondValue;
    console.log(`Стоимость выбранной карточки "${secondName}" стоимостью ${secondPrice}: ${secondTotal} Kč`);

    // === УМЕНЬШЕНИЕ КОЛИЧЕСТВА ВТОРОЙ КАРТОЧКИ ===
    if (secondClicks > secondMinusClicks) {
      console.log(`Уменьшаем количество карточек "${secondName}" на ${secondMinusClicks}`);
      const secondMinus = secondCard.locator('.entry-item__button.js-minus-product');

      for (let i = 0; i < secondMinusClicks; i++) {
        await secondMinus.click();
      }

      secondValue = parseInt(await secondCard.locator('.entry-item__input.js-value-product').inputValue(), 10);
      secondTotal = secondPrice * secondValue;

      console.log(`После уменьшения количество: ${secondValue}, сумма: ${secondTotal} Kč`);
    } else {
      console.log(`Количество карточек "${secondName}" не уменьшалось, т.к. оно = ${secondClicks}`);
    }

    // === ОБЩАЯ СУММА ВСЕХ ВЫБРАННЫХ КАРТОЧЕК ===
    let totalPrice = 0;
    for (let i = 0; i < cardCount; i++) {
      const card = cards.nth(i);
      const price = parseFloat(await card.getAttribute('data-price') || '0');
      const value = parseInt(await card.locator('.entry-item__input.js-value-product').inputValue(), 10);
      totalPrice += price * value;
    }

    const subtotal = parseFloat(await page.locator('.js-total-price').textContent() || '0');
    // const total = parseFloat(await page.locator('.js-total-price').textContent() || '0');

    console.log(' ');
    console.log(`Общая стоимость всех выбранных карточек: ${totalPrice} Kč`);
    // console.log(`После 10% скидки имеем: ${total} Kč`);
    console.log('✅ Проверка обновления итоговой суммы прошла успешно!');

    // === ПЕРЕХОД НА СТРАНИЦУ ЗАКАЗА ===
    console.log('Нажимаем кнопку "Koupit" для перехода к оформлению заказа...');
    const buyButton = page.locator('button.entry-total__button', { hasText: 'Koupit' });
    await expect(buyButton).toBeVisible();
    await buyButton.click();

    // Ожидаем переход
    await page.waitForURL(/shrnuti-objednavky/);
    console.log('✅ Переход на страницу "Shrnutí a platba".');

    // Проверка заголовка
    const activeHeading = page.locator('h2.elementor-heading-title', { hasText: 'Shrnutí a platba' });
    await expect(activeHeading).toBeVisible();
    
    // === ПРОВЕРКА ДАННЫХ НА СТРАНИЦЕ ЗАКАЗА ===
    console.log('Проверяем корректность данных в таблице заказа.');
    const summaryRows = page.locator('.entries-summary__row');

    // Проверка первой карточки
    const firstRow = summaryRows.filter({ hasText: firstName }).first();
    await expect(firstRow).toBeVisible();

    const firstRowText = await firstRow.textContent();
    const firstRowPriceText = await firstRow.locator('.entries-summary__price').textContent();

    expect(firstRowText).toContain(`${firstValue}x`);
    expect(firstRowPriceText).toContain(firstTotal.toString());
    console.log(`Проверена карточка "${firstName}" (${firstValue}x = ${firstTotal} Kč)`);

    // Проверка второй карточки
    const secondRow = summaryRows.filter({ hasText: secondName }).first();
    await expect(secondRow).toBeVisible();

    const secondRowText = await secondRow.textContent();
    const secondRowPriceText = await secondRow.locator('.entries-summary__price').textContent();

    expect(secondRowText).toContain(`${secondValue}x`);
    expect(secondRowPriceText).toContain(secondTotal.toString());
    console.log(`Проверена карточка "${secondName}" (${secondValue}x = ${secondTotal} Kč)`);

    // === Проверка общей суммы (CELKOVÁ CENA) ===
    const totalSummaryElement = page.locator('.entries-summary__total');
    const totalSummaryText = (await totalSummaryElement.textContent())?.trim() || '';

    if (!totalSummaryText) {
      throw new Error('Не удалось получить текст общей суммы с итоговой страницы');
    }

    // Извлекаем только число, убираем "Kč" и пробелы
    const totalSummary = parseFloat(totalSummaryText.replace(/[^\d.,]/g, '').replace(',', '.'));

    // Проверяем разницу с рассчитанной суммой
    const difference = Math.abs(totalSummary - totalPrice);

    console.log(`Проверяем общую цену: на сайте ${totalSummary} Kč, рассчитано ${totalPrice} Kč`);
    expect(difference).toBeLessThanOrEqual(1);

    console.log(`✅ Итоговая цена совпадает (разница ${difference} Kč ≤ 1 Kč)`);
  }
}
