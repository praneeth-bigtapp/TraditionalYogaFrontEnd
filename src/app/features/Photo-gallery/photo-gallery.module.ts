import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoGalleryRoutingModule } from './photo-gallery-routing.module';
import { GalleryComponent } from './gallery/gallery.component';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [
    GalleryComponent
  ],
  imports: [
    CommonModule,
    PhotoGalleryRoutingModule,
    MatTableModule
  ]
})
export class PhotoGalleryModule { }
