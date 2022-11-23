import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class BanneraddService extends BaseHttp {

  headerbannerURL = ""
  coursebannerURL = ""


  postheaderbanner(body: any) {
    console.log(body);

    return this.post(this.headerbannerURL, body)
  }
  postcoursebanner(body: any) {
    console.log(body);

    return this.post(this.headerbannerURL, body)
  }
}
