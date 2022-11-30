import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends BaseHttp {


  postnotificationURL = ""

  postnotification(body: any) {
    return this.post(this.postnotificationURL, body)
  }

}
