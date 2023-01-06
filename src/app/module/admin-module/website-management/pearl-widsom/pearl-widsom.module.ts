import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PearlWidsomRoutingModule } from './pearl-widsom-routing.module';
import { PearlwidsomComponent } from './pearlwidsom.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PearlwidsomComponent
  ],
  imports: [
    CommonModule,
    PearlWidsomRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    MatPaginatorModule,
    SharedModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatSelectModule,
    AngularEditorModule,
  ]
})
export class PearlWidsomModule { }
