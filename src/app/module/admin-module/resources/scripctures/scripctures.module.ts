import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScripcturesRoutingModule } from './scripctures-routing.module';
import { CreateScripcturesComponent } from './create-scripctures/create-scripctures.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    CreateScripcturesComponent
  ],
  imports: [
    CommonModule,
    ScripcturesRoutingModule,
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
    MatSnackBarModule,
  ]
})
export class ScripcturesModule { }
