import { newSpecPage } from '@stencil/core/testing';
import { MrudInpatientWlList } from '../mrud-inpatient-wl-list';

describe('mrud-inpatient-wl-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MrudInpatientWlList],
      html: `<mrud-inpatient-wl-list></mrud-inpatient-wl-list>`,
    });
    const wlList = page.rootInstance as MrudInpatientWlList;
    const expectedInpatient = wlList?.inpatientList?.length

    const items = page.root.shadowRoot.querySelectorAll("md-list-item");
    expect(items.length).toEqual(expectedInpatient);
  });
});
