import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapCourseComponent } from './map-course/map-course.component';

const routes: Routes = [
  {path:'mapCourse', component: MapCourseComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
 
exports: [RouterModule]
})
export class MapUsersRoutingModule { }
