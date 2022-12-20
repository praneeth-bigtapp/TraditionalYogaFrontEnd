import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class WebsitemanagementService extends BaseHttp {


  postpearlofwisdomURL = "webSite/wisdom?operation=add"

  getpearlofwisdomURL = "webSite/getAll?operation=wisdom"

  deletepearlofwisdomURL = "webSite/wisdom?operation=delete"

  updatepearlofwisdomURL = "webSite/wisdom?operation=update"

  activepearlofwisdomURL = "/webSite/wisdom?operation=active"
  deactivepearlofwisdomURL = "/webSite/wisdom?operation=deactive"


  getpearlofwisdom() {
    return this.get(this.getpearlofwisdomURL)
  }

  postpearlofwisdom(body: any) {
    return this.post(this.postpearlofwisdomURL, body)
  }

  deletepearlofwisdom(body: any) {
    return this.post(this.deletepearlofwisdomURL, body)
  }

  updatepearlofwisdom(body: any) {
    return this.post(this.updatepearlofwisdomURL, body)
  }

  activepearlofwisdom(body: any) {
    return this.post(this.activepearlofwisdomURL, body)
  }
  deactivepearlofwisdom(body: any) {
    return this.post(this.deactivepearlofwisdomURL, body)
  }


}
