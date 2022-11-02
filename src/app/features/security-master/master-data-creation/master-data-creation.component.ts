import { Component } from '@angular/core';

@Component({
  selector: 'app-master-data-creation',
  templateUrl: './master-data-creation.component.html',
  styleUrls: ['./master-data-creation.component.css']
})
export class MasterDataCreationComponent {
  inputSubModuleId: number;
  constructor() {
    this.inputSubModuleId = 9;
  }
}





