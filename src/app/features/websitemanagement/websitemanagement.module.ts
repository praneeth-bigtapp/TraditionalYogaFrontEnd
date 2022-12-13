import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsitemanagementRoutingModule } from './websitemanagement-routing.module';
import { HidemyoptionComponent } from './hidemyoption/hidemyoption.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { PearlwidsomComponent } from './pearlwidsom/pearlwidsom.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
  declarations: [
    HidemyoptionComponent,
    PearlwidsomComponent
  ],
  imports: [
    CommonModule,
    WebsitemanagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatInputModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    SharedModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSlideToggleModule,
  ]
})
export class WebsitemanagementModule { }
