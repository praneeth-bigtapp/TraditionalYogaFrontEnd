import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService extends BaseHttp {

  alertgetURL = "alert/getAll?operation=alert"

  getAllAlerts() {
    return this.get<any>(this.alertgetURL)
  }


}
