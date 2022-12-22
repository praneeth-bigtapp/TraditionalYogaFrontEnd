import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService extends BaseHttp {
  getAllMediaURL = "course/getAll?operation=classMedia";

  getAllcoursesURL = 'courseList/getAll?operation=coursesList'

  getcoursemediacategoryURL = "course/getAll?operation=courseMediaCategory"
  // postvideoURL = "course/addCourseMedia?type=video"
  // postshortvideoURL = "course/addCourseMedia?type=shortVideo"
  // postglimpsevideoURL = "course/addCourseMedia?type=glimpses"

  deleteclassmediaURL = "course/classMedia?operation=delete"


  getvideoURL = ""
  postvideoURL = "course/courseMedia?operation=add&type=video"
  updatevideoURL = "course/courseMedia?operation=save&type=video"
  deletevideoURL = "/course/courseMedia?operation=delete&type=video"

  getshortvideoURL = ""
  postshortvideoURL = "course/courseMedia?operation=add&type=shortVideo"
  updateshortvideoURL = "course/courseMedia?operation=save&type=shortVideo"
  deleteshortvideoURL = "/course/courseMedia?operation=delete&type=shortVideo"

  getglimpseURL = ""
  postglimpseURL = "course/courseMedia?operation=add&type=glimpses"
  updateglimpseURL = "course/courseMedia?operation=save&type=glimpses"
  deleteglimpseURL = "course/courseMedia?operation=delete&type=glimpses"

  getMediadetails() {
    return this.get(this.getAllMediaURL)
  }
  getcoursesdetails() {
    return this.get(this.getAllcoursesURL)
  }
  getvideo() {
    return this.get(this.getvideoURL)
  }
  getshortvideo() {
    return this.get(this.getshortvideoURL)
  }
  getglimpse() {
    return this.get(this.getglimpseURL)
  }

  getcoursemediacategory() {
    return this.get(this.getcoursemediacategoryURL)
  }

  postvideo(body: any) {
    return this.post(this.postvideoURL, body)
  }
  postshortvideo(body: any) {
    return this.post(this.postshortvideoURL, body)
  }
  postglimpsevideo(body: any) {
    return this.post(this.postglimpseURL, body)
  }

  updatevideo(body: any) {
    return this.post(this.updatevideoURL, body)
  }

  updateshortvideo(body: any) {
    return this.post(this.updateshortvideoURL, body)
  }

  updateglimpse(body: any) {
    return this.post(this.updateglimpseURL, body)
  }

  deletevideo(body: any) {
    return this.post(this.deletevideoURL, body)
  }
  deleteshortvideo(body: any) {
    return this.post(this.deleteshortvideoURL, body)
  }
  deleteglimpse(body: any) {
    return this.post(this.deleteglimpseURL, body)
  }

  deleteclassmedia(body: any) {
    return this.post(this.deleteclassmediaURL, body)
  }
}
