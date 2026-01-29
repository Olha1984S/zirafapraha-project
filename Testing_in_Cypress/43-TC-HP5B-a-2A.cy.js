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

  it('☑️ Определение количества слайдов и элементов пагинации', () => {
    cy.log('☑️ Проверяем slick-slider блока "Přes 90 atrakcí. Jaké jsou nejoblíbenější?"');

    // Проверяем, что слайдер существует
    cy.get('#uc_simple_slider_elementor_d3533d5').should('exist');

    cy.get('#uc_simple_slider_elementor_d3533d5 .ue_slide').then(($slides) => {
      const slideCount = $slides.length;
      cy.log('✔️ Количество карточек (включая клонированные): ' + slideCount);

      cy.get('#uc_simple_slider_elementor_d3533d5 .slick-dots li').then(($dots) => {
        const dotCount = $dots.length;
        cy.log('✔️ Количество элементов пагинации: ' + dotCount);

        if (slideCount >= dotCount) {
          cy.log('✅ Количество карточек равно количеству элементов пагинации или больше (включены клонированные слайды).');
        } else {
          cy.log('❌ Несоответствие количества карточек и пагинации.');
        }
      });
    });
  });
});





