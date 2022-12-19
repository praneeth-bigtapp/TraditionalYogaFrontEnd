import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class AudioService extends BaseHttp {
  getcourseURL="courseList/getAll?operation=coursesList";
  getcategory="course/getAll?operation=audio";

    postaudioURL="course/audio?operation=add";

  getcourse() {
    return this.get(this.getcourseURL)
  }
getaudio(){

return this.get(this.getcategory)
}
audiopost(body:any){
  return this.post<any>(this.postaudioURL, body)

}

}
