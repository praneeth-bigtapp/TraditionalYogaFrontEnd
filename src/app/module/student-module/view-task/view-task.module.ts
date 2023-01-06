import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewTaskRoutingModule } from './view-task-routing.module';
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StatusTaskComponent } from './status-task/status-task.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [
    ViewtaskComponent,
    StatusTaskComponent
  ],
  imports: [
    CommonModule,
    ViewTaskRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    SharedModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatRadioModule,
  ]
})
export class ViewTaskModule { }
