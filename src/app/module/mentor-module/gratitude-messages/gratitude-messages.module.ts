import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GratitudeMessagesRoutingModule } from './gratitude-messages-routing.module';
import { GratitudeSummaryComponent } from './gratitude-summary/gratitude-summary.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { GratitudeUnreadMessagesComponent } from './gratitude-unread-messages/gratitude-unread-messages.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { GratitudeMessageInformedDeniedComponent } from './gratitude-message-informed-denied/gratitude-message-informed-denied.component';
import { AngularEditorModule } from '@kolkov/angular-editor';


@NgModule({
  declarations: [
    GratitudeSummaryComponent,
    GratitudeUnreadMessagesComponent,
    GratitudeMessageInformedDeniedComponent
  ],
  imports: [
    CommonModule,
    GratitudeMessagesRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    SharedModule,
    MatTooltipModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    AngularEditorModule,

  ]
})
export class GratitudeMessagesModule { }
