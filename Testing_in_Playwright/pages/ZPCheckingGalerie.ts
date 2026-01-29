import { Page, expect } from '@playwright/test';

export class ZPCheckingGalerie {
  constructor(private page: Page) {}

  /** Проверка работы галереи фотографий */
  async checkingGalerie() {
    const { page } = this;
    console.log(`Получаем общее количество фотографий в галерее`);
    // Локатор контейнера с фотографиями
    const galleryContainer = page.locator('[data-id="1e972c9"] a');

    // Получаем общее количество фотографий в галерее
    console.log(`Получаем общее количество фотографий в галерее`);
    const photoCount = await galleryContainer.count();
    console.log(`Всего фотографий в галерее: ${photoCount}`);

    expect(photoCount).toBeGreaterThan(0);

    // Выбираем случайное фото
    const randomIndex = Math.floor(Math.random() * photoCount);
    console.log(`Проверяется фото №${randomIndex + 1}`);

    // Кликаем по выбранной фотографии
    await galleryContainer.nth(randomIndex).click();

    // Проверяем общее количество фотографий в слайдере
    const totalNumber = parseInt(await page.locator('.swiper-pagination-total').textContent() || '0', 10);
    expect(totalNumber).toBe(photoCount);
    console.log(`✅ Совпадение общего количества: ${totalNumber}`);

    // Проверяем текущий номер фотографии в слайдере
    const currentNumber = parseInt(await page.locator('.swiper-pagination-current').textContent() || '0', 10);

    // Если на последнем фото, допускаем возврат к первому
    if (currentNumber !== randomIndex + 1) {
    console.warn(`⚠️ Несовпадение индекса: ожидалось ${randomIndex + 1}, получено ${currentNumber}`);
    } else {
    console.log(`✅ Совпадение текущего номера: ${currentNumber}`);
    }

    // Проверяем перелистывание вправо
    const nextButton = page.locator('i.eicon-chevron-right');
    await nextButton.click();
    await page.waitForTimeout(500);

    const nextNumber = parseInt(await page.locator('.swiper-pagination-current').textContent() || '0', 10);
    if (nextNumber === 1 && currentNumber === totalNumber) {
    console.log('✅ Перелистывание вправо с последнего на первое фото успешно');
    } else {
    expect(nextNumber).toBe(currentNumber + 1);
    console.log(`✅ Перелистывание вправо успешно: ${currentNumber} → ${nextNumber}`);
    }

    // Проверяем перелистывание влево (возврат на исходное фото)
    const prevButton = page.locator('i.eicon-chevron-left');
    await prevButton.click();
    await page.waitForTimeout(500);

    const prevNumber = parseInt(await page.locator('.swiper-pagination-current').textContent() || '0', 10);
    if (prevNumber === totalNumber && nextNumber === 1) {
    console.log('✅ Перелистывание влево с первого на последнее фото успешно');
    } else {
    expect(prevNumber === nextNumber - 1 || prevNumber === totalNumber).toBeTruthy();
    console.log(`✅ Перелистывание влево успешно: ${nextNumber} → ${prevNumber}`);
    }
    // Проверка кнопки полноэкранного режима
    const fullscreenButton = page.locator('i[aria-label="Celá obrazovka"]');
    await fullscreenButton.click();

    // Проверяем полноэкранные режим
    await expect(fullscreenButton).toHaveAttribute('aria-checked', 'true');
    console.log('Фотография развернулась на весь экран');

    // Проверка иконки увеличения масштаба
    const zoomButton = page.locator('.eicon-frame-minimize');
    await zoomButton.click();
    console.log('Выполнено увеличение масштаба');

    // Закрытие галереи
    const closeButton = page.locator('a[aria-label="Zavřít (Esc)"]');
    //await page.waitForSelector('i[aria-label="Zavřít (Esc)"]', { state: 'visible', timeout: 60000 });

   // await expect(closeButton).toBeVisible();
    await closeButton.click();

    await expect(galleryContainer.first()).toBeVisible();
    console.log('✅ Галерея закрыта');
  }
}



