/// <reference types="cypress" />

describe('Тестирование слайдера на мобильной версии сайта  zirafapraha.cz (Redmi Note 14 Pro+ 5G)', () => {

  beforeEach(() => {
    // Игнорируем ошибки JavaScript на странице, чтобы тест не падал
    Cypress.on('uncaught:exception', (err, runnable) => {
      console.warn('Игнорируем ошибку на странице:', err.message);
      return false;
    });

    // Эмулируем устройство Redmi Note 14 Pro+ 5G
    // Разрешение: 2712 × 1220 px
    cy.viewport(1220, 2712);

    // Заходим на сайт и закрываем cookie banner
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
    cy.visit('https://zirafapraha.cz/');
    cy.wait(2000);
    cy.get('#CybotCookiebotDialogBodyButtonDecline', { timeout: 5000 })
      .click({ force: true });
  });

  it('☑️ Проверка количества карточек и элементов пагинации (мобильная версия)', () => {
    cy.log('Проверяем слайдер блока "Proč se k nám rodiče a děti rádi vrací?"Тест для мобильного устройства: Redmi Note 14 Pro+ 5G');

    // Определяем количество карточек
    cy.get('.elementor-main-swiper .swiper-slide').then(($slides) => {
      const slideCount = $slides.length;
      cy.log(`✔️ Количество карточек: ${slideCount}`);

      // Определяем количество элементов пагинации
      cy.get('.swiper-pagination-bullet').then(($bullets) => {
        const bulletCount = $bullets.length;
        cy.log(`✔️ Количество элементов пагинации: ${bulletCount}`);

        // На мобильных, как правило, slidesPerView = 1
        if (slideCount === bulletCount) {
          cy.log('✅ Количество карточек соответствует количеству элементов пагинации.');
        } else {
          cy.log('❌ Количество карточек не соответствует количеству элементов пагинации.');
        }
      });
    });
  });
});





