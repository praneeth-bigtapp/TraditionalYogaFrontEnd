import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoGalleryRoutingModule } from './photo-gallery-routing.module';
import { GalleryComponent } from './gallery/gallery.component';
import {MatTableModule} from '@angular/material/table';
import { UploadgalleryComponent } from './uploadgallery/uploadgallery.component';


@NgModule({
  declarations: [
    GalleryComponent,
    UploadgalleryComponent
  ],
  imports: [
    CommonModule,
    PhotoGalleryRoutingModule,
    MatTableModule
  ]
})
export class PhotoGalleryModule { }
