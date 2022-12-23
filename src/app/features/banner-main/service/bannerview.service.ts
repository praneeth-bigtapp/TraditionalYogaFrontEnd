import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class BannerviewService extends BaseHttp {

  getbannerURL = "webSite/getAll?operation=banner";
  addbanner="webSite/banner?operation=add";
  // postBanner
  deletebanner="webSite/banner?operation=delete";
  update="webSite/banner?operation=save"


  getbanner() {
    return this.get(this.getbannerURL)
  }
  postbanner(body:any){
    return this.post<any>(this.addbanner, body)
  
  }
  deletebanners(body:any){
    return this.post<any>(this.deletebanner, body)
  
  }
  updatebanner(body:any){
    return this.post<any>(this.update, body)
  }
}