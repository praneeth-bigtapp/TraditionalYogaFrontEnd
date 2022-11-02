import { Component } from '@angular/core';

@Component({
  selector: 'app-ad-hoc-bloomberg-request',
  templateUrl: './ad-hoc-bloomberg-request.component.html'
})
export class AdHocBloombergRequestComponent {
  inputSubModuleId: number;
  constructor() {
    this.inputSubModuleId = 12;
  }

}
