import { Page, expect } from '@playwright/test';

export class ZPDeterminingOrderAmount {
  constructor(private page: Page) {}

  /** Подсчет карточек товара и проверка фильтров */
  async determiningOrderAmount() {
    const { page } = this;

    /** Заполнение формы валидными данными */
    // Ввод имени именинника
    await page.locator('#name').fill('Tereza Malá');

    // Ввод возраста (которые по счёту день рождения)
    await page.locator('#old').fill('7');

    // Ввод количества детей (включая именинника)
    await page.locator('#count').fill('8');

    // Ввод количества сопровождающих
    await page.locator('#parents').fill('3');

    // Ввод даты праздника
    await page.locator('#date').fill('2025-11-22'); 
    // формат для input[type="date"] должен быть YYYY-MM-DD

    // Ввод времени праздника
    await page.locator('#time').fill('13:00');

    // Проверка, что значения корректно записались
    await expect(page.locator('#name')).toHaveValue('Tereza Malá');
    await expect(page.locator('#old')).toHaveValue('7');
    await expect(page.locator('#count')).toHaveValue('8');
    await expect(page.locator('#parents')).toHaveValue('3');
    await expect(page.locator('#date')).toHaveValue('2025-11-22');
    await expect(page.locator('#time')).toHaveValue('13:00');
    
  }
}

