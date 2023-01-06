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
import { MentorDashBoardComponent } from './mentor-dash-board/mentor-dash-board.component';
import { MentorDashboardRouting } from './MentorDashboard.routing.module';
import { MentordashboardstudentdetailsComponent } from './mentordashboardstudentdetails/mentordashboardstudentdetails.component';



@NgModule({
  declarations: [
   MentorDashBoardComponent,
   MentordashboardstudentdetailsComponent
  ],
 
  imports: [
    CommonModule,
    MentorDashboardRouting,
    MatTableModule,
    MatSnackBarModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
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
export class MentorDashboardModule { }
