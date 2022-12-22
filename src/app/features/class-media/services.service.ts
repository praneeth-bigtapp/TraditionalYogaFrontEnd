import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService extends BaseHttp {
  getAllMediaURL = "course/getAll?operation=classMedia";

  getAllcoursesURL = 'courseList/getAll?operation=coursesList'


  getcoursemediacategoryURL = "course/getAll?operation=courseMediaCategory"
  postvideoURL = "course/addCourseMedia?type=video"
  postshortvideoURL = "course/addCourseMedia?type=shortVideo"
  postglimpsevideoURL = "course/addCourseMedia?type=glimpses"

  deleteclassmediaURL = "course/classMedia?operation=delete"


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
    return this.post(this.postglimpsevideoURL, body)
  }

  getMediadetails() {
    return this.get(this.getAllMediaURL)
  }
  getcoursesdetails() {
    return this.get(this.getAllcoursesURL)
  }
  deleteclassmedia(body: any) {
    return this.post(this.deleteclassmediaURL, body)
  }
}
