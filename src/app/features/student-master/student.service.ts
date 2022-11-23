import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends BaseHttp {
  getStudentUrl = "student/getAll?operation=student";
  getCourseUrl = "student/getAll?operation=course";
  getStudentByIdUrl = "student/profile";
  getDonationByIdUrl = "student/donation";
  getPurchaseByIdUrl = "student/purchase";
  getVolunteerByIdUrl = "student/volunteer";
  getCourseProfileByIdUrl = "";

  getStudent() {
    return this.get<any>(this.getStudentUrl);
  }

  getCourses() {
    return this.get<any>(this.getCourseUrl);
  }

  getStudentById(data: any) {
    return this.post<any>(this.getStudentByIdUrl, data);
  }

  getDonationById(data: any) {
    return this.post<any>(this.getDonationByIdUrl, data);
  }

  getPurchaseById(data: any) {
    return this.post<any>(this.getPurchaseByIdUrl, data);
  }

  getVolunteerById(data: any) {
    return this.post<any>(this.getVolunteerByIdUrl, data);
  }

  getCourseProfileById(data: any) {
    return this.post<any>(this.getCourseProfileByIdUrl, data);
  }
}
