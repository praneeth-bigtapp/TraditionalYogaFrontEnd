import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CsvGeneratorComponent } from './csv-generator/csv-generator.component';
import { ModuleComponent } from './module/module.component';
import { RolePermissionComponent } from './role-permission/role-permission.component';
import { RolePermissionsComponent } from './role-permissions/role-permissions.component';
import { RolesComponent } from './roles/roles.component';
import { SubModuleComponent } from './sub-module/sub-module.component';
import { TableConfiguratorComponent } from './table-configurator/table-configurator.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'users', component: UserComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'module', component: ModuleComponent },
  { path: 'subModule', component: SubModuleComponent },
  { path: 'rolePermission', component: RolePermissionComponent },
  { path: 'rBAPermission', component: RolePermissionsComponent },
  { path: 'tableConfigurator', component: TableConfiguratorComponent },
  { path: 'cSVGenerator', component: CsvGeneratorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
