import { newE2EPage } from '@stencil/core/testing';

describe('mrud-ambulances-wl-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<mrud-ambulances-wl-list></mrud-ambulances-wl-list>');

    const element = await page.find('mrud-ambulances-wl-list');
    expect(element).toHaveClass('hydrated');
  });
});
