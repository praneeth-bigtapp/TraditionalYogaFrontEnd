import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsitemanagementRoutingModule } from './websitemanagement-routing.module';
import { HidemyoptionComponent } from './hidemyoption/hidemyoption.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { PearlwidsomComponent } from './pearlwidsom/pearlwidsom.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


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
  ]
})
export class WebsitemanagementModule { }
