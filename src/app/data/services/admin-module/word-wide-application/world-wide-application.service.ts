import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class WorldWideApplicationService extends BaseHttp {

  getStudentUrl = ""
  searchUsersUrl = ""
  changeMentorUrl = "student/worldWide?change=mentor"
  changeChiefMentorUrl = "student/worldWide?change=chiefMentor"
  getExemptedStudentUrl = ''
  manageExemptionStudentUrl = "student/manageException"
  manageExemptionCourseUrl = ""
  activeStudentUrl = ""
  deactiveStudentUrl = ""

  mentorListUrl = ""
  chiefMentorListUrl = ""
  userStatusListUrl = ""

  getmanageExemptionCourseUrl = ""

  getMentorList() {
    return this.get(this.mentorListUrl)
  }

  getChiefMentorList() {
    return this.get(this.chiefMentorListUrl)
  }

  userStatusList() {
    return this.get(this.userStatusListUrl)
  }

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

  getmanageExemptionCourse(body: any) {
    return this.post(this.getmanageExemptionCourseUrl, body)
  }

  activeStudent(body: any) {
    return this.post(this.activeStudentUrl, body)
  }
  deactiveStudent(body: any) {
    return this.post(this.deactiveStudentUrl, body)
  }

}

