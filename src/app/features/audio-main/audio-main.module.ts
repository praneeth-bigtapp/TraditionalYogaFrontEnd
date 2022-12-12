import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AudioMainRoutingModule } from './audio-main-routing.module';
import { AudioComponent } from './audio/audio.component';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
    ReactiveFormsModule,
  ]
})
export class AudioMainModule { }
