import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassMediaRoutingModule } from './class-media-routing.module';
import { MediaComponent } from './media/media.component';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { ShortvideomediaComponent } from './shortvideomedia/shortvideomedia.component';
import { GlimpemediaComponent } from './glimpemedia/glimpemedia.component';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';



@NgModule({
  declarations: [
    MediaComponent,
    ShortvideomediaComponent,
    GlimpemediaComponent,
    
  ],
  imports: [
    CommonModule,
    ClassMediaRoutingModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatTooltipModule,
    MatSortModule,


    FormsModule,


    ReactiveFormsModule,
    MatCheckboxModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSlideToggleModule,
    SharedModule,
    MatSortModule,
    MatTabsModule,
    MatAutocompleteModule,

  ]
})
export class ClassMediaModule { }
