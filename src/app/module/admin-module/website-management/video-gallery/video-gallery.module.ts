import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatTableModule } from '@angular/material/table';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

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

import { VideoGalleryComponent } from './video-gallery/video-gallery.component';
import { UploadVideosComponent } from './upload-videos/upload-videos.component';
import { MatRadioModule } from '@angular/material/radio';
import { VideoGalleryRoutingModule } from './video-gallery.routing.module';


@NgModule({
  declarations: [
   VideoGalleryComponent,
   UploadVideosComponent
  ],
 
  imports: [
    CommonModule,
    VideoGalleryRoutingModule,
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
    MatRadioModule,
    
  ]
})
export class VideoGalleryModule { }
