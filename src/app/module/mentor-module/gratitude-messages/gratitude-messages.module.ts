import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GratitudeMessagesRoutingModule } from './gratitude-messages-routing.module';
import { GratitudeSummaryComponent } from './gratitude-summary/gratitude-summary.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    GratitudeSummaryComponent
  ],
  imports: [
    CommonModule,
    GratitudeMessagesRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ]
})
export class GratitudeMessagesModule { }
