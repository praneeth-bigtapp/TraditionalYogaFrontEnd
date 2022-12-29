import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService extends BaseHttp {

  getCountryUrl = "webSite/getAll?operation=country"
  getIndiaStatesUrl = ""
  getAboutUsUrl = "register/getAll?operation=aboutus"
  getQualificationUrl = "student/getAll?operation=qualification"
  getProfessionsUrl = "student/getAll?operation=professions"
  getMaritalStatusUrl = "register/getAll?operation=maritalStatus"
  getGenderUrl = "student/getAll?operation=gender"
  postEnrollmentUrl = "register/enroll"
  postDetailsEnrollmentUrl = "register/enrollDetailed"

  getGender() {
    return this.get(this.getGenderUrl);
  }

  getQualification() {
    return this.get(this.getQualificationUrl);
  }

  getProfessions() {
    return this.get(this.getProfessionsUrl);
  }

  getMaritalStatus() {
    return this.get(this.getMaritalStatusUrl);
  }

  getCountry() {
    return this.get(this.getCountryUrl);
  }

  getIndiaStates() {
    return this.get(this.getIndiaStatesUrl);
  }

  getAboutUs() {
    return this.get(this.getAboutUsUrl);
  }

  postEnrollment(body: any) {
    return this.login(this.postEnrollmentUrl, body);
  }

  postDetailsEnrollment(body: any) {
    return this.post(this.postDetailsEnrollmentUrl, body);
  }
  
}
