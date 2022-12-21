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
  addPurchaseByIdUrl = "student/purchase/add";
  getVolunteerByIdUrl = "student/volunteer";
  addVolunteerByIdUrl = "student/volunteer/add";
  getCourseProfileByIdUrl = "";
  getAlldonationsURL = "student/getAll?operation=donation";
  

  getdonations(){
    return this.get<any>(this. getAlldonationsURL);

  }

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

  addPurchaseById(data: any) {
    return this.post<any>(this.addPurchaseByIdUrl, data);
  }

  getVolunteerById(data: any) {
    return this.post<any>(this.getVolunteerByIdUrl, data);
  }

  addVolunteerById(data: any) {
    return this.post<any>(this.addVolunteerByIdUrl, data);
  }

  getCourseProfileById(data: any) {
    return this.post<any>(this.getCourseProfileByIdUrl, data);
  }
}
