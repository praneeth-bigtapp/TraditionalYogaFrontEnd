import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class BannermainService extends BaseHttp {

  getbannersURL = "banner/getAll?operation=bannerview"

  getbanners() {
    return this.get(this.getbannersURL)
  }
}
