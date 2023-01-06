import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class ParametersService extends BaseHttp {

  getallcourseURL = "courseList/getAll?operation=coursesList"

  saveParameters = "course/performance/updateRating?section="
  getInputparameters = "course/performance/data?courseId="

  getallcourses() {
    return this.get(this.getallcourseURL);
  }

  saveParamters(body: any, section: any) {
    return this.post(this.saveParameters + section, body);
  }

  getInput(id: any) {
    return this.get(this.getInputparameters + id);
  }
}
