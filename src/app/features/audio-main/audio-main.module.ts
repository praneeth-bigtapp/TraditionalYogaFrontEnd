import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AudioMainRoutingModule } from './audio-main-routing.module';
import { AudioComponent } from './audio/audio.component';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';


import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BannerMainRoutingModule } from '../banner-main/banner-main-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    AudioComponent
  ],
  imports: [
    CommonModule,
    AudioMainRoutingModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    SharedModule,
    MatSortModule,
    ReactiveFormsModule,
    BannerMainRoutingModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule
   
  ]
})
export class AudioMainModule { }
