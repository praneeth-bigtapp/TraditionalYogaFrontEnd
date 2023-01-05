import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCourseMatriealsComponent } from '../courses/my-course-matrieals/my-course-matrieals.component';
import { MycourseMaterialComponent } from './mycourse-material/mycourse-material.component';



const routes: Routes = [
  { path: 'cousermaterial', component: MycourseMaterialComponent }
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyCourseMaterialRoutingModule {
}