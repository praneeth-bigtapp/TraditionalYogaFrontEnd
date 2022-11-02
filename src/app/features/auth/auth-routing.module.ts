import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'logout', component: LoginComponent },
  { path: 'changepassword', component: ChangePasswordComponent },
  { path: 'dm', component: LoginComponent },
  { path: 'dm/logout', component: LoginComponent },
  { path: 'dm/changepassword', component: ChangePasswordComponent },
  { path: 'inv/dm', component: LoginComponent },
  { path: 'inv/dm/logout', component: LoginComponent },
  { path: 'inv/dm/changepassword', component: ChangePasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
