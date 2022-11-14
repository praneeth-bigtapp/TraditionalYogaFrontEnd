import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserComponent } from '../administration/user/user.component';
import { RolesComponent } from '../administration/roles/roles.component';
import { RolePermissionsComponent } from '../administration/role-permissions/role-permissions.component';
import { ModuleComponent } from '../administration/module/module.component';
import { SubModuleComponent } from '../administration/sub-module/sub-module.component';
import { StudentMasterRoutingModule } from './student-master-routing.module';
import { UserService } from '../administration/user/service/user.service';
import { RolesService } from '../administration/roles/service/roles.service';
import { RolePermissionsService } from '../administration/role-permissions/service/role-permissions.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import { StudentProfileComponent } from './student-profile/student-profile.component';


@NgModule({
  declarations: [
    StudentProfileComponent
  ],
  imports: [
    CommonModule,
    StudentMasterRoutingModule,
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
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatRadioModule,
    MatTableModule,
    MatDialogModule
  ],
  providers: [UserService, RolesService, RolePermissionsService]
})
export class StudentMasterModule { }
