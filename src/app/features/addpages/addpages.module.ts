import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddpagesRoutingModule } from './addpages-routing.module';
import { AddpagesComponent } from './addpages/addpages.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddpagesComponent
  ],
  imports: [
    CommonModule,
    AddpagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    AngularEditorModule,
    HttpClientModule,
  ]
})
export class AddpagesModule { }
