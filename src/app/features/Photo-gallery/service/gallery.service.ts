import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class GalleryService extends BaseHttp {

  uploadimageURL = "/upload/photoGallery"

  postuploadimage(body: any) {
    return this.post(this.uploadimageURL, body)
  }
}
