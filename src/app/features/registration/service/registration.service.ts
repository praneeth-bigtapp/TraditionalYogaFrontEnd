import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService extends BaseHttp {

  getcountryURL = "webSite/getAll?operation=country"

  postenrollmentURL = ""
  genderURL = "/student/getAll?operation=gender"

  getgender() {
    return this.get(this.genderURL)
  }
  getcountry() {
    return this.get(this.getcountryURL)
  }

  postenrollment(body: any) {
    return this.post(this.postenrollmentURL, body)
  }
}