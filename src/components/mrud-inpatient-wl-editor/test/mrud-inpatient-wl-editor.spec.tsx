import { newSpecPage } from '@stencil/core/testing';
import { MrudInpatientWlEditor } from '../mrud-inpatient-wl-editor';

describe('mrud-inpatient-wl-editor', () => {
  it('buttons shall be of different type', async () => {
    const page = await newSpecPage({
      components: [MrudInpatientWlEditor],
      html: `<mrud-inpatient-wl-editor entry-id="@new"></mrud-inpatient-wl-editor>`,
    });
    let items: any = await page.root.shadowRoot.querySelectorAll("md-filled-button");
    expect(items.length).toEqual(1);
    items = await page.root.shadowRoot.querySelectorAll("md-outlined-button");
    expect(items.length).toEqual(1);

    items = await page.root.shadowRoot.querySelectorAll("md-filled-tonal-button");
    expect(items.length).toEqual(1);
  });
});