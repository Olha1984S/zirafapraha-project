import { devices, test } from '@playwright/test';
import { ZPHomePage } from '../pages/ZPHomePage';
import { ZPCheckingVyberVouchery } from '../pages/ZPCheckingVyberVouchery';





test('Проверка выбора колическо и стоимости билетов', async ({ page }) => {
  const homePage = new ZPHomePage(page);
  const vyberVouchery = new ZPCheckingVyberVouchery(page);

  
  // Открываем главную страницу
  await homePage.goto();
  await homePage.acceptCookies();
  await homePage.lincVouchery();

  await vyberVouchery.checkingVybeVouchery();

});


