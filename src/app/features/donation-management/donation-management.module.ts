import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonationManagementRoutingModule } from './donation-management-routing.module';
import { DonationManagementComponent } from './donation-management/donation-management.component';

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
import { DonationviewdetailsComponent } from './donationviewdetails/donationviewdetails.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    DonationManagementComponent,
    DonationviewdetailsComponent
  ],
  imports: [
    CommonModule,
    DonationManagementRoutingModule,
    SharedModule,
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
    MatIconModule,
    MatAutocompleteModule,
    MatSortModule,
    SharedModule,
    MatDialogModule,
  ]
})
export class DonationManagementModule { }
