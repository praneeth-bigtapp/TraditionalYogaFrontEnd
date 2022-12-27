import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService extends BaseHttp {

  getcountryURL = "webSite/getAll?operation=country"
  getindiastatesURL = ""

  getaboutusURL = "register/getAll?operation=aboutus"
  getqualificationURL = "student/getAll?operation=qualification"
  genderURL = "student/getAll?operation=gender"


  postenrollmentURL = ""
  postdetailsenrollmentURL = ""



  getgender() {
    return this.get(this.genderURL)
  }
  getqualification() {
    return this.get(this.getqualificationURL)
  }
  getcountry() {
    return this.get(this.getcountryURL)
  }
  getindiastates() {
    return this.get(this.getindiastatesURL)
  }

  getaboutus() {
    return this.get(this.getaboutusURL)
  }

  postenrollment(body: any) {
    return this.post(this.postenrollmentURL, body)
  }
  postdetailsenrollment(body: any) {
    return this.post(this.postdetailsenrollmentURL, body)
  }
}
