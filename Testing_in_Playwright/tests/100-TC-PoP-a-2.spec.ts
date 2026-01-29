import { devices, test, expect} from '@playwright/test';
import { ZPHomePage } from '../pages/ZPHomePage';
import { ZPRezervaceOslavyPage } from '../pages/ZPRezervaceOslavyPage';
import { ZPDeterminingOrderAmount } from '../pages/ZPDeterminingOrderAmount';


test('Проверка выбора колическо и стоимости резервирования', async ({ page }) => {
  const homePage = new ZPHomePage(page);
  const rezervaceOslavy = new ZPRezervaceOslavyPage(page);
  const determiningOrder = new ZPDeterminingOrderAmount(page);
  
  // Открываем главную страницу
  await homePage.goto();
  await homePage.acceptCookies();

  await rezervaceOslavy.lincRezervaceOslavy();
  await determiningOrder.determiningOrderAmount();

  // --- Блок 1. Údaje o oslavě ---
  await page.locator('#name').fill('Tereza Malá');
  await page.locator('#old').fill('7');
  await page.locator('#count').fill('8');
  await page.locator('#parents').fill('3');
  await page.locator('#date').fill('2025-11-22');
  await page.locator('#time').fill('13:00');
    
  // Проверка, что данные записались
  await expect(page.locator('#name')).toHaveValue('Tereza Malá');
  await expect(page.locator('#old')).toHaveValue('7');
  await expect(page.locator('#count')).toHaveValue('8');
  await expect(page.locator('#parents')).toHaveValue('3');
  await expect(page.locator('#date')).toHaveValue('2025-11-22');
  await expect(page.locator('#time')).toHaveValue('13:00');

  // --- Блок 2. Kontaktní údaje ---
  await page.locator('#name-order').fill('Jan Novák');          
  await page.locator('#email').fill('novak@gmaik.cod');         
  await page.locator('#phone').fill('+420777888999');           

  // Проверка, что значения записались
  await expect(page.locator('#name-order')).toHaveValue('Jan Novák');
  await expect(page.locator('#email')).toHaveValue('novak@gmaik.cod');
  await expect(page.locator('#phone')).toHaveValue('+420777888999');

  const checkboxes = page.locator('input.check-b__input[data-price]');
  const count = await checkboxes.count();

  console.log(`Найдено ${count} чекбоксов.`);

  const groupA: { index: number; name: string; price: number }[] = [];
  const groupB: { index: number; name: string; price: number }[] = [];

  for (let i = 0; i < count; i++) {
    const checkbox = checkboxes.nth(i);
    const label = checkbox.locator('xpath=following-sibling::span[contains(@class, "check-b__text")]');
    const name = (await label.textContent())?.trim() || '';
    const price = Number(await checkbox.getAttribute('data-price'));

    if (name.toLowerCase() === 'objednat') {
      groupB.push({ index: i, name, price });
    } else {
      groupA.push({ index: i, name, price });
    }
  }

  console.log(`Найдено ${groupA.length} позиций тортов.`);
  console.log(`Найдено ${groupB.length} позиций дополнительных услуг.`);

  // Выбираем по одному случайному элементу из каждой группы
  const randomA = groupA[Math.floor(Math.random() * groupA.length)];
  const randomB = groupB[Math.floor(Math.random() * groupB.length)];

  const checkboxA = checkboxes.nth(randomA.index);
  const checkboxB = checkboxes.nth(randomB.index);

  await checkboxA.check();
  await checkboxB.check();

  console.log(`Выбран торт: ${randomA.name} — ${randomA.price} Kč`);
  console.log(`Выбрана дополнительная услуга: ${randomB.name} — ${randomB.price} Kč`);

  // Проверяем, что чекбоксы действительно отмечены
  await expect(checkboxA).toBeChecked();
  await expect(checkboxB).toBeChecked();


  // --- Теперь добавляем блоки с количеством ---
  const countBlocks = page.locator('.form-other__row:has(.count__input)');
  const countCount = await countBlocks.count();

  console.log(`Найдено ${countCount} блоков с полем количества.`);

  if (countCount > 0) {
    const randomCountIndex = Math.floor(Math.random() * countCount);
    const randomBlock = countBlocks.nth(randomCountIndex);

    // Название блока
    const blockName = (await randomBlock.locator('.form-other__text').textContent())?.trim() || 'Неизвестно';

    // Цены берём из атрибута data-price поля input
    const priceInput = randomBlock.locator('.count__input');
    const blockPrice = Number(await priceInput.getAttribute('data-price'));

    // Нажимаем "+"
    await randomBlock.locator('.js-count-plus').click();

    // Проверяем, что значение увеличилось
    const newValue = await priceInput.inputValue();
    console.log(`Увеличили количество для "${blockName}" (${blockPrice} Kč за единицу). Новое значение: ${newValue}`);
    
    // Добавляем этот блок к общему расчёту
    var countTotalPrice = blockPrice * Number(newValue);
  } else {
    console.log('Блоки с полем количества не найдены.');
    var countTotalPrice = 0;
  }



})


