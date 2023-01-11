import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/auth/auth.service';
import { StudentProfileComponent } from './student-profile/student-profile.component';

const routes: Routes = [
  {
    path:"studentViewProfile",canActivate:[AuthGuard],component:StudentProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewStudentRoutingModule { }
