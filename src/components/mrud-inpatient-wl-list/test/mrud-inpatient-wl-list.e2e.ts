import { newE2EPage } from '@stencil/core/testing';

describe('mrud-inpatient-wl-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<mrud-inpatient-wl-list></mrud-inpatient-wl-list>');

    const element = await page.find('mrud-inpatient-wl-list');
    expect(element).toHaveClass('hydrated');
  });
});
