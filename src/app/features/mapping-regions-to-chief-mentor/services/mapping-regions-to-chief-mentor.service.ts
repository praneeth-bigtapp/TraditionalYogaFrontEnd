import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class MappingRegionsToChiefMentorService extends BaseHttp {


  getAllcoursesURL = "courseList/getAll?operation=coursesList";
  postregionURL = 'webSite/region?operation=add'

  getregionURL = "webSite/getAll?operation=region"

  getcoursesdetails() {
    return this.get(this.getAllcoursesURL)
  }
  getregion() {
    return this.get(this.getregionURL)
  }
  postregion(data: any) {
    return this.post(this.postregionURL, data)
  }
}
