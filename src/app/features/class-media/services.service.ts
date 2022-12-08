import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService extends BaseHttp{
  getAllMediaURL = "course/getAll?operation=classMedia";

  getAllcoursesURL = 'courseList/getAll?operation=coursesList'


  getMediadetails() {
    return this.get(this.getAllMediaURL)
  }
  getcoursesdetails() {
    return this.get(this.getAllcoursesURL)
  }
}
