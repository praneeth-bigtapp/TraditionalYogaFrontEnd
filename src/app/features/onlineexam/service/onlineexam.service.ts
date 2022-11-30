import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class OnlineexamService extends BaseHttp {

  getallcourseURL = "student/getAll?operation=course"

  postonlinexamURL = ""

  getallcourses() {
    return this.get(this.getallcourseURL)
  }

  postonlineexam(body: any) {
    return this.post(this.postonlinexamURL, body)
  }


}
