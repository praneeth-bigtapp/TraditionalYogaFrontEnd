import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class AudioService extends BaseHttp {
  getcourseURL="courseList/getAll?operation=coursesList"
  getcourse() {
    return this.get(this.getcourseURL)
  }


}
