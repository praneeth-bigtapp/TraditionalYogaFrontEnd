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
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { StudentMasterRoutingModule } from './student-master-routing.module';
import { RolePermissionsService } from '../../admin-management/role-permissions/service/role-permissions.service';
import { RolesService } from '../../admin-management/roles/service/roles.service';
import { UserService } from '../../admin-management/user/service/user.service';



@NgModule({
  declarations: [
    StudentProfileComponent,

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
    MatDialogModule,
    MatDatepickerModule,

  ],
  providers: [UserService, RolesService, RolePermissionsService]
})
export class StudentMasterModule { }
