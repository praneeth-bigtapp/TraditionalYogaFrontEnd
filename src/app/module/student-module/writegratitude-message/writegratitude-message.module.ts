import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WritegratitudeMessageRoutingModule } from './writegratitude-message-routing.module';
import { WriteGratitudeComponent } from './write-gratitude/write-gratitude.component';
import { PopupInfoComponent } from './popup-info/popup-info.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    WriteGratitudeComponent,
    PopupInfoComponent
  ],
  imports: [
    CommonModule,
    WritegratitudeMessageRoutingModule,
    AngularEditorModule ,
    MatDialogModule
  ]
})
export class WritegratitudeMessageModule { }
