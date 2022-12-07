import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class LiveclassService extends BaseHttp {

  // getallcourseURL = "student/getAll?operation=course"
  getallcourseURL = "courseList/getAll?operation=coursesList"

  getcoursemediacategoryURL = "course/getAll?operation=courseMediaCategory"
  postvideoURL = "course/addCourseMedia?type=video"
  postshortvideoURL = "course/addCourseMedia?type=shortVideo"
  postglimpsevideoURL = "course/addCourseMedia?type=glimpses"


  getallcourse() {
    return this.get(this.getallcourseURL)
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
    return this.post(this.postglimpsevideoURL, body)
  }

}
