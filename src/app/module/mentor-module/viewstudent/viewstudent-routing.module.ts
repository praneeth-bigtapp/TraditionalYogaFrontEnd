import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentprofileComponent } from './studentprofile/studentprofile.component';

const routes: Routes = [
  { path: "studentViewProfile", component: StudentprofileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewstudentRoutingModule { }
