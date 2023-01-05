import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCourseMatriealsComponent } from '../course-material/my-course-matrieals/my-course-matrieals.component';
import { ViewMycourseMatriealsComponent } from '../course-material/view-mycourse-matrieals/view-mycourse-matrieals.component';
import { CourseMediaPraticeComponent } from './course-media-pratice/course-media-pratice.component';

const routes: Routes = [
  {
    path: "coursemediapracticessession", component: CourseMediaPraticeComponent

  },
  {
    path: "courseMatrieals", component: MyCourseMatriealsComponent
  },
  {
    path: "ViewMycourseMatrieals/:id", component: ViewMycourseMatriealsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
