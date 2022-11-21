import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCourseComponent } from './add-course/add-course.component';

const routes: Routes = [
  {
    path:'addCourse', component:AddCourseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  
exports: [RouterModule]
})
export class AddCourseMainRoutingModule { }
