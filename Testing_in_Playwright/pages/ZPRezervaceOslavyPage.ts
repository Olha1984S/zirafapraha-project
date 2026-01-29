import { Page, expect } from '@playwright/test';

export class ZPRezervaceOslavyPage {
  constructor(private page: Page) {}

  /** Открыть страницу "Vstupenky" */
  async lincRezervaceOslavy() {
    await this.page.goto('https://zirafapraha.cz/narozeninovy-formular/'); 
    const heading = this.page.locator('h1.elementor-heading-title.elementor-size-default');
    await expect(heading).toHaveText('Nezávazná rezervace narozeninové oslavy');
    console.log('✅ Заголовок "Nezávazná rezervace narozeninové oslavy"');
  }
}
