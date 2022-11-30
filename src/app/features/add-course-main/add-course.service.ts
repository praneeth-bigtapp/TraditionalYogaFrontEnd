import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class AddCourseService extends BaseHttp {
  getURL='student/getAll?operation=course';
  getCoursePost='course/addCourse';

  getCategory(){

    return this.get<any>(this.getURL);
 
   }

  
    postadcourse(body: any) {
      return this.post<any>(this.getCoursePost, body)
    }
  
 
}


