import { Component, Host, h } from '@stencil/core';
import '@material/web/list/list'
import '@material/web/list/list-item'
import '@material/web/icon/icon'

@Component({
  tag: 'mrud-inpatient-wl-list',
  styleUrl: 'mrud-inpatient-wl-list.css',
  shadow: true,
})
export class MrudInpatientWlList {

  inpatientList: any[];

  private async getInpatientListAsync(){
    return await Promise.resolve(
      [{
          room: 'A213',
          departementID: '10001',
          capacity: 4,
          allocatedCapacity: 2,
          freeCapacity: 2,
          toPrepareCapacity: 0
      }, {
          room: 'A315',
          departementID: '10001',
          capacity: 10,
          allocatedCapacity: 6,
          freeCapacity: 4,
          toPrepareCapacity: 0
      }, {
          room: 'A313',
          departementID: '10001',
          capacity: 2,
          allocatedCapacity: 2,
          freeCapacity: 0,
          toPrepareCapacity: 0
      }]
    );
  }
  async componentWillLoad() {
    this.inpatientList = await this.getInpatientListAsync();
  }
  render() {
    return (
      <Host>
        <md-list>
          {this.inpatientList.map(inpatient =>
            <md-list-item>
              <div slot="headline">{inpatient.room}</div>
              <div slot="supporting-text">{"Aloccated beds: " + inpatient.allocatedCapacity}</div>
              <div slot="supporting-text">{"Free beds: " + inpatient.freeCapacity}</div>
              <div slot="supporting-text">{"Beds needs to be prepare: " + inpatient.toPrepareCapacity}</div>
                <md-icon slot="start">person</md-icon>
            </md-list-item>
          )}
        </md-list>
      </Host>
    );
  }
  private isoDateToLocale(iso:string) {
    if(!iso) return '';
    return new Date(Date.parse(iso)).toLocaleTimeString()
  }
}
