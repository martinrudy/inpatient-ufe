import { newE2EPage } from '@stencil/core/testing';

describe('mrud-inpatient-wl-app', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<mrud-inpatient-wl-app></mrud-inpatient-wl-app>');

    const element = await page.find('mrud-inpatient-wl-app');
    expect(element).toHaveClass('hydrated');
  });
});
