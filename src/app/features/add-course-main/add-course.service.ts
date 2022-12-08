import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class AddCourseService extends BaseHttp {
  getURL = 'student/getAll?operation=course';
  getCoursePost = 'courseList/coursesList?operation=add';

  getcategorylist = "courseList/getAll?operation=categoryList"

  getCategory() {

    return this.get<any>(this.getcategorylist);

  }


  postadcourse(body: any) {
    return this.post<any>(this.getCoursePost, body)
  }


}


