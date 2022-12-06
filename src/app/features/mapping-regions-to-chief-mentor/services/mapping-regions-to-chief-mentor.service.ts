import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class MappingRegionsToChiefMentorService extends BaseHttp {


  getAllcoursesURL = "courseList/getAll?operation=coursesList";
  postURL = 'student/donationView'


  getcoursesdetails() {
    return this.get(this.getAllcoursesURL)
  }
  // postdonationdetails(data: any) {
  //   return this.post(this.postURL, data)
  // }
}
