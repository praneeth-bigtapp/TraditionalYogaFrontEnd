import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/auth/auth.service';

const routes: Routes = [

  {
    path: '',
    loadChildren: () =>
      import('./registration/registration.module').then((m) => m.RegistrationModule)
  },

  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./courses/pastcourse.module').then((m) => m.PastcourseModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./gratitude-message/gratitudemessage.module').then((m) => m.GratitudemessageModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./my-course-material/mycourse.module').then((m) => m.MycourseMaterialModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./notification/notification.module').then((m) => m.NotificationModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./replies-guruji/repliesguruji.module').then((m) => m.RepliesGurujiModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./resources/resources.module').then((m) => m.ResourcesModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./student-dashboard/student-dashboard.module').then((m) => m.StudentDashboardModule)
  },

  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./view-task/view-task.module').then((m) => m.ViewTaskModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./your-watch-hourse/watchHourse.module').then((m) => m.WatchHourseModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
