import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class TestimonialsService extends BaseHttp{
  getTestmonial = "courseList/getAll?operation=testimonal";
  postTestimonial="courseList/testimonal?operation=add";
  updateTestimonial="courseList/testimonal?operation=update";
  deleteURL="courseList/testimonal?operation=delete";
  active="courseList/testimonal?operation=active";
  deactivate="courseList/testimonal?operation=deactive"


  getTestimonial() {
    return this.get(this.getTestmonial)
  }
  posttestimonial(body: any) {
    return this.post<any>(this.postTestimonial, body)
  }
  updatetest(body: any){
    return this.post<any>(this. updateTestimonial, body)

  }
  deleteTestimonial(body: any){
    return this.post<any>(this.deleteURL, body)

  }
  postavtive(body: any){
    return this.post<any>(this.active, body)

  }
  postdeactivate(body: any){
    return this.post<any>(this.deactivate, body)

  }

 
}
