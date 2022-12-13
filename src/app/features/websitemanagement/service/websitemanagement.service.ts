import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class WebsitemanagementService extends BaseHttp {


  postpearlofwisdomURL = "webSite/wisdom?operation=add"

  getpearlofwisdomURL = "webSite/getAll?operation=wisdom"


  getpearlofwisdom() {
    return this.get(this.getpearlofwisdomURL)
  }

  postpearlofwisdom(body: any) {
    return this.post(this.postpearlofwisdomURL, body)
  }

}
