import { devices, test } from '@playwright/test';
import { ZPHomePage } from '../pages/ZPHomePage';
import { ZPGaleriePage } from '../pages/ZPGaleriePage';
import { ZPCheckingGalerie } from '../pages/ZPCheckingGalerie';


 test.setTimeout(150000); 


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


