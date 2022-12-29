import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PastcourseRoutingModule } from './pastcourse-routing.module';
import { PastCourseComponent } from './past-course/past-course.component';


@NgModule({
  declarations: [
    PastCourseComponent
  ],
  imports: [
    CommonModule,
    PastcourseRoutingModule
  ]
})
export class PastcourseModule { }
