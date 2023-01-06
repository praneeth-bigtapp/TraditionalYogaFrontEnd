import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth/auth.service';
import { NotificationComponent } from './shared/components/notification/notification.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./module/main-module/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./module/admin-module/admin-module.module').then((m) => m.AdminModuleModule)
  },
  {
    path: 'student',
    loadChildren: () =>
      import('./module/student-module/student.module').then((m) => m.StudentModule)
  },
  {
    path: 'mentor',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./module/mentor-module/mentor.module').then((m) => m.MentorModule)
  },
  {
    path: 'cheifMentor',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./module/cheif-mentor-module/cheif-mentor.module').then((m) => m.CheifMentorModule)
  },
  {
    path: 'gratitude',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./module/gratitude-module/gratitude.module').then((m) => m.GratitudeModule)
  },
  {
    path: 'guriji',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./module/guruji-module/guruji.module').then((m) => m.GurujiModule)
  },
  {
    path: 'notification',
    canActivate: [AuthGuard],
    component: NotificationComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
