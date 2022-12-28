import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentenrollmentComponent } from './studentenrollment/studentenrollment.component';

const routes: Routes = [
  { path: "studentEnrollment", component: StudentenrollmentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
