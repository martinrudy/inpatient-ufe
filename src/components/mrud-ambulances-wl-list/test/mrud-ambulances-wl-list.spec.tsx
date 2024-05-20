import { newSpecPage } from '@stencil/core/testing';
import { MrudAmbulancesWlList } from '../mrud-ambulances-wl-list';

describe('mrud-ambulances-wl-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MrudAmbulancesWlList],
      html: `<mrud-ambulances-wl-list></mrud-ambulances-wl-list>`,
    });
    expect(page.root).toEqualHtml(`
      <mrud-ambulances-wl-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mrud-ambulances-wl-list>
    `);
  });
});
