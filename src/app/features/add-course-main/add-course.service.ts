import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class AddCourseService extends BaseHttp {
  getURL = 'student/getAll?operation=course';
  getCoursePost = 'courseList/coursesList?operation=add';

  updatecourseURL = ""

  deleteCourseURL = ""
  getcategorylist = "courseList/getAll?operation=categoryList"

  getCategory() {

    return this.get<any>(this.getcategorylist);

  }


  postadcourse(body: any) {
    return this.post<any>(this.getCoursePost, body)
  }

  updatecourse(body: any) {
    return this.post(this.updatecourseURL, body)
  }

  deletecourse(body: any) {
    return this.post(this.deleteCourseURL, body)
  }


}


