/// <reference types="cypress" />

describe('Проверка фильтрации карточек на странице Atrakce', () => {

  beforeEach(() => {
    // Игнорируем возможные ошибки на странице
    Cypress.on('uncaught:exception', (err, runnable) => {
      console.warn('Игнорируем ошибку на странице:', err.message);
      return false;
    });

    // Переход на сайт и отказ от cookie
    cy.visit('https://zirafapraha.cz/');
    cy.wait(3000);
    cy.get('#CybotCookiebotDialogBodyButtonDecline', { timeout: 10000 })
      .click({ force: true });

    // Переход на страницу "Atrakce"
    cy.visit('https://zirafapraha.cz/atrakce/');
    cy.url().should('include', '/atrakce');
    cy.get('search.e-filter').should('exist');

    // Проверяем, что перешли на нужную страницу
    cy.url().should('include', '/atrakce');
    cy.get('search.e-filter').should('exist');
  });

  it('Проверка фильтров аттракционов и количества карточек', () => {

    // Проверяем, что кнопка "Vše" активна
    cy.get('button.e-filter-item[data-filter="__all"]')
      .should('have.attr', 'aria-pressed', 'true');

    // Функция для подсчета карточек
    const countCards = () => 
      cy.get('.elementor-loop-container .e-loop-item:visible').its('length');

    countCards().then((allCount) => {
      cy.log(`☑️ Количество карточек для "Vše": ${allCount}`);

      cy.get('button.e-filter-item[data-filter="pro-nejmensi"]').click({ force: true });
      cy.wait(1500);
      countCards().then((count1) => {
        cy.log(`☑️ Количество карточек для "Pro nejmenší": ${count1}`);

        cy.get('button.e-filter-item[data-filter="sportovni"]').click({ force: true });
        cy.wait(1500);
        countCards().then((count2) => {
          cy.log(`☑️ Количество карточек для "Sportovní": ${count2}`);

          cy.get('button.e-filter-item[data-filter="zazitkove"]').click({ force: true });
          cy.wait(1500);
          countCards().then((count3) => {
            cy.log(`☑️ Количество карточек для "Zážitkové": ${count3}`);          

            const totalFiltered = count1 + count2 + count3;
            cy.log(`☑️ Общее количество карточек: ${totalFiltered}`);
 
            if (allCount > totalFiltered) {
              cy.log(`✅ Количество карточек во вкладке "Vše" (${allCount}) больше количества карточек в остальных вкладках (${totalFiltered})`);
            } if (allCount === totalFiltered) {
              cy.log(`✅ Количество карточек во вкладке "Vše" (${allCount}) совпадает с количеством карточек в остальных вкладках (${totalFiltered})`);
            } else {
              cy.log(`⚠️ Количество карточек во вкладке "Vše" (${allCount}) не совпадает с общим количеством карточек в остальных вкладках (${totalFiltered})`);
            }
          });
        });
      });
    });
  });
});






