import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class VideoGalleryService extends BaseHttp {

  createAlbumUrl = "course/createAlbum?operation=add"
  getAlbumUrl = ""
  updateAlbumUrl = ""
  deleteAlbumUrl = ""

  addVideoAlbumUrl = "courseList/mapVideos?operation=add"
  updateVideoAlbumUrl = "courseList/mapVideos?operation=update"
  deleteVideoAlbumUrl = "courseList/mapVideos?operation=delete"
  getVideoAlbumUrl = "courseList/getAll?operation=videoAlbum"

  getAlbum() {
    return this.get(this.getAlbumUrl)
  }

  createAlbum(body: any) {
    return this.post(this.createAlbumUrl, body)
  }
  updateAlbum(body: any) {
    return this.post(this.updateAlbumUrl, body)
  }
  deleteAlbum(body: any) {
    return this.post(this.deleteAlbumUrl, body)
  }
  getVideoAlbum() {
    return this.get(this.getVideoAlbumUrl)
  }
  addVideoAlbum(body: any) {
    return this.post(this.addVideoAlbumUrl, body)
  }
  updateVideoAlbum(body: any) {
    return this.post(this.updateVideoAlbumUrl, body)
  }
  deleteVideoAlbum(body: any) {
    return this.post(this.deleteVideoAlbumUrl, body)
  }
}
