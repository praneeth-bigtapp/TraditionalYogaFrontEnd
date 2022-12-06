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

  gettaskURL = "courseList/getAll?operation=task"

  posttaskURL = "course/task?operation=add"

  getallcourses() {
    return this.get(this.getallcourseURL)
  }
  gettypeoftest() {
    return this.get(this.gettypeoftestURL)
  }

  getleveloftest() {
    return this.get(this.getleveloftestURL)
  }

  gettask() {
    return this.get(this.gettaskURL)
  }

  postonlineexam(body: any) {
    return this.post(this.postonlinexamURL, body)
  }


  posttask(body: any) {
    return this.post(this.posttaskURL, body)
  }


}
