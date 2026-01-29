import { devices, test } from '@playwright/test';
import { ZPVoucheryPage } from '../pages/ZPVoucheryPage';
import { ZPCheckingVyberVouchery } from '../pages/ZPCheckingVyberVouchery';


test.setTimeout(300000); 

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


test('Проверка выбора колическо и стоимости билетов', async ({ page }) => {
  const voucheryPage = new ZPVoucheryPage(page);
  const vyberVouchery = new ZPCheckingVyberVouchery(page);

  
  // Открываем главную страницу
  await voucheryPage.goto();
  await voucheryPage.acceptCookies();
  await voucheryPage.lincVouchery();

  await vyberVouchery.checkingVybeVouchery();

});


