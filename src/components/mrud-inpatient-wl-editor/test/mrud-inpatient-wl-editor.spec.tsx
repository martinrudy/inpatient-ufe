import { newSpecPage } from '@stencil/core/testing';
import { MrudInpatientWlEditor } from '../mrud-inpatient-wl-editor';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { WaitingListEntry } from '../../../api/inpatient-wl';

describe('mrud-inpatient-wl-editor', () => {
  const sampleEntry: WaitingListEntry = {
      id: "entry-1",
      patientId: "p-1",
      room: "a123b",
      capacity: 15,
      allocatedCapacity: 10,
      freeCapacity: 5,
      toPrepareCapacity: 0
  };


  let delay = async (miliseconds: number) => await new Promise<void>(resolve => {
        setTimeout(() => resolve(), miliseconds);
  })

  let mock: MockAdapter;

  beforeAll(() => { mock = new MockAdapter(axios); });
  afterEach(() => { mock.reset(); });
  it('buttons shall be of different type', async () => {
    mock.onGet(/^.*\/entries\/.+/).reply(200, sampleEntry);
    const page = await newSpecPage({
      components: [MrudInpatientWlEditor],
      html: `<mrud-inpatient-wl-editor entry-id="test-entry"
          ambulance-id="test-ambulance" api-base="http://sample.test/api"></mrud-inpatient-wl-editor>`,
    });
    await delay(300);
    await page.waitForChanges();
    let items: any = await page.root.shadowRoot.querySelectorAll("md-filled-button");
    expect(items.length).toEqual(1);
    items = await page.root.shadowRoot.querySelectorAll("md-outlined-button");
    expect(items.length).toEqual(1);

    items = await page.root.shadowRoot.querySelectorAll("md-filled-tonal-button");
    expect(items.length).toEqual(1);
  });
});