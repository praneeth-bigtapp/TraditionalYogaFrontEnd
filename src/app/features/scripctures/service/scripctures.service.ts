import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class ScripcturesService extends BaseHttp {

  postscripcturesAPI = "webSite/scripctures?operation=add"
  updatescripcturesAPI = "webSite/scripctures?operation=save"
  deletescripcturesAPI = "webSite/scripctures?operation=delete"


  postscripctures(body: any) {
    return this.post(this.postscripcturesAPI, body)
  }

  deletescripctures(body: any) {
    return this.post(this.deletescripcturesAPI, body)
  }
  updatescripctures(body: any) {
    return this.post(this.updatescripcturesAPI, body)
  }
}
