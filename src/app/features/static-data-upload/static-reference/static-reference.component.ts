import { Component } from '@angular/core';

@Component({
  selector: 'app-static-reference',
  templateUrl: './static-reference.component.html'
})
export class StaticReferenceComponent {
  inputSubModuleId: number;
  constructor() {
    this.inputSubModuleId = 7;
  }
}
