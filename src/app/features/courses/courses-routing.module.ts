import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseMainComponent } from './course-main/course-main.component';

const routes: Routes = [
  {
    path: "courses", component: CourseMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
