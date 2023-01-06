import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannersComponent } from './banners/banners.component';

import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BannerMainRoutingModule } from './banner-routing.module';


@NgModule({
  declarations: [
    BannersComponent
  ],
  imports: [
    CommonModule,
    BannerMainRoutingModule,
    MatTableModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    SharedModule,
    MatCheckboxModule,

    ReactiveFormsModule,
  ]
})
export class BannerMainModule { }
