import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnlineexamRoutingModule } from './onlineexam-routing.module';
import { OnlineexamComponent } from './onlineexam/onlineexam.component';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TasksComponent } from './tasks/tasks.component';
import { MatSortModule } from '@angular/material/sort';
import { TaskCreateComponent } from './task-create/task-create.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    OnlineexamComponent,
    TasksComponent,
    TaskCreateComponent
  ],
  imports: [
    CommonModule,
    OnlineexamRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRadioModule,
    MatInputModule,
    MatTooltipModule,
    MatSelectModule,
    MatCheckboxModule,
    MatPaginatorModule,
    SharedModule,
    MatTableModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
  ]
})
export class OnlineexamModule { }
