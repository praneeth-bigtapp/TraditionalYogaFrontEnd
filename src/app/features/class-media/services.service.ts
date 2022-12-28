import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService extends BaseHttp {
  getAllMediaURL = "libary/getAllLibary?operation=liveclass";

  getAllcoursesURL = 'courseList/getAll?operation=coursesList'

  getcategoryURL = "libary/getAllLibary?operation=categoryLibary"
  getsubcategoryURL = "libary/getAllLibary?operation=subCategory"

  getcoursemediacategoryURL = "course/getAll?operation=courseMediaCategory"


  deleteclassmediaURL = "libary/liveClass?operation=delete"
  addclassmediaURL='libary/liveClass?operation=add'
  updateclassmediaURL='libary/liveClass?operation=update'


  getlanguageURL='libary/language?operation=add'
  languageURL='libary/getAllLibary?operation=language'

  

  getshortvideoURL = "libary/getAllLibary?operation=shortVideo"
  addshortvideoURL = "libary/shortVideo?operation=add"
  updateshortvideoURL = "libary/shortVideo?operation=update"
  deleteshortvideoURL = "libary/shortVideo?operation=delete"

  getglimpseURL = "libary/getAllLibary?operation=glimpses"
  postglimpseURL = "libary/glimpses?operation=add"
  updateglimpseURL = "libary/glimpses?operation=update"
  deleteglimpseURL = "libary/glimpses?operation=delete"

  postaddlanguages(data: any) {
    return this.post<any>(this.getlanguageURL, data);
  }

  getcoursemediacategory(){
    return this.get(this.getcoursemediacategoryURL)
  }

  getlanguages(){
    return this.get(this.languageURL)
  }
  getcategory() {
    return this.get(this.getcategoryURL)
  }

  getsubcategory() {
    return this.get(this.getsubcategoryURL)
  }
  getcoursesdetails() {
    return this.get(this.getAllcoursesURL)
  }
  getALLMediadetails() {
    return this.get(this.getAllMediaURL)
  }
 postaddmedia(data: any) {
    return this.post<any>(this.addclassmediaURL, data);
  }
  postupdatemedia(data: any) {
    return this.post<any>(this.updateclassmediaURL, data);
  }
  postdeletemedia(data: any) {
    return this.post<any>(this.deleteclassmediaURL, data);
  }

  getALLshortvideos() {
    return this.get(this.getshortvideoURL)
  }
  postaddshortvideo(data: any) {
    return this.post<any>(this.addshortvideoURL, data);
  }
  postupdateshortvideo(data: any) {
    return this.post<any>(this.updateshortvideoURL, data);
  }
  postdeleteshortvideo(data: any) {
    return this.post<any>(this.deleteshortvideoURL, data);
  }

  getALLGlimps() {
    return this.get(this.getglimpseURL)
  }
  postaddGlimps(data: any) {
    return this.post<any>(this.postglimpseURL, data);
  }
  postupdateGlimps(data: any) {
    return this.post<any>(this.updateglimpseURL, data);
  }
  postdeleteGlimps(data: any) {
    return this.post<any>(this.deleteglimpseURL, data);
  }
}