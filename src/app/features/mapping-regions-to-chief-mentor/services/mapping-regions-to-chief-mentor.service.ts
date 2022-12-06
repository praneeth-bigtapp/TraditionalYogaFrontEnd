import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class MappingRegionsToChiefMentorService extends BaseHttp {


  getAllcoursesURL = "courseList/getAll?operation=coursesList";
  postURL = 'student/donationView'

  getregionURL="webSite/getAll?operation=region"

  getcoursesdetails() {
    return this.get(this.getAllcoursesURL)
  }
  getregion() {
    return this.get(this.getregionURL)
  }
  // postdonationdetails(data: any) {
  //   return this.post(this.postURL, data)
  // }
}
