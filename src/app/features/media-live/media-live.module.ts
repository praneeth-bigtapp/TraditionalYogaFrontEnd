import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaLiveRoutingModule } from './media-live-routing.module';
import { LiveComponent } from './live/live.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    LiveComponent
  ],
  imports: [
    CommonModule,
    MediaLiveRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatTabsModule,
  ]
})
export class MediaLiveModule { }
