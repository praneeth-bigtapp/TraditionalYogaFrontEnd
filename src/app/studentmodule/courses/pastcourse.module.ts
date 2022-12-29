import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PastcourseRoutingModule } from './pastcourse-routing.module';
import { PastCourseComponent } from './past-course/past-course.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    PastCourseComponent,
    CourseDetailsComponent
  ],
  imports: [
    CommonModule,
    PastcourseRoutingModule,
    MatIconModule,
    MatExpansionModule,
    MatTooltipModule,
    
  ]
})
export class PastcourseModule { }
