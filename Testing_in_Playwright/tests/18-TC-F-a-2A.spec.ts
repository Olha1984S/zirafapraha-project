import { devices, test } from '@playwright/test';
import { ZPHomePage } from '../pages/ZPHomePage';
import { ZPCheckingFooterMenuLinksMobile } from '../pages/ZPCheckingFooterMenuLinksMobile';
import { ZPCheckingFooterMenuLinksMobileP2 } from '../pages/ZPCheckingFooterMenuLinksMobileP2';
import { ZPCheckingFooterMenuLinksMobileP3 } from '../pages/ZPCheckingFooterMenuLinksMobileP3';
import { ZPCheckingFooterMenuLinksMobileP4 } from '../pages/ZPCheckingFooterMenuLinksMobileP4';

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

test('Проверка переходов по всем пунктам меню и возврат на главную', async ({ page }) => {
  const homePage = new ZPHomePage(page);
  const mainMenuLinks = new ZPCheckingFooterMenuLinksMobile(page);
  const mainMenuLinksMobileP2 = new ZPCheckingFooterMenuLinksMobileP2(page);
  const mainMenuLinksMobileP3 = new ZPCheckingFooterMenuLinksMobileP3(page);
  const mainMenuLinksMobileP4 = new ZPCheckingFooterMenuLinksMobileP4(page);

  // Открываем главную страницу
  await homePage.goto();

  // Принимаем cookie
  await homePage.acceptCookies();

  // Проверяем видимость блока на домашней странице
  await homePage.checkHomePage();

  await mainMenuLinks.clickLogo();

  //Проверяем все пункты меню
  await mainMenuLinks.checkFooterMenuItemsMobile();

  //Проверяем все пункты меню 
  await mainMenuLinksMobileP2.checkFooterMenuItemsMobileP2();
    
  //Проверяем ссылку на покупку билетов 
  await mainMenuLinksMobileP3.checkFooterMenuItemsMobileP3();
      
  //Проверяем ссылки на вспомогательные страницы 
  await mainMenuLinksMobileP4.checkFooterMenuItemsMobileP4();
});
