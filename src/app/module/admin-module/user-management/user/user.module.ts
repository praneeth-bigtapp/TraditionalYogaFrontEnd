import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatRadioModule } from '@angular/material/radio';
import { UserRoutingModule } from './user-routing.module';
import { UserFilterComponent } from './user-filter/user-filter.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SuspiciousUsersComponent } from './suspicious-users/suspicious-users.component';
@NgModule({
  declarations: [
    UserFilterComponent,
    SuspiciousUsersComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatSortModule,
    MatRadioModule,
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
    MatIconModule,
    MatAutocompleteModule,
  ],
  exports: [SuspiciousUsersComponent]
})
export class UserFilterModule { }
