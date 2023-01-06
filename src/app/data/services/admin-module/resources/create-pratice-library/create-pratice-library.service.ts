import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class CreatepraticelibraryService extends BaseHttp {

  getcategoryURL = "libary/getAllLibary?operation=categoryLibary"
  getsubcategoryURL = "libary/getAllLibary?operation=subCategory"

  praticelistURl = "libary/getAllLibary?operation=praticeLibary"

  postLibraryUrl = "libary/praticeLibary?type=praticeLibary&operation=add"
  updateLibraryUrl = "libary/praticeLibary?type=praticeLibary&operation=save"
  deleteLibraryUrl = "libary/praticeLibary?type=praticeLibary&operation=delete"



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
  

 



 
}
