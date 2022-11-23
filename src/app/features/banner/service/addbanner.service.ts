import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class AddbannerService extends BaseHttp {

  addheaderbannerURL = ""
  addcoursebannerURL = ""

  postheaderbanner(data: any) {

    console.log(data);

    const body = {

    }
    return this.post(this.addheaderbannerURL, body)
  }

  postcoursebanner(data: any) {

    console.log(data);

    const body = {

    }
    return this.post(this.addcoursebannerURL, body)
  }


}
