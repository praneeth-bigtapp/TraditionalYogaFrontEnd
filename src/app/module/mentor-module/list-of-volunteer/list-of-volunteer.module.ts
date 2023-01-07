import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListOfVolunteerRoutingModule } from './list-of-volunteer-routing.module';
import { VolunteerIntrestedComponent } from './volunteer-intrested/volunteer-intrested.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    VolunteerIntrestedComponent
  ],
  imports: [
    CommonModule,
    ListOfVolunteerRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    SharedModule,
  
    MatPaginatorModule,
    MatTooltipModule,
  ]
})
export class ListOfVolunteerModule { }
