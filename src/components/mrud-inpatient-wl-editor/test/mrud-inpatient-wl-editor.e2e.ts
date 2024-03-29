import { newE2EPage } from '@stencil/core/testing';

describe('mrud-inpatient-wl-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<mrud-inpatient-wl-editor></mrud-inpatient-wl-editor>');

    const element = await page.find('mrud-inpatient-wl-editor');
    expect(element).toHaveClass('hydrated');
  });
});
