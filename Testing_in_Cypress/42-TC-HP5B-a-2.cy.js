/// <reference types="cypress" />

describe('Тестирование слайдера на сайте zirafapraha.cz', () => {

  beforeEach(() => {
    // Игнорируем возможные ошибки на странице
    Cypress.on('uncaught:exception', (err, runnable) => {
      console.warn('Игнорируем ошибку на странице:', err.message);
      return false;
    });

    // Переход на сайт и отказ от cookie
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
    cy.visit('https://zirafapraha.cz/');
    cy.wait(3000);
    cy.get('#CybotCookiebotDialogBodyButtonDecline', { timeout: 10000 }).click({ force: true });
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





