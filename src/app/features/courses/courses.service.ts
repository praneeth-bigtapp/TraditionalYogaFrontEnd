import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService extends BaseHttp {
  getURL = 'student/getAll?operation=course';

  getcoursemediaURL = "course/getAll?operation=courseMediaPractice"

  postcoursemediaURL = "course/addCourseMediaPractice"

 

  getCourse() {

    return this.get<any>(this.getURL);

  }
  getcoursemedia() {

    return this.get<any>(this.getcoursemediaURL);

  }
  postcoursemedia(body: any) {
    return this.post(this.postcoursemediaURL, body)
  }
}
