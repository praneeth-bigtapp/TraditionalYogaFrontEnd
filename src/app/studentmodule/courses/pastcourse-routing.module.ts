import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { PastCourseComponent } from './past-course/past-course.component';

const routes: Routes = [
  { path: 'pastCourse', component: PastCourseComponent },
  { path: 'courseDetails', component: CourseDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PastcourseRoutingModule { }
