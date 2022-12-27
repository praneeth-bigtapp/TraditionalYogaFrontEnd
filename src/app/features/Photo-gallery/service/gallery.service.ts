import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class GalleryService extends BaseHttp {

  uploadimageURL = "upload/photoGallery"
  allURL = 'webSite/photoGallary?operation=add'
  updateURL = 'webSite/photoGallary?operation=save'
  toggleURL = 'webSite/photoGallary?operation=active'
  deleteURL = 'webSite/photoGallary?operation=delete'
  FullURL = 'webSite/getAll?operation=photoGallery'


  uploadImagesUrl = "upload/photoGallery"

  getAll() {
    return this.get(this.FullURL)
  }
  postuploadimage(body: any) {
    return this.post(this.uploadimageURL, body)
  }
  addList(body: any) {
    return this.post(this.allURL, body)
  }
  updateList(body: any) {
    return this.post(this.updateURL, body)
  }
  VisitList(body: any) {
    return this.post(this.toggleURL, body)
  }
  DeleteLit(body: any) {
    return this.post(this.deleteURL, body)
  }

  getUploadImages(body: any) {
    return this.postImg(this.uploadImagesUrl, body)
  }
}
