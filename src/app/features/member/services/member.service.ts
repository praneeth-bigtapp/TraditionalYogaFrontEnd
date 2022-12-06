import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class MemberService extends BaseHttp {

  getallcourseURL = "courseList/getAll?operation=coursesList"

  getallcourses() {
    return this.get(this.getallcourseURL)
  }
}
