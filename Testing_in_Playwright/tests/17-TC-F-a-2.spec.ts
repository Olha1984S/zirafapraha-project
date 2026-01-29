import { test } from '@playwright/test';
import { ZPHomePage } from '../pages/ZPHomePage';
import { ZPCheckingFooterMenuLinks } from '../pages/ZPCheckingFooterMenuLinks';
import { ZPCheckingFooterMenuLinksP2 } from '../pages/ZPCheckingFooterMenuLinksP2';
import { ZPCheckingFooterMenuLinksP3 } from '../pages/ZPCheckingFooterMenuLinksP3';
import { ZPCheckingFooterMenuLinksP4 } from '../pages/ZPCheckingFooterMenuLinksP4';

test('Проверка переходов по всем пунктам меню и возврат на главную', async ({ page }) => {
  const homePage = new ZPHomePage(page);
  const mainMenuLinks = new ZPCheckingFooterMenuLinks(page);
  const mainMenuLinksP2 = new ZPCheckingFooterMenuLinksP2(page);
  const mainMenuLinksP3 = new ZPCheckingFooterMenuLinksP3(page);
  const mainMenuLinksP4 = new ZPCheckingFooterMenuLinksP4(page);

  // Открываем главную страницу
  await homePage.goto();

  // Принимаем cookie
  await homePage.acceptCookies();

  // Проверяем видимость блока на домашней странице
  await homePage.checkHomePage();

  await mainMenuLinks.clickLogo();

  //Проверяем доступность внешних ссылок
  await mainMenuLinks.checkFooterMenuItems();

  //Проверяем все пункты меню 
  await mainMenuLinksP2.checkFooterMenuItemsP2();
    
  //Проверяем ссылку на покупку билетов 
  await mainMenuLinksP3.checkFooterMenuItemsP3();
      
  //Проверяем ссылки на вспомогательные страницы 
  await mainMenuLinksP4.checkFooterMenuItemsP4();

});
