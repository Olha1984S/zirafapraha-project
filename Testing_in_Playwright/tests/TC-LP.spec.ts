import { test, expect } from '@playwright/test';
import { ZPHomePage } from '../pages/ZPHomePage';
import { ZPLanguageBar } from '../pages/ZPLanguageBar';
import { ZPAkcePage } from '../pages/ZPAkcePage';
import { ZPNarozeninyPage } from '../pages/ZPNarozeninyPage';
import { ZPKontaktPage } from '../pages/ZPKontaktPage';

const languages = [
  { code: 'cs', name: 'Česky', expected: 'ces' },
  { code: 'en', name: 'English', expected: 'eng' },
  { code: 'uk', name: 'Українська', expected: 'ukr' },
];

test('Проверка языкового переключателя сайта Žirafa Praha', async ({ page }) => {
  const homePage = new ZPHomePage(page);
  const languageBar = new ZPLanguageBar(page);
  const akcePage = new ZPAkcePage(page);
  const narozeninyPage = new ZPNarozeninyPage(page);
  const kontaktPage = new ZPKontaktPage(page);

  console.log('Проверка страницы "HomePage"');
  // Открываем главную страницу
  await homePage.goto();

  // Принимаем cookie
  await homePage.acceptCookies();

  // Проверяем видимость блока на домашней странице
  await homePage.checkHomePage();

  // Проверка языковой панели CZ
  await languageBar.checkingLanguageBarCZ();

  // Проверка языковой панели ENG
  await languageBar.checkingLanguageBarENG();

  // Проверка языковой панели UKR
  await languageBar.checkingLanguageBarUKR();
  
  console.log('Проверка страницы "Akce"');
  await akcePage.goto();
  await akcePage.checkAkcePage();
  await languageBar.checkingLanguageBarCZ();
  await languageBar.checkingLanguageBarENG();
  await languageBar.checkingLanguageBarUKR();
  
  console.log('Проверка страницы "Narozeniny"');
  await narozeninyPage.goto();
  await narozeninyPage.checkNarozeninyPage();
  await languageBar.checkingLanguageBarCZ();
  await languageBar.checkingLanguageBarENG();
  await languageBar.checkingLanguageBarUKR();

  console.log('Проверка страницы "Kontakt"');
  await kontaktPage.goto();
  await kontaktPage.checkKontaktPage();
  await languageBar.checkingLanguageBarCZ();
  await languageBar.checkingLanguageBarENG();
  await languageBar.checkingLanguageBarUKR();


});


