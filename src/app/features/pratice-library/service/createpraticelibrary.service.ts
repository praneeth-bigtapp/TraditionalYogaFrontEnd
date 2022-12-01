import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class CreatepraticelibraryService extends BaseHttp {

  postrecordsessionURL = "libary/praticeLibary?operation=recordsession"

  postshortvideoURL = "libary/praticeLibary?operation=shortvideo"

  postglimpseURL = "libary/praticeLibary?operation=glimpses"

  postliveclassURL = ""

  getcategoryURL = "libary/getAllLibary?operation=categorylibary"


  getcategory() {
    return this.get(this.getcategoryURL)
  }

  postpraticelibrary(body: any, type: any) {
    let postURL = ""


    if (type === 1)
      postURL = this.postrecordsessionURL

    if (type === 2)
      postURL = this.postliveclassURL

    if (type === 3)
      postURL = this.postglimpseURL

    if (type === 4)
      postURL = this.postshortvideoURL


    console.log(postURL);

    return this.post(postURL, body)
  }
}
