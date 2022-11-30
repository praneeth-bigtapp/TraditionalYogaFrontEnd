import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseMainComponent } from './course-main/course-main.component';
import { CourseMediaPraticeComponent } from './course-media-pratice/course-media-pratice.component';
import { MyCourseMatriealsComponent } from './my-course-matrieals/my-course-matrieals.component';

const routes: Routes = [
  {
    path: "courses", component: CourseMainComponent

  },
  {
    path: "coursesaddmedia", component: CourseMediaPraticeComponent

  },
  {
    path: "MycourseMatrieals", component: MyCourseMatriealsComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
