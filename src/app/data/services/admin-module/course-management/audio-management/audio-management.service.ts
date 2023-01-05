import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class AudioService extends BaseHttp {
  getcourseURL="courseList/getAll?operation=coursesList";
  // getcategory="course/getAll?operation=audio";
  getAudioType="course/getAll?operation=audio-type";

    postaudioURL="course/audio?operation=add";
    deleteaudio="course/audio?operation=delete";
    getcategory="course/getAll?operation=audio-category"
    getallAudio="course/getAll?operation=audio";
    updateAudio="course/audio?operation=save";


  getcourse() {
    return this.get(this.getcourseURL)
  }
getaudio(){

return this.get(this.getAudioType)
}
getAllAudio(){
  
return this.get(this.getallAudio)

}
updateaudio(body:any){
  return this.post<any>(this.updateAudio, body)
}
getCategory(){
  return this.get(this.getcategory)

}
audiopost(body:any){
  return this.post<any>(this.postaudioURL, body)

}
delete(body:any){
  return this.post<any>(this.deleteaudio, body)

}

}