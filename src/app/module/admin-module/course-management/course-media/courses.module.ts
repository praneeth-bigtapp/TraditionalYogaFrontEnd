import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CourseMediaPraticeComponent } from './course-media-pratice/course-media-pratice.component';
import { MatSelectModule } from '@angular/material/select';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MyCourseMatriealsComponent } from '../course-material/my-course-matrieals/my-course-matrieals.component';
import { ViewMycourseMatriealsComponent } from '../course-material/view-mycourse-matrieals/view-mycourse-matrieals.component';
import { AddCourseimageComponent } from './add-courseimage/add-courseimage.component';
import { AddCoursedocumentComponent } from './add-coursedocument/add-coursedocument.component';



@NgModule({
  declarations: [
    CourseMediaPraticeComponent,
    MyCourseMatriealsComponent,
    ViewMycourseMatriealsComponent,
    AddCourseimageComponent,
    AddCoursedocumentComponent

  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    MatPaginatorModule,
    SharedModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatSelectModule,
    AngularEditorModule,



  ]
})
export class CoursesModule { }
