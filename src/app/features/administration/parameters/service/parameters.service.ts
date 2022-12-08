import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class ParametersService extends BaseHttp {

  getallcourseURL = "courseList/getAll?operation=coursesList"

  postparameters = "course/performance/updateRating"
  getInputparameters ="course/performance/data?courseId=1"

  getallcourses() {
    return this.get(this.getallcourseURL)
  }

  postparamters(body: any) {
    return this.post(this.postparameters, body)
  }

  getInput(){
    return this.get(this. getInputparameters)
  }
}
