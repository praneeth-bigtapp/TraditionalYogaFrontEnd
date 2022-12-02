import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService extends BaseHttp{
  getAllMediaURL = "course/getAll?operation=classMedia";

  getAllcategoryURL = 'course/getAll?operation=courseMediaCategory'


  getMediadetails() {
    return this.get(this.getAllMediaURL)
  }
  getCategorydetails() {
    return this.get(this.getAllcategoryURL)
  }
}
