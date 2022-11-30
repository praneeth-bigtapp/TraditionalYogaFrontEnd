import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class ParametersService extends BaseHttp {

  getallcourseURL = "student/getAll?operation=course"

  postparameters = ""

  getallcourses() {
    return this.get(this.getallcourseURL)
  }

  postparamters(body: any) {
    return this.post(this.postparameters, body)
  }
}
