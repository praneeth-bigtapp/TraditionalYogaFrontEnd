import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class MappingRegionsToChiefMentorService extends BaseHttp {


  getAllcoursesURL = "courseList/getAll?operation=coursesList";
  postregionURL = 'webSite/region?operation=add'

  getregionURL = "webSite/getAll?operation=region"

  getcheifmentorURL = 'student/getAllByCourse?type=chiefMentor&courseId=1'

  updateregionURL = ""

  deleteregionURL = ""

  getCheifmentorAll() {
    return this.get(this.getcheifmentorURL)
  }

  getcoursesdetails() {
    return this.get(this.getAllcoursesURL)
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
