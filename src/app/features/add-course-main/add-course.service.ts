import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class AddCourseService extends BaseHttp {
  getURL='student/getAll?operation=course';

  getCategory(){

    return this.get<any>(this.getURL);
 
   }
 
}


