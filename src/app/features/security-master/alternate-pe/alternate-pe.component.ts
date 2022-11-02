import { Component } from '@angular/core';

@Component({
  selector: 'app-alternate-pe',
  templateUrl: './alternate-pe.component.html'
})
export class AlternatePEComponent {
  inputSubModuleId: number;
  constructor() {
    this.inputSubModuleId = 13;
  }
}
