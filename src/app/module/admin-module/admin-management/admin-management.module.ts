import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserComponent } from './user/user.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RolesComponent } from './roles/roles.component';
import { RolePermissionsComponent } from './role-permissions/role-permissions.component';
import { UserService } from './user/service/user.service';
import { RolesService } from './roles/service/roles.service';
import { RolePermissionsService } from './role-permissions/service/role-permissions.service';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ModuleComponent } from './module/module.component';
import { SubModuleComponent } from './sub-module/sub-module.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ParametersComponent } from '../course-management/parameters/parameters.component';
import { AdministrationRoutingModule } from './admin-management-routing.module';

@NgModule({
  declarations: [
    UserComponent,
    RolesComponent,
    RolePermissionsComponent,
    ModuleComponent,
    SubModuleComponent,
    ParametersComponent,
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    MatSortModule,
    MatTableModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSlideToggleModule,
    SharedModule,
    MatTooltipModule,
    MatSnackBarModule,
  ],
  providers: [UserService, RolesService, RolePermissionsService]
})
export class AdministrationModule { }
