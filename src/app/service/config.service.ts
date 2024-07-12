import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private hidden = new BehaviorSubject<boolean>(true);
  configHidden = this.hidden.asObservable();
  private selectedButtonId: number = 0;

  constructor() { }

  toggleConfigHidden() {
    this.hidden.next(!this.hidden.value);
  }

  changeButtonId(buttonId: number) {
    this.selectedButtonId = buttonId;
  }

  setAction(action: string) {
    console.log('Action: ' + action + ' Button ID: ' + this.selectedButtonId);
    // chiamata a backend per settare questa azione al button selezionato
  }

}
