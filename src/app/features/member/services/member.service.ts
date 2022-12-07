import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class MemberService extends BaseHttp {

  getallcourseURL = "courseList/getAll?operation=coursesList"
  getregionURL = "webSite/getAll?operation=region"

  getmembersURL = "student/getAllByCourse?type=member&courseId=1"

  getmentorURL = "student/getAllByCourse?type=mentor&courseId=1"

  getcheifmentorURL = "/student/getAllByCourse?type=chiefMentor&courseId=1"


  getallcourses() {
    return this.get(this.getallcourseURL)
  }

  getregion() {
    return this.get(this.getregionURL)
  }

  getmembers() {
    return this.get(this.getmembersURL)
  }

  getmentor() {
    return this.get(this.getmentorURL)
  }
  getcheifmentor() {
    return this.get(this.getcheifmentorURL)
  }
}
