import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { UploadgalleryComponent } from './uploadgallery/uploadgallery.component';
import { ViewgalleryComponent } from './viewgallery/viewgallery.component';

const routes: Routes = [
  { path: 'gallery', component: GalleryComponent },
  { path: "uploadGallery", component: UploadgalleryComponent },
  { path: "viewgallery", component: ViewgalleryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhotoGalleryRoutingModule { }
