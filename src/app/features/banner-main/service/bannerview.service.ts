import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class BannerviewService extends BaseHttp {

  getbannerURL = "webSite/getAll?operation=banner"
  // postBanner


  getbanner() {
    return this.get(this.getbannerURL)
  }
}
