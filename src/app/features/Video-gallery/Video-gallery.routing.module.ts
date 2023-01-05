import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadVideosComponent } from './upload-videos/upload-videos.component';
import { VideoGalleryComponent } from './video-gallery/video-gallery.component';


const routes: Routes = [
  { path: 'videogallery', component: VideoGalleryComponent },
  {path: 'uploadVideos' , component: UploadVideosComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoGalleryRoutingModule {
}