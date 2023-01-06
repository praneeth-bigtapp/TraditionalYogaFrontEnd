import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/auth/auth.service';
import { DetailsStudentInformationComponent } from './details-student-information/details-student-information.component';
import { StudentenrollmentComponent } from './studentenrollment/studentenrollment.component';

const routes: Routes = [
  { path: "studentEnrollment", component: StudentenrollmentComponent },
  { path: "studentDetailsEnrollment", canActivate: [AuthGuard], component: DetailsStudentInformationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
