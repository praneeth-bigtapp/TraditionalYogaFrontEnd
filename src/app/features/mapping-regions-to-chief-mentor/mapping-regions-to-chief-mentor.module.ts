import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MappingRegionsToChiefMentorRoutingModule } from './mapping-regions-to-chief-mentor-routing.module';
import { MappingRegionsToChiefMentorComponent } from './mapping-regions-to-chief-mentor/mapping-regions-to-chief-mentor.component';


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
import { RegioncreationComponent } from './regioncreation/regioncreation.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    MappingRegionsToChiefMentorComponent,
    RegioncreationComponent
  ],
  imports: [
    CommonModule,
    MappingRegionsToChiefMentorRoutingModule,


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
    MatSnackBarModule,
    MatAutocompleteModule,
    SharedModule,
  ]
})
export class MappingRegionsToChiefMentorModule { }
