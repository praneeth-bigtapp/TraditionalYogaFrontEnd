import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class CreatepraticelibraryService extends BaseHttp {

  // postrecordsessionURL = "libary/praticeLibary?operation=recordsession"
  // postshortvideoURL = "libary/praticeLibary?operation=shortvideo"
  // postglimpseURL = "libary/praticeLibary?operation=glimpses"
  getcategoryURL = "libary/getAllLibary?operation=categoryLibary"
  getsubcategoryURL = "libary/getAllLibary?operation=subCategory"

  praticelistURl = "libary/getAllLibary?operation=praticeLibary"

  postLibraryUrl = "libary/praticeLibary?type=praticeLibary&operation=add"
  updateLibraryUrl = "libary/praticeLibary?type=praticeLibary&operation=save"
  deleteLibraryUrl = "libary/praticeLibary?type=praticeLibary&operation=delete"

  // postrecordsessionURL = "libary/praticeLibary?operation=add&type=recordSession"
  // updaterecordessionURL = "libary/praticeLibary?operation=save&type=recordSession"
  // deleterecordessionURL = "libary/praticeLibary?operation=delete&type=recordSession"

  // postshortvideoURL = "libary/praticeLibary?operation=add&type=shortVideo"
  // updateshortvideoURL = "libary/praticeLibary?operation=save&type=shortVideo"
  // deleteshortvideoURL = "libary/praticeLibary?operation=delete&type=shortVideo"

  // postglimpseURL = "libary/praticeLibary?operation=add&type=glimpses"
  // updateglimpseURL = "libary/praticeLibary?operation=save&type=glimpses"
  // deleteglimpseURL = "libary/praticeLibary?operation=delete&type=glimpses"

  getpraticelibrary() {
    return this.get(this.praticelistURl)
  }
  getcategory() {
    return this.get(this.getcategoryURL)
  }

  getsubcategory() {
    return this.get(this.getsubcategoryURL)
  }

  postLibrary(body: any) {
    return this.post(this.postLibraryUrl, body)
  }

  updateLibrary(body: any) {
    return this.post(this.updateLibraryUrl, body)
  }
  deleteLibrary(body: any) {
    return this.post(this.deleteLibraryUrl, body)
  }
  // postpraticelibrary(body: any, type: any) {
  //   if (type === 1)
  //     return this.post(this.postrecordsessionURL, body)
  //   if (type === 3)
  //     return this.post(this.postglimpseURL, body)
  //   if (type === 4)
  //     return this.post(this.postshortvideoURL, body)

  //   return
  // }

  // updatepraticelibrary(body: any, type: any) {
  //   if (type === 1)
  //     return this.post(this.updaterecordessionURL, body)
  //   if (type === 3)
  //     return this.post(this.updateglimpseURL, body)
  //   if (type === 4)
  //     return this.post(this.updateshortvideoURL, body)

  //   return
  // }

  // deletepraticelibrary(body: any, type: any) {
  //   if (type === 1)
  //     return this.post(this.deleterecordessionURL, body)
  //   if (type === 3)
  //     return this.post(this.deleteglimpseURL, body)
  //   if (type === 4)
  //     return this.post(this.deleteshortvideoURL, body)

  //   return
  // }

 
}
