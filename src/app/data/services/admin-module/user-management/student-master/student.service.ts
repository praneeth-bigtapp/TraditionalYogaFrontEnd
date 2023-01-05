import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends BaseHttp {
  getStudentUrl = "student/getAll?operation=student";
  getCourseUrl = 'courseList/getAll?operation=coursesList';
  getStudentByIdUrl = "student/profile";
  getDonationByIdUrl = "student/donation";
  getPurchaseByIdUrl = "student/purchase";
  addPurchaseByIdUrl = "student/purchase/add";
  getVolunteerByIdUrl = "student/volunteer";
  addVolunteerByIdUrl = "student/volunteer/add";
  getCourseProfileByIdUrl = "student/courseProfile";
  getAlldonationsURL = "student/getAll?operation=donation";
  getCatogeriesURL='student/getAll?operation=VolunteerCategory'
  poststudentstatusURL='student/updateStatus'
  getALlstatusstudentURL='student/getAll?operation=studentStatus'
  

  getdonations(){
    return this.get<any>(this.getAlldonationsURL);

  }
  getcatogeries(){
    return this.get<any>(this.getCatogeriesURL);

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
  poststudentstatusById(data: any) {
    return this.post<any>(this.poststudentstatusURL, data);
  }
  getALLstudentstatus(){
    return this.get<any>(this.getALlstatusstudentURL);

  }
}
