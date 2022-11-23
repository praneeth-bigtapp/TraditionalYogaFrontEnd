import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerMainRoutingModule } from './banner-main-routing.module';
import { BannersComponent } from './banners/banners.component';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BannersComponent
  ],
  imports: [
    CommonModule,
    BannerMainRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class BannerMainModule { }
