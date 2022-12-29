import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PastCourseComponent } from './past-course/past-course.component';

const routes: Routes = [
  {path:'pastCourse', component:PastCourseComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PastcourseRoutingModule { }
