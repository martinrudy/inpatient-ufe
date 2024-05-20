import { Component, Event, EventEmitter, Host, State, h } from '@stencil/core';

@Component({
  tag: 'mrud-ambulances-wl-list',
  styleUrl: 'mrud-ambulances-wl-list.css',
  shadow: true,
})
export class MrudAmbulancesWlList {
  @Event({ eventName: "entry-clicked"}) entryClicked: EventEmitter<string>;
  @State() ambulances: string[] = ['option1', 'option2', 'option3'];
  @State() selectedValues: string[] = [];

  handleDropdownChange(event, index) {
    const newSelectedValues = [...this.selectedValues];
    newSelectedValues[index] = event.target.value;
    this.selectedValues = newSelectedValues;
  }

  handleSubmit() {
    console.log('Selected Values:', this.selectedValues);
    // Implement your submit logic here
  }

  render() {
    return (
      <Host>
        {
          <md-list>
            {this.ambulances.map((ambulance) =>
              <md-list-item onClick={ () => this.entryClicked.emit(ambulance)}>
                <div slot="supporting-text">{ambulance}</div>
                  <md-icon slot="start">person</md-icon>
              </md-list-item>
            )}
          </md-list>
        }
      </Host>
    );
  }

}
