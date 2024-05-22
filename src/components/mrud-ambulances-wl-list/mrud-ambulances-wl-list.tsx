import { Component, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';
import { AmbulancesApiFactory, Ambulance } from '../../api/inpatient-wl';

@Component({
  tag: 'mrud-ambulances-wl-list',
  styleUrl: 'mrud-ambulances-wl-list.css',
  shadow: true,
})
export class MrudAmbulancesWlList {
  @Event({ eventName: "entry-clicked"}) entryClicked: EventEmitter<string>;
  ambulances: Ambulance[];
  @State() selectedValues: string[] = [];
  @State() errorMessage: string;
  @Prop() apiBase: string;

  handleDropdownChange(event, index) {
    const newSelectedValues = [...this.selectedValues];
    newSelectedValues[index] = event.target.value;
    this.selectedValues = newSelectedValues;
  }

  handleSubmit() {
    console.log('Selected Values:', this.selectedValues);
    // Implement your submit logic here
  }

  private async getAmbulancesAsync(): Promise<Ambulance[]>{
    try {
      const response = await
        AmbulancesApiFactory(undefined, this.apiBase).
          getAmbulances()

      if (response.status < 299) {
        return response.data;
      } else {
        this.errorMessage = `Cannot retrieve list of waiting patients: ${response.statusText}`
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve list of waiting patients: ${err.message || "unknown"}`
    }
    return [];
  }

  async componentWillLoad() {
    this.ambulances = await this.getAmbulancesAsync();
  }

  render() {
    return (
      <Host>
        {
          <md-list>
            {this.ambulances.map((ambulance) =>
              <md-list-item onClick={ () => this.entryClicked.emit(ambulance.id)}>
                <div slot="supporting-text">{ambulance.name}</div>
                  <md-icon slot="start">home</md-icon>
              </md-list-item>
            )}
          </md-list>
        }
      </Host>
    );
  }

}
