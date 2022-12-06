import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { UploadgalleryComponent } from './uploadgallery/uploadgallery.component';

const routes: Routes = [
  { path: 'gallery', component: GalleryComponent },
  { path: "uploadGallery", component: UploadgalleryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhotoGalleryRoutingModule { }
