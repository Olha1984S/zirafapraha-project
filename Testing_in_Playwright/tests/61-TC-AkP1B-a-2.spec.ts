import { test } from '@playwright/test';
import { ZPHomePage } from '../pages/ZPHomePage';
import { ZPAkcePage } from '../pages/ZPAkcePage';
import { ZPCheckingEventCards } from '../pages/ZPCheckingEventCards';


test.setTimeout(300000); 


test('Проверка карточек аттракционов', async ({ page }) => {
  const homePage = new ZPHomePage(page);
  const akcePage = new ZPAkcePage(page);
  const eventCards = new ZPCheckingEventCards(page);
  
  // Открываем главную страницу
  await homePage.goto();
  await homePage.acceptCookies();

  // Переход на страницу "Akce"
  await akcePage.goto();
    
  // Проверка страницы Akce
  await akcePage.checkAkcePage();

  // Подсчет карточек товара
  await eventCards.checkingEventCards();
});


