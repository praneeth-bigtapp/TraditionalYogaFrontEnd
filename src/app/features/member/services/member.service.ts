import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class MemberService extends BaseHttp {

  getallcourseURL = "student/getAll?operation=course"

  getallcourses() {
    return this.get(this.getallcourseURL)
  }
}
