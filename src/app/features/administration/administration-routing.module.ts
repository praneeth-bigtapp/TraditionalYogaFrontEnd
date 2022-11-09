import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleComponent } from './module/module.component';
import { RolePermissionsComponent } from './role-permissions/role-permissions.component';
import { RolesComponent } from './roles/roles.component';
import { SubModuleComponent } from './sub-module/sub-module.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'users', component: UserComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'module', component: ModuleComponent },
  { path: 'subModule', component: SubModuleComponent },
  { path: 'rolePermission', component: RolePermissionsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
