import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class ScripcturesService extends BaseHttp {

  postscripcturesAPI = "webSite/scripctures?operation=add"


  postscripctures(body: any) {
    return this.post(this.postscripcturesAPI, body)
  }
}
