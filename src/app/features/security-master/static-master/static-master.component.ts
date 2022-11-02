import { Component } from '@angular/core';

@Component({
  selector: 'app-static-master',
  templateUrl: './static-master.component.html'
})
export class StaticMasterComponent {
  inputSubModuleId: number;
  constructor() {
    this.inputSubModuleId = 10;
  }
}
