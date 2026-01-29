import { test, devices } from '@playwright/test';
import { ZPHomePage } from '../pages/ZPHomePage';
import { ZPCheckingMainMenuLinksMobile } from '../pages/ZPCheckingMainMenuLinksMobile';

// Настройка эмуляции Redmi Note 14 Pro+ (через профиль Pixel 5)
test.use({
  ...devices['Pixel 5'],
  viewport: { width: 412, height: 915 }, // 🔹 логические пиксели (адаптив активируется)
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
  userAgent:
    'Mozilla/5.0 (Linux; Android 15; Redmi Note 14 Pro+ 5G Build/XXXXXX) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141 Mobile Safari/537.36',
});

test('Проверка пунктов меню на мобильной версии сайта', async ({ page }) => {
  const homePage = new ZPHomePage(page);
  const mainMenuLinksMobile = new ZPCheckingMainMenuLinksMobile(page);

  // Открываем главную страницу
  await homePage.goto();

  // Принимаем cookie
  await homePage.acceptCookies();

  // Проверяем видимость блока на домашней странице
  await homePage.checkHomePage();

  // Проверяем работу меню в мобильной версии (через бургер)
  await mainMenuLinksMobile.openBurgerMenuIfExists();

  // Проверяем все пункты меню
  await mainMenuLinksMobile.checkMenuItems();

  // Отладка: вывод параметров устройства
  console.log('🧭 userAgent:', await page.evaluate(() => navigator.userAgent));
  console.log('📱 viewport:', await page.viewportSize());
  console.log('🤚 Touch support:', await page.evaluate(() => "ontouchstart" in window));
});
