import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class CreatepraticelibraryService extends BaseHttp {

  // postrecordsessionURL = "libary/praticeLibary?operation=recordsession"
  // postshortvideoURL = "libary/praticeLibary?operation=shortvideo"
  // postglimpseURL = "libary/praticeLibary?operation=glimpses"
  getcategoryURL = "libary/getAllLibary?operation=categorylibary"
  praticelistURl = "libary/getAllLibary?operation=praticelibary"

  postrecordsessionURL = "libary/praticeLibary?operation=add&type=recordSession"
  updaterecordessionURL = "libary/praticeLibary?operation=save&type=recordSession"
  deleterecordessionURL = ""

  postshortvideoURL = "libary/praticeLibary?operation=add&type=shortVideo"
  updateshortvideoURL = "libary/praticeLibary?operation=save&type=shortVideo"
  deleteshortvideoURL = ""

  postglimpseURL = "libary/praticeLibary?operation=add&type=glimpses"
  updateglimpseURL = "libary/praticeLibary?operation=save&type=glimpses"
  deleteglimpseURL = ""

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

  updatepraticelibrary(body: any, type: any) {
    if (type === 1)
      return this.post(this.updaterecordessionURL, body)
    if (type === 3)
      return this.post(this.updateglimpseURL, body)
    if (type === 4)
      return this.post(this.updateshortvideoURL, body)

    return
  }

  deletepraticelibrary(body: any, type: any) {
    if (type === 1)
      return this.post(this.deleterecordessionURL, body)
    if (type === 3)
      return this.post(this.deleteglimpseURL, body)
    if (type === 4)
      return this.post(this.deleteshortvideoURL, body)

    return
  }

  // deletelibrary(body: any) {
  //   return this.post(this.deletepraticeURL, body)
  // }
  // updatelibrary(body: any) {
  //   return this.post(this.updatepraticeURL, body)
  // }
}
