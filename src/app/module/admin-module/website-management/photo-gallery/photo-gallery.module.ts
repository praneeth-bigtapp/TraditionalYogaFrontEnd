import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoGalleryRoutingModule } from './photo-gallery-routing.module';
import { GalleryComponent } from './gallery/gallery.component';
import { MatTableModule } from '@angular/material/table';
import { UploadgalleryComponent } from './uploadgallery/uploadgallery.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateGalleryComponent } from './create-gallery/create-gallery.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatedTabHeader } from '@angular/material/tabs/paginated-tab-header';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ViewgalleryComponent } from './viewgallery/viewgallery.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    GalleryComponent,
    UploadgalleryComponent,
    CreateGalleryComponent,
    ViewgalleryComponent
  ],
  entryComponents: [CreateGalleryComponent],
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
    SharedModule,
    MatCardModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatOptionModule,
    MatFormFieldModule,
    MatSelectModule,

  ]
})
export class PhotoGalleryModule { }
