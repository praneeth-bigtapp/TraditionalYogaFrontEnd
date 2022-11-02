import { Component } from '@angular/core';

@Component({
  selector: 'app-asset-mix-report',
  templateUrl: './asset-mix-report.component.html'
})
export class AssetMixReportComponent {
  inputSubModuleId: number;
  constructor() {
    this.inputSubModuleId = 16;
  }
}
