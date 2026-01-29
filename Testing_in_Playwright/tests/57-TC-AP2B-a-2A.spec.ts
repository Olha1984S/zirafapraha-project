import { devices, test } from '@playwright/test';
import { ZPAtrakcePage } from '../pages/ZPAtrakcePage';
import { ZPDeterminingNumberCards } from '../pages/ZPDeterminingNumberCards';

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

test('Проверка карточек аттракционов', async ({ page }) => {
  const atrakcePage = new ZPAtrakcePage(page);
  const numberCards = new ZPDeterminingNumberCards(page);
  
  // Открываем главную страницу
  await atrakcePage.goto();
    
  // Переход на страницу Atrakce
  await atrakcePage.checkAtrakcePage();

  // Подсчет карточек товара
  await numberCards.determingNumberCards();
});


