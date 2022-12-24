import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService extends BaseHttp {

  getcountryURL = "webSite/getAll?operation=country"

  getaboutusURL = "register/getAll?operation=aboutus"

  postenrollmentURL = ""
  genderURL = "student/getAll?operation=gender"

  getgender() {
    return this.get(this.genderURL)
  }
  getcountry() {
    return this.get(this.getcountryURL)
  }
  getaboutus() {
    return this.get(this.getaboutusURL)
  }

  postenrollment(body: any) {
    return this.post(this.postenrollmentURL, body)
  }
}
