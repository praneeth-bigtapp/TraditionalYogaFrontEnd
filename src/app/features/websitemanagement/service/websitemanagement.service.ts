import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class WebsitemanagementService extends BaseHttp {


  postpearlofwisdomURL = ""


  postpearlofwisdom(body: any) {
    return this.post(this.postpearlofwisdomURL, body)
  }

}
