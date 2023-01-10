import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class MapuserService extends BaseHttp {
  mapcourse = 'courseList/mapCourses?operation=add';
  getcourseURL="courseList/getAll?operation=coursesList";
  getusers='register/getAll?operation=registerStudent';
  postadcourse(body: any) {
    return this.post<any>(this.mapcourse, body)
  }
  getcourse() {
    return this.get(this.getcourseURL)
  }
  getuser() {
    return this.get(this.getusers)
  }


}