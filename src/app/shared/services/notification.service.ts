import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends BaseHttp {

  getnotificationcategoryURL = "webSite/getAll?operation=noticationCategory"
  postnotificationURL = "webSite/notifcation?operation=add"
  getnotificationURL = "webSite/getAll?operation=notication"

  updatenotificationURL = "webSite/notifcation?operation=save"

  deletenotificationURL = "webSite/notifcation?operation=delete"


  getnotificationcategory() {
    return this.get(this.getnotificationcategoryURL)
  }
  getnotification() {
    return this.get(this.getnotificationURL)
  }
  postnotification(body: any) {
    return this.post(this.postnotificationURL, body)
  }

  updatenotification(body: any) {
    return this.post(this.updatenotificationURL, body)
  }
  deletenotification(body: any) {
    return this.post(this.deletenotificationURL, body)
  }
}
