import { newSpecPage } from '@stencil/core/testing';
import { MrudInpatientWlList } from '../mrud-inpatient-wl-list';

describe('mrud-inpatient-wl-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MrudInpatientWlList],
      html: `<mrud-inpatient-wl-list></mrud-inpatient-wl-list>`,
    });
    expect(page.root).toEqualHtml(`
      <mrud-inpatient-wl-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mrud-inpatient-wl-list>
    `);
  });
});
