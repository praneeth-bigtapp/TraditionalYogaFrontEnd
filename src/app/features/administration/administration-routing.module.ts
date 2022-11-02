import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CsvGeneratorComponent } from './csv-generator/csv-generator.component';
import { RolePermissionsComponent } from './role-permissions/role-permissions.component';
import { RolesComponent } from './roles/roles.component';
import { TableConfiguratorComponent } from './table-configurator/table-configurator.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'users', component: UserComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'rBAPermission', component: RolePermissionsComponent },
  { path: 'tableConfigurator', component: TableConfiguratorComponent },
  { path: 'cSVGenerator', component: CsvGeneratorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
