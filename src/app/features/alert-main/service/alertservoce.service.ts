import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService extends BaseHttp {

  alertgetURL = "webSite/getAll?operation=alert"

  getrolebyID = "rolePermissions?roleId="
  getroles = "getAll?operation=roles"

  alertpostURL = 'webSite/alerts?operation=add'

  updatealertURL=""

  deletealertURL=""

  getAllAlerts() {
    return this.get<any>(this.alertgetURL)
  }
  getRoles() {
    return this.get<any>(this.getroles)
  }

  setalert(body: any) {
    return this.post<any>(this.alertpostURL, body)
  }

  updatealert(body:any)
  {
    return this.post<any>(this.updatealertURL, body)
  }

  deletealert(body:any)
  {
    return this.post<any>(this.deletealertURL, body)
  }


}
