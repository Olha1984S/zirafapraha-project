import { devices, test } from '@playwright/test';
import { ZPHomePage } from '../pages/ZPHomePage';
import { ZPCheckingVyberVstupenek } from '../pages/ZPCheckingVyberVstupenek';


//  test.setTimeout(150000); 


test('Проверка выбора колическо и стоимости билетов', async ({ page }) => {
  const homePage = new ZPHomePage(page);
  const vyberVstupenek = new ZPCheckingVyberVstupenek(page);

  
  // Открываем главную страницу
  await homePage.goto();
  await homePage.acceptCookies();
  await homePage.lincVstupenky();

  await vyberVstupenek.checkingVyberVstupenek();

});


