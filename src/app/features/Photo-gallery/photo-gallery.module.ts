import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoGalleryRoutingModule } from './photo-gallery-routing.module';
import { GalleryComponent } from './gallery/gallery.component';
import {MatTableModule} from '@angular/material/table';
import { UploadgalleryComponent } from './uploadgallery/uploadgallery.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateGalleryComponent } from './create-gallery/create-gallery.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GalleryComponent,
    UploadgalleryComponent,
    CreateGalleryComponent
  ],
  entryComponents:[CreateGalleryComponent],
  imports: [
    CommonModule,
    PhotoGalleryRoutingModule,
    MatTableModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PhotoGalleryModule { }
