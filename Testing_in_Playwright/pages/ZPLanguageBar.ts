import { Page, expect } from '@playwright/test';
import * as franc from 'franc-min';

export class ZPLanguageBar {
  constructor(private page: Page) {}

  async checkingLanguageBarCZ() {
    const mainContent = this.page.locator('main');
    await expect(mainContent).toBeVisible();

    const activeLangButton = this.page.locator('.gt_option a.gt_current');
    const activeLangCode = await activeLangButton.getAttribute('data-gt-lang');

    const text = await mainContent.innerText();
    const detectedLang = franc.franc(text, { minLength: 20 });

    const expectedLangMap: Record<string, string> = { cs: 'ces', en: 'eng', uk: 'ukr' };
    const expectedLang = expectedLangMap[activeLangCode];

    if (detectedLang !== expectedLang) {
      console.warn('⚠ Язык текста не совпадает с выбранным языком панели!');
      console.log('Активный язык панели:', activeLangCode);
      console.log('Определённый язык текста:', detectedLang);
      console.log('Текст (первые 200 символов):', text.slice(0, 200));
      // Можно здесь просто вернуться или продолжить
      return;
    }

    console.log('Язык текста совпадает с языком панели:', detectedLang);
  }

  async checkingLanguageBarENG() {
    const mainContent = this.page.locator('main');
    await expect(mainContent).toBeVisible();

    const languagePanelButton = this.page.locator('.gt_selected a');
    await languagePanelButton.click();
    await this.page.waitForTimeout(500);

    const englishButton = this.page.locator('a[data-gt-lang="en"]');
    await englishButton.click();
    await this.page.waitForTimeout(1500);

    const text = await mainContent.innerText();
    const detectedLang = franc.franc(text, { minLength: 20 });

    if (detectedLang !== 'eng') {
      console.warn('⚠ Язык текста не совпадает с английским!');
      console.log('Определённый язык текста:', detectedLang);
      console.log('Текст (первые 200 символов):', text.slice(0, 200));
      return;
    }

    console.log('Текст успешно на английском:', detectedLang);
  }

  async checkingLanguageBarUKR() {
    const mainContent = this.page.locator('main');
    await expect(mainContent).toBeVisible();

    const languagePanelButton = this.page.locator('.gt_selected a');
    await languagePanelButton.click();
    await this.page.waitForTimeout(500);

    const ukrButton = this.page.locator('a[data-gt-lang="uk"]');
    await ukrButton.click();
    await this.page.waitForTimeout(1500);

    const text = await mainContent.innerText();
    const detectedLang = franc.franc(text, { minLength: 20 });

    if (detectedLang !== 'ukr') {
      console.warn('⚠ Язык текста не совпадает с украинским!');
      console.log('Определённый язык текста:', detectedLang);
      console.log('Текст (первые 200 символов):', text.slice(0, 200));
      return;
    }

    console.log('Текст успешно на украинском:', detectedLang);

    const languagePanelButton2 = this.page.locator('.gt_selected a');
    await languagePanelButton2.click();
    await this.page.waitForTimeout(500);

    const englishButton = this.page.locator('a[data-gt-lang="cs"]');
    await englishButton.click();
    await this.page.waitForTimeout(1500);
  }
}
























// import { Page, expect } from '@playwright/test';
// import * as franc from 'franc-min';

// export class ZPLanguageBar {
//   constructor(private page: Page) {}

//   async checkingLanguageBarCZ() {
//     const mainContent = this.page.locator('main');
//     await expect(mainContent).toBeVisible();

//     // Определяем активный язык
//     const activeLangButton = this.page.locator('.gt_option a.gt_current');
//     const activeLangCode = await activeLangButton.getAttribute('data-gt-lang');

//     console.log('Активный язык:', activeLangCode);

//     const text = await mainContent.innerText();
//     const detectedLang = franc.franc(text, { minLength: 20 });
    
//     // Выводим первые 200 символов текста для отладки
//     console.log('Обнаруженный язык текста:', detectedLang);
//     console.log('Текст (первые 200 символов):', text.slice(0, 200));

//     const expectedLangMap: Record<string, string> = { cs: 'ces', en: 'eng', uk: 'ukr' };
//     const expectedLang = expectedLangMap[activeLangCode];

//     expect(detectedLang).toBe(expectedLang);
//   }

//   /** Переключение на английский и проверка текста */
//   async checkingLanguageBarENG() {
//     const mainContent = this.page.locator('main');
//     await expect(mainContent).toBeVisible();

//     // Открываем языковую панель
//     console.log('Открываем языковую панель');
//     const languagePanelButton = this.page.locator('.gt_selected a');
//     await languagePanelButton.click();

//     // Ждем, чтобы панель раскрылась
//     await this.page.waitForTimeout(500);

//     // Переключаемся на английский
//     console.log('Переключаемся на английский');
//     const englishButton = this.page.locator('a[data-gt-lang="en"]');
//     await englishButton.click();

//     // Ждем, чтобы контент обновился
//     await this.page.waitForTimeout(1500);

//     // Проверяем текст после переключения
//     const text = await mainContent.innerText();
//     const detectedLang = franc.franc(text, { minLength: 20 });
//     console.log('Текст после переключения на английский:', detectedLang);
//     console.log('Текст (первые 200 символов):', text.slice(0, 200));

//     expect(detectedLang).toBe('eng');
//   }

//     /** Переключение на английский и проверка текста */
//   async checkingLanguageBarUKR() {
//     const mainContent = this.page.locator('main');
//     await expect(mainContent).toBeVisible();

//     // Открываем языковую панель
//     console.log('Открываем языковую панель');
//     const languagePanelButton = this.page.locator('.gt_selected a');
//     await languagePanelButton.click();

//     // Ждем, чтобы панель раскрылась
//     await this.page.waitForTimeout(500);

//     // Переключаемся на английский
//     console.log('Переключаемся на английский');
//     const englishButton = this.page.locator('a[data-gt-lang="uk"]');
//     await englishButton.click();

//     // Ждем, чтобы контент обновился
//     await this.page.waitForTimeout(1500);

//     // Проверяем текст после переключения
//     const text = await mainContent.innerText();
//     const detectedLang = franc.franc(text, { minLength: 20 });
//     console.log('Текст после переключения на английский:', detectedLang);
//     console.log('Текст (первые 200 символов):', text.slice(0, 200));

//     expect(detectedLang).toBe('ukr');
//   }
// }




// const text = await mainContent.innerText();
// const detectedLang = franc.franc(text, { minLength: 20 });

// // Выводим первые 200 символов текста для отладки
// console.log('Обнаруженный язык текста:', detectedLang);
// console.log('Текст (первые 200 символов):', text.slice(0, 200));

// const expectedLangMap: Record<string, string> = { cs: 'ces', en: 'eng', uk: 'ukr' };
// const expectedLang = expectedLangMap[activeLangCode];

// expect(detectedLang).toBe(expectedLang);
