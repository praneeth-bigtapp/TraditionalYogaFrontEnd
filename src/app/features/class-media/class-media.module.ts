import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassMediaRoutingModule } from './class-media-routing.module';
import { MediaComponent } from './media/media.component';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [
    MediaComponent
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
    MatTooltipModule
  ]
})
export class ClassMediaModule { }
