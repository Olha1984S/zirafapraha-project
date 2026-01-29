import { test } from '@playwright/test';
import { ZPAtrakcePage } from '../pages/ZPAtrakcePage';
import { ZPDeterminingNumberCards } from '../pages/ZPDeterminingNumberCards';

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


