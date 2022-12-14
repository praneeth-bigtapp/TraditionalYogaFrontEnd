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

  updateonlineexamURL = ""

  deleteonlineexamURL = ""

  gettaskURL = "courseList/getAll?operation=task"

  posttaskURL = "courseList/task?operation=add"

  updatetaskURL = ""

  deletetaskURL = ""

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

  updateonlineexam(body: any) {
    return this.post(this.updateonlineexamURL, body)
  }

  deleteonlineexam(body: any) {
    return this.post(this.deleteonlineexamURL, body)
  }


  posttask(body: any) {
    return this.post(this.posttaskURL, body)
  }

  updatetask(body: any) {
    return this.post(this.updatetaskURL, body)
  }

  deletetask(body: any) {
    return this.post(this.deletetaskURL, body)
  }


}
