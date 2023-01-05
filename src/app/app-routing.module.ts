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
