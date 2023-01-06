import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewstudentRoutingModule } from './viewstudent-routing.module';
import { StudentprofileComponent } from './studentprofile/studentprofile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { StudentMasterModule } from '../../admin-module/user-management/student-master/student-master.module';



@NgModule({
  declarations: [
    StudentprofileComponent,

  ],
  imports: [
    CommonModule,
    ViewstudentRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatRadioModule,
    StudentMasterModule,


  ]
})
export class ViewstudentModule { }
