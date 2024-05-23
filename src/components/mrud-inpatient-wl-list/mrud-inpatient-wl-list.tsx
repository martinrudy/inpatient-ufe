import { Component, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';
import { InpatientWaitingListApiFactory, WaitingListEntry } from '../../api/inpatient-wl';

@Component({
  tag: 'mrud-inpatient-wl-list',
  styleUrl: 'mrud-inpatient-wl-list.css',
  shadow: true,
})
export class MrudInpatientWlList {
  @Event({ eventName: "entry-clicked"}) entryClicked: EventEmitter<string>;
  @Event({ eventName: "home-clicked"}) homeClicked: EventEmitter<string>;
  inpatientList: WaitingListEntry[];
  @Prop() apiBase: string;
  @Prop() ambulanceId: string;
  @State() errorMessage: string;

  private async getInpatientListAsync(): Promise<WaitingListEntry[]>{
    try {
      const response = await
        InpatientWaitingListApiFactory(undefined, this.apiBase).
          getWaitingListEntries(this.ambulanceId)

      console.log(this.ambulanceId)
      if (response.status < 299) {
        return response.data;
      } else {
        this.errorMessage = `Cannot retrieve list of inpatients for departement: ${response.statusText}`
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve list of inpatients for departement: ${err.message || "unknown"}`
    }
    return [];
  }
  async componentWillLoad() {
    this.inpatientList = await this.getInpatientListAsync();
  }
  render() {
    return (
      <Host>
        {this.errorMessage
          ? <div class="error">{this.errorMessage}</div>
          :
          <md-list>
            {this.inpatientList.map((inpatient) =>
              <md-list-item onClick={ () => this.entryClicked.emit(inpatient.id)}>
                <div slot="headline">{inpatient.room}</div>
                <div slot="supporting-text">{"Aloccated beds: " + inpatient.allocatedCapacity}</div>
                <div slot="supporting-text">{"Free beds: " + inpatient.freeCapacity}</div>
                <div slot="supporting-text">{"Beds needs to be prepare: " + inpatient.toPrepareCapacity}</div>
                  <md-icon slot="start">bedroom_child</md-icon>
              </md-list-item>
            )}
          </md-list>
        }
        <md-filled-icon-button class="add-button"
          onclick={() => this.entryClicked.emit("@new")}>
          <md-icon>add</md-icon>
        </md-filled-icon-button>
        <md-filled-icon-button class="home-button" onclick={() => this.homeClicked.emit("")}>
          <md-icon>home</md-icon>
        </md-filled-icon-button>
      </Host>
    );
  }
}
