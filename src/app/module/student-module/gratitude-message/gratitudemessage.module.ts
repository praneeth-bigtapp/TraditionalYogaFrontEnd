import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GratitudemessageRoutingModule } from './gratitudemessage-routing.module';
import { GratitudeMessageComponent } from './gratitude-message/gratitude-message.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    GratitudeMessageComponent
  ],
  imports: [
    CommonModule,
    GratitudemessageRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    SharedModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
   MatInputModule,
    MatFormFieldModule,
    MatTooltipModule
  ]
  
})
export class GratitudemessageModule { }
