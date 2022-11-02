import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth/auth.service';
import { ViewDataComponent } from './features/view-data/view-data.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'administration',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/administration/administration.module').then((m) => m.AdministrationModule)
  },
  {
    path: 'securityMaster',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/security-master/security-master.module').then((m) => m.SecurityMasterModule)
  },
  {
    path: 'dataUpload',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/static-data-upload/static-data-upload.module').then((m) => m.StaticDataUploadModule)
  },
  {
    path: 'viewData/dataView',
    canActivate: [AuthGuard],
    component: ViewDataComponent
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
