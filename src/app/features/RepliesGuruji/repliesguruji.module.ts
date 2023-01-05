import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatTableModule } from '@angular/material/table';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatedTabHeader } from '@angular/material/tabs/paginated-tab-header';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { RepliesGurujiRoutingModule } from './repliesguruji.routing.module';
import { RepliesGurujiComponent } from './replies-guruji/replies-guruji.component';



@NgModule({
  declarations: [
   RepliesGurujiComponent
  ],
 
  imports: [
    CommonModule,
    RepliesGurujiRoutingModule,
    MatTableModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatCardModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSortModule,
 
    MatSlideToggleModule,
    MatTooltipModule,
    MatRadioModule,

  ]
})
export class RepliesGurujiModule { }
