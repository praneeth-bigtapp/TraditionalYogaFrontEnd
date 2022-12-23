import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class MappingRegionsToChiefMentorService extends BaseHttp {


  getAllcoursesURL = "courseList/getAll?operation=coursesList";

  postregionURL = 'webSite/region?operation=add'

  getregionURL = "webSite/getAll?operation=regionsList"

  getcheifmentorURL = 'student/getAllByCourse?type=chiefMentor&courseId=1'

  updateregionURL = "webSite/region?operation=update"

  deleteregionURL = "webSite/region?operation=delete"

  getcountryURL = "webSite/getAll?operation=country"
  getallregionURL = "webSite/getAll?operation=region"

  getCheifmentorAll() {
    return this.get(this.getcheifmentorURL)
  }

  getcountry() {
    return this.get(this.getcountryURL)
  }
  getcoursesdetails() {
    return this.get(this.getAllcoursesURL)
  }
  getallregion() {
    return this.get(this.getallregionURL)
  }
  getregion() {
    return this.get(this.getregionURL)
  }
  postregion(data: any) {
    return this.post(this.postregionURL, data)
  }

  updateregion(data: any) {
    return this.post(this.updateregionURL, data)
  }
  deleteregion(data: any) {
    return this.post(this.deleteregionURL, data)
  }
}
