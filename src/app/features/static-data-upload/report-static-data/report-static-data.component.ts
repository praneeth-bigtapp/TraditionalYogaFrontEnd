import { Component } from '@angular/core';

@Component({
  selector: 'app-report-static-data',
  templateUrl: './report-static-data.component.html'
})
export class ReportStaticDataComponent {
  inputSubModuleId: number;
  constructor() {
    this.inputSubModuleId = 8;
  }
}
