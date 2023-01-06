import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/auth/auth.service';

const routes: Routes = [
  {

    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./viewstudent/viewstudent.module').then((m) => m.ViewstudentModule)

  },
  {

    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./mentor-dash-board/MentorDashboard.module').then((m) => m.MentorDashboardModule)

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MentorRoutingModule { }
