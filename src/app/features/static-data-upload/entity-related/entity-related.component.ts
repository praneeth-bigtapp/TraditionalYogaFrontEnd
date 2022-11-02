import { Component } from '@angular/core';

@Component({
  selector: 'app-entity-related',
  templateUrl: './entity-related.component.html'
})
export class EntityRelatedComponent {
  inputSubModuleId: number;
  constructor() {
    this.inputSubModuleId = 6;
  }
}
