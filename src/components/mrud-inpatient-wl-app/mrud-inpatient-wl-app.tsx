import { Component, Host, Prop, State, h } from '@stencil/core';

declare global {
  interface Window { navigation: any; }
}

@Component({
  tag: 'mrud-inpatient-wl-app',
  styleUrl: 'mrud-inpatient-wl-app.css',
  shadow: true,
})
export class MrudInpatientWlApp {
  @State() private relativePath = "";
  @Prop() basePath: string="";
  @Prop() apiBase: string;
  @Prop() ambulanceId: string="";
  

  componentWillLoad() {
    const baseUri = new URL(this.basePath, document.baseURI || "/").pathname;

    const toRelative = (path: string) => {
      if (path.startsWith( baseUri)) {
        this.relativePath = path.slice(baseUri.length)
      } else {
        this.relativePath = ""
      }
    }

    window.navigation?.addEventListener("navigate", (ev: Event) => {
      if ((ev as any).canIntercept) { (ev as any).intercept(); }
      let path = new URL((ev as any).destination.url).pathname;
      toRelative(path);
    });

    toRelative(location.pathname)
  }
  render() {
    let element = "list"
    let entryId = "@new"
  
    if ( this.relativePath.startsWith("entry/"))
    {
      element = "editor";
      entryId = this.relativePath.split("/")[1]
    }
  
    const navigate = (path:string) => {
      const absolute = new URL(path, new URL(this.basePath, document.baseURI)).pathname;
      window.navigation.navigate(absolute)
    }

    const setAmbulanceId = (path:string, ambulanceId) => {
      this.ambulanceId = ambulanceId;
      navigate(path);
    }
  
    return (
      <Host>
        { element === "editor"
        ? <mrud-inpatient-wl-editor entry-id={entryId}
            ambulance-id={this.ambulanceId} api-base={this.apiBase}
            oneditor-closed={ () => navigate("./list")} >
          </mrud-inpatient-wl-editor>
        : this.ambulanceId === ""
        ? <mrud-ambulances-wl-list api-base={this.apiBase}
            onEntry-clicked={(ev: CustomEvent<string>)=> setAmbulanceId("./list", ev.detail)}>
          </mrud-ambulances-wl-list>
        : <mrud-inpatient-wl-list ambulance-id={this.ambulanceId} api-base={this.apiBase}
              onentry-clicked={ (ev: CustomEvent<string>)=> navigate("./entry/" + ev.detail) } 
              onHome-clicked={ (ev: CustomEvent<string>)=> setAmbulanceId("", ev.detail) } >
          </mrud-inpatient-wl-list>
        }
      </Host>
    );
  }

}
