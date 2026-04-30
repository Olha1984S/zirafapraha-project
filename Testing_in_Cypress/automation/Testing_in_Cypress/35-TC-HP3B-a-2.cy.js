/// <reference types="cypress" />

describe('Testing the slider on the website zirafapraha.cz', () => {

  beforeEach(() => {
    // We ignore uncaught exceptions on the page
    Cypress.on('uncaught:exception', (err, runnable) => {
      console.warn('We ignore the error on the page:', err.message);
      return false; // <-- It prevents the test from failing
    });
    // We open the website and decline cookies
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
    cy.visit('https://zirafapraha.cz/');
    cy.wait(2000);
    cy.get('#CybotCookiebotDialogBodyButtonDecline').click({ force: true });
  });

  it('☑️ Determining the number of cards in the slider', () => {
    cy.log('We check the block slider "Proč se k nám rodiče a děti rádi vrací?"');

    cy.get('.elementor-main-swiper .swiper-slide').then(($slides) => {
      const slideCount = $slides.length;
      cy.log('✔️ Number of cards: ' + slideCount);

      cy.get('.swiper-pagination-bullet').then(($bullets) => {
        const bulletCount = $bullets.length;
        cy.log('✔️ Number of pagination elements: ' + bulletCount);

        if (slideCount / 2 === bulletCount) {
          cy.log('✅ The number of cards corresponds to the number of pagination elements.');
        } else {
          cy.log('❌ The number of cards does not match the number of pagination elements.');
        }
      });
    });
  });
});




