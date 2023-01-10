import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class WorldWideApplicationService extends BaseHttp {

  getStudentUrl = ""
  searchUsersUrl = ""
  changeMentorUrl = ""
  changeChiefMentorUrl = ""
  getExemptedStudentUrl = ''
  manageExemptionStudentUrl = ""
  manageExemptionCourseUrl = ""
  activeStudentUrl = ""
  deactiveStudentUrl = ""

  getStudent() {
    return this.get(this.getStudentUrl)
  }

  searchUsers(body: any) {
    return this.post(this.searchUsersUrl, body)
  }
  changeMentor(body: any) {
    return this.post(this.changeMentorUrl, body)
  }
  changeChiefMentor(body: any) {
    return this.post(this.changeChiefMentorUrl, body)
  }
  getExemptedStudent() {
    return this.get(this.getExemptedStudentUrl)
  }

  manageExemptionStudent(body: any) {
    return this.post(this.manageExemptionStudentUrl, body)
  }

  manageExemptionCourse(body: any) {
    return this.post(this.manageExemptionCourseUrl, body)
  }

  activeStudent(body: any) {
    return this.post(this.activeStudentUrl, body)
  }
  deactiveStudent(body: any) {
    return this.post(this.deactiveStudentUrl, body)
  }

}

