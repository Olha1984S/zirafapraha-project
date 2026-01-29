import { devices, test } from '@playwright/test';
import { ZPHomePage } from '../pages/ZPHomePage';
import { ZPGaleriePage } from '../pages/ZPGaleriePage';
import { ZPCheckingGalerie } from '../pages/ZPCheckingGalerie';


 test.setTimeout(150000); 

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
  const homePage = new ZPHomePage(page);
  const galeriePage = new ZPGaleriePage(page);
  const galerieCards = new ZPCheckingGalerie(page);
  
  // Открываем главную страницу
  await homePage.goto();
  await homePage.acceptCookies();

  // Переход на страницу "Akce"
  await galeriePage.goto();
    
  // Проверка страницы Akce
  await galeriePage.checkGaleriePage();

  // Подсчет карточек товара
  await galerieCards.checkingGalerie();
});


