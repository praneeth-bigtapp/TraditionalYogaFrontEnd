import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DashboardService  extends BaseHttp{
  getcourseURL="courseList/getAll?operation=coursesList";
  getcourse() {
    return this.get(this.getcourseURL)
  }

  // constructor() { }
}
