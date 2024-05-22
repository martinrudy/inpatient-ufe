import { Component, Host, Prop, State, h, EventEmitter, Event } from '@stencil/core';
import { InpatientWaitingListApiFactory, WaitingListEntry } from '../../api/inpatient-wl';

@Component({
  tag: 'mrud-inpatient-wl-editor',
  styleUrl: 'mrud-inpatient-wl-editor.css',
  shadow: true,
})
export class MrudInpatientWlEditor {

  @Prop() entryId: string;
  @Prop() ambulanceId: string;
  @Prop() apiBase: string;

  @Event({eventName: "editor-closed"}) editorClosed: EventEmitter<string>;

  @State() private duration = 15
  @State() entry: WaitingListEntry;
  @State() errorMessage:string;
  @State() isValid: boolean;

  private formElement: HTMLFormElement;

  private async getWaitingEntryAsync(): Promise<WaitingListEntry> {
    if(this.entryId === "@new") {
      this.isValid = false;
      this.entry = {
        id: "@new",
        patientId: "",
        room: "",
        capacity: 15,
        allocatedCapacity: 10,
        freeCapacity: 5,
        toPrepareCapacity: 1
      };
      return this.entry;
    }
    if ( !this.entryId ) {
       this.isValid = false;
       return undefined
    }
    try {
       const response
           = await InpatientWaitingListApiFactory(undefined, this.apiBase)
             .getWaitingListEntry(this.ambulanceId, this.entryId)

       if (response.status < 299) {
          this.entry = response.data;
          this.isValid = true;
       } else {
          this.errorMessage = `Cannot retrieve list of waiting patients: ${response.statusText}`
       }
    } catch (err: any) {
       this.errorMessage = `Cannot retrieve list of waiting patients: ${err.message || "unknown"}`
    }
    return undefined;
  }
  async componentWillLoad() {
    this.getWaitingEntryAsync();
  }
  private handleSliderInput(event: Event) {
    this.duration = +(event.target as HTMLInputElement).value;
  }
  render() {
    if(this.errorMessage) {
      return (
      <Host>
         <div class="error">{this.errorMessage}</div>
      </Host>
      )
    }
    return (
      <Host>
        <form ref={el => this.formElement = el}>
          <md-filled-text-field label="Miestnost lozkovej casti"
            oninput={ (ev: InputEvent) => {
               if(this.entry) {this.entry.room = this.handleInputEvent(ev)}
            } }>
            <md-icon slot="leading-icon">king_bed</md-icon>
          </md-filled-text-field>
          <md-filled-text-field label="Registračné izby" r
          equired value={this.entry?.patientId}
          oninput={ (ev: InputEvent) => {
              if(this.entry) {this.entry.patientId = this.handleInputEvent(ev)}
          } }>
          <md-icon slot="leading-icon">fingerprint</md-icon>
          </md-filled-text-field>
        </form>
          
        <div class="duration-slider">
          <span class="label">Predpokladana kapacita:&nbsp; </span>
          <span class="label">{this.duration}</span>
          <span class="label">&nbsp;beds</span>
          <md-slider
            mmin="2" max="45" value={this.entry?.capacity || 15} ticks labeled
            oninput={ (ev:InputEvent) => {
              if(this.entry) {
               this.entry.capacity
                  = Number.parseInt(this.handleInputEvent(ev))};
              this.handleSliderInput(ev)
            } }></md-slider>
        </div>
        <div class="duration-slider">
          <span class="label">Predpokladana alokovana kapacita:&nbsp; </span>
          <span class="label">{this.duration}</span>
          <span class="label">&nbsp;beds</span>
          <md-slider
            mmin="2" max="45" value={this.entry?.allocatedCapacity || 15} ticks labeled
            oninput={ (ev:InputEvent) => {
              if(this.entry) {
               this.entry.allocatedCapacity
                  = Number.parseInt(this.handleInputEvent(ev))};
              this.handleSliderInput(ev)
            } }></md-slider>
        </div>
        <div class="duration-slider">
          <span class="label">Predpokladana volna kapacita:&nbsp; </span>
          <span class="label">{this.duration}</span>
          <span class="label">&nbsp;beds</span>
          <md-slider
            mmin="2" max="45" value={this.entry?.freeCapacity || 15} ticks labeled
            oninput={ (ev:InputEvent) => {
              if(this.entry) {
               this.entry.freeCapacity
                  = Number.parseInt(this.handleInputEvent(ev))};
              this.handleSliderInput(ev)
            } }></md-slider>
        </div>
        <div class="duration-slider">
          <span class="label">Predpokladana kapacita pre upratanie:&nbsp; </span>
          <span class="label">{this.duration}</span>
          <span class="label">&nbsp;beds</span>
          <md-slider
            mmin="2" max="45" value={this.entry?.toPrepareCapacity || 15} ticks labeled
            oninput={ (ev:InputEvent) => {
              if(this.entry) {
               this.entry.toPrepareCapacity
                  = Number.parseInt(this.handleInputEvent(ev))};
              this.handleSliderInput(ev)
            } }></md-slider>
        </div>

        <md-divider></md-divider>
        <div class="actions">
          <md-filled-tonal-button disabled={!this.entry || this.entry?.id === "@new" }
            onClick={() => this.deleteEntry()} >
            <md-icon slot="icon">delete</md-icon>
            Zmazať
          </md-filled-tonal-button>
          <span class="stretch-fill"></span>
          <md-outlined-button id="cancel"
            onClick={() => this.editorClosed.emit("cancel")}>
            Zrušiť
          </md-outlined-button>
          <md-filled-button id="confirm" disabled={ !this.isValid }
            onClick={() => this.updateEntry() }>
            <md-icon slot="icon">save</md-icon>
            Uložiť
          </md-filled-button>
        </div>
      </Host>
    );
  }
  private handleInputEvent( ev: InputEvent): string {
    const target = ev.target as HTMLInputElement;
    // check validity of elements
    this.isValid = true;
    for (let i = 0; i < this.formElement.children.length; i++) {
       const element = this.formElement.children[i]
       if ("reportValidity" in element) {
       const valid = (element as HTMLInputElement).reportValidity();
       this.isValid &&= valid;
       }
    }
    return target.value
  }
  private async updateEntry() {
    try {
        console.log(this.entry)
        const api = InpatientWaitingListApiFactory(undefined, this.apiBase);
        const response
          = this.entryId === "@new"
          ? await api.createWaitingListEntry(this.ambulanceId, this.entry)
          : await api.updateWaitingListEntry(this.ambulanceId, this.entryId, this.entry);
        if (response.status < 299) {
          this.editorClosed.emit("store")
        } else {
          this.errorMessage = `Cannot store entry: ${response.statusText}`
        }
      } catch (err: any) {
        this.errorMessage = `Cannot store entry: ${err.message || "unknown"}`
      }
  }
  private async deleteEntry() {
    try {
       const response = await InpatientWaitingListApiFactory(undefined, this.apiBase)
          .deleteWaitingListEntry(this.ambulanceId, this.entryId)
       if (response.status < 299) {
       this.editorClosed.emit("delete")
       } else {
       this.errorMessage = `Cannot delete entry: ${response.statusText}`
       }
    } catch (err: any) {
       this.errorMessage = `Cannot delete entry: ${err.message || "unknown"}`
    }
 }
}
