import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService extends BaseHttp {

  getCountryUrl = "register/getAll?operation=country"
  getIndiaStatesUrl = "webSite/getAll?operation=states"
  getAboutUsUrl = "register/getAll?operation=aboutus"
  getQualificationUrl = "student/getAll?operation=qualification"
  getProfessionsUrl = "student/getAll?operation=professions"
  getMaritalStatusUrl = "register/getAll?operation=maritalStatus"
  getGenderUrl = "register/getAll?operation=gender"
  postEnrollmentUrl = "register/enroll"
  postDetailsEnrollmentUrl = "register/enrollDetailed"
  postVerifyEmailUrl = "register/verifyEmail"
  postOtpUrl = "register/opt"

  languageURL='libary/getAllLibary?operation=language'

  getLanguages() {
    return this.get(this.languageURL)
  }
  getGender() {
    return this.getRole(this.getGenderUrl);
  }

  getQualification() {
    return this.getRole(this.getQualificationUrl);
  }
  getlanguages(){
    return this.get(this.languageURL)
  }
  getProfessions() {
    return this.getRole(this.getProfessionsUrl);
  }

  getMaritalStatus() {
    return this.getRole(this.getMaritalStatusUrl);
  }

  getCountry() {
    return this.getRole(this.getCountryUrl);
  }

  getIndiaStates() {
    return this.getRole(this.getIndiaStatesUrl);
  }

  getAboutUs() {
    return this.getRole(this.getAboutUsUrl);
  }

  postEnrollment(body: any) {
    return this.login(this.postEnrollmentUrl, body);
  }

  postDetailsEnrollment(body: any) {
    return this.post(this.postDetailsEnrollmentUrl, body);
  }

  postVerifyEmail(body: any) {
    return this.login(this.postVerifyEmailUrl, body);
  }

  postOtp(body: any) {
    return this.login(this.postOtpUrl, body);
  }

}
