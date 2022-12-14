import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class CreatepraticelibraryService extends BaseHttp {

  postrecordsessionURL = "libary/praticeLibary?operation=recordsession"
  postshortvideoURL = "libary/praticeLibary?operation=shortvideo"
  postglimpseURL = "libary/praticeLibary?operation=glimpses"
  getcategoryURL = "libary/getAllLibary?operation=categorylibary"
  praticelistURl = "libary/getAllLibary?operation=praticelibary"

  deletepraticeURL = ""
  updatepraticeURL = ""

  getpraticelibrary() {
    return this.get(this.praticelistURl)
  }
  getcategory() {
    return this.get(this.getcategoryURL)
  }
  postpraticelibrary(body: any, type: any) {
    if (type === 1)
      return this.post(this.postrecordsessionURL, body)
    if (type === 3)
      return this.post(this.postglimpseURL, body)
    if (type === 4)
      return this.post(this.postshortvideoURL, body)

    return
  }

  deletelibrary(body: any) {
    return this.post(this.deletepraticeURL, body)
  }
  updatelibrary(body: any) {
    return this.post(this.updatepraticeURL, body)
  }
}
