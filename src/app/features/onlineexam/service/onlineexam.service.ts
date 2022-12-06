import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class OnlineexamService extends BaseHttp {

  getallcourseURL = "courseList/getAll?operation=coursesList"

  getleveloftestURL = "courseList/getAll?operation=leveloftest"

  gettypeoftestURL = "courseList/getAll?operation=typeoftest"

  postonlinexamURL = "courseList/onlineexam?operation=add"

  getallcourses() {
    return this.get(this.getallcourseURL)
  }
  gettypeoftest() {
    return this.get(this.gettypeoftestURL)
  }

  getleveloftest() {
    return this.get(this.getleveloftestURL)
  }

  postonlineexam(body: any) {
    return this.post(this.postonlinexamURL, body)
  }


}
