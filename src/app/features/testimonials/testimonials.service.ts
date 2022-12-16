import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class TestimonialsService extends BaseHttp{
  getTestmonial = "courseList/getAll?operation=testimonal";
  postTestimonial="courseList/testimonal?operation=add"


  getTestimonial() {
    return this.get(this.getTestmonial)
  }
  posttestimonial(body: any) {
    return this.post<any>(this.postTestimonial, body)
  }

 
}
