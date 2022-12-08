import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService extends BaseHttp {
 
  // getURL = 'student/getAll?operation=course';

 

  getAllcoursesURL = 'courseList/getAll?operation=coursesList'

  getcoursemediaURL = "course/getAll?operation=courseMediaPractice"

  postcoursemediaURL = "course/addCourseMediaPractice"

  getALLmediatypeURL='courseList/getAll?operation=mediaType'

  getALLcategorymaterialsURL='courseList/getAll?operation=materialCategory'

  getAllcoursematerialURL='courseList/getAll?operation=coursematerial'

  getcoursematerials(){
    return this.get<any>(this.getAllcoursematerialURL);

  }

  getmediatype(){
    return this.get<any>(this.getALLmediatypeURL);

  }
  getcategorymaterial(){
    return this.get<any>(this.getALLcategorymaterialsURL);

  }

  getCourse() {

    return this.get<any>(this.getAllcoursesURL);

  }
  getcoursemedia() {

    return this.get<any>(this.getcoursemediaURL);

  }
  postcoursemedia(body: any) {
    return this.post(this.postcoursemediaURL, body)
  }
}
