import { newSpecPage } from '@stencil/core/testing';
import { MrudInpatientWlApp } from '../mrud-inpatient-wl-app';

describe('<pfx>-inpatient-wl-app', () => {

  it('renders editor', async () => {
    const page = await newSpecPage({
      url: `http://localhost/entry/@new`,
      components: [MrudInpatientWlApp],
      html: `<mrud-inpatient-wl-app base-path="/"></mrud-inpatient-wl-app>`,
    });
    page.win.navigation = new EventTarget()
    const child = await page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual ("mrud-inpatient-wl-editor");

  });

  it('renders list', async () => {
    const page = await newSpecPage({
      url: `http://localhost/inpatient-wl/`,
      components: [MrudInpatientWlApp],
      html: `<mrud-inpatient-wl-app base-path="/inpatient-wl/"></mrud-inpatient-wl-app>`,
    });
    page.win.navigation = new EventTarget()
    const child = await page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual("mrud-ambulances-wl-list");
  });
});