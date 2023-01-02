import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResourcesRoutingModule } from './resources-routing.module';
import { ResourceComponent } from './resource/resource.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { SortingresourcesComponent } from './sortingresources/sortingresources.component';
import {MatSliderModule} from '@angular/material/slider';


@NgModule({
  declarations: [
    ResourceComponent,
    SortingresourcesComponent
  ],
  imports: [
    CommonModule,
    ResourcesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSliderModule,
  ]
})
export class ResourcesModule { }
