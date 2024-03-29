import { newSpecPage } from '@stencil/core/testing';
import { MrudInpatientWlList } from '../mrud-inpatient-wl-list';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { WaitingListEntry } from '../../../api/inpatient-wl';

describe('mrud-inpatient-wl-list', () => {
  const sampleEntries: WaitingListEntry[] = [
    {
      id: "entry-1",
      patientId: "p-1",
      room: "a123b",
      capacity: 15,
      allocatedCapacity: 10,

    }, {
      id: "entry-2",
      patientId: "p-2",
      room: "a123c",
      capacity: 10,
      allocatedCapacity: 5,
    }];

  let mock: MockAdapter;

  beforeAll(() => { mock = new MockAdapter(axios); });
  afterEach(() => { mock.reset(); });
  it('renders sample entries', async () => {
    mock.onGet().reply(200, sampleEntries);

    const page = await newSpecPage({
      components: [MrudInpatientWlList],
      html: `<mrud-inpatient-wl-list ambulance-id="test-ambulance" api-base="http://test/api"></mrud-inpatient-wl-list>`,
    });
    const wlList = page.rootInstance as MrudInpatientWlList;
    const expectedInpatient = wlList?.inpatientList?.length

    const items = page.root.shadowRoot.querySelectorAll("md-list-item");

    expect(expectedInpatient).toEqual(sampleEntries.length);
    expect(items.length).toEqual(expectedInpatient);
  });
  it('renders error message on network issues', async () => {
    mock.onGet().networkError();
    const page = await newSpecPage({
      components: [MrudInpatientWlList],  //
      html: `<mrud-inpatient-wl-list ambulance-id="test-ambulance" api-base="http://test/api"></mrud-inpatient-wl-list>`,  //
    });

    const wlList = page.rootInstance as MrudInpatientWlList; //
    const expectedPatients = wlList?.inpatientList?.length

    const errorMessage =  page.root.shadowRoot.querySelectorAll(".error");
    const items = page.root.shadowRoot.querySelectorAll("md-list-item");

    expect(errorMessage.length).toBeGreaterThanOrEqual(1)
    expect(expectedPatients).toEqual(0);
    expect(items.length).toEqual(expectedPatients);
  });
});
