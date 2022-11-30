import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCourseMainRoutingModule } from './add-course-main-routing.module';
import { AddCourseComponent } from './add-course/add-course.component';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import {MatRadioModule} from '@angular/material/radio';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';




@NgModule({
  declarations: [
    AddCourseComponent
  ],
  imports: [
    CommonModule,
    AddCourseMainRoutingModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    AngularEditorModule,
    HttpClientModule,
    MatRadioModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule ,
    MatDatepickerModule
  ]
})
export class AddCourseMainModule { }
