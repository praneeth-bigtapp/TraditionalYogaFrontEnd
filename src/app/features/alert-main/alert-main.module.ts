import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertMainRoutingModule } from './alert-main-routing.module';
import { AlertComponent } from './alert/alert.component';

import { AngularEditorModule } from '@kolkov/angular-editor';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    CommonModule,
    AlertMainRoutingModule,
    HttpClientModule,
    AngularEditorModule ,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ]
})
export class AlertMainModule { }
