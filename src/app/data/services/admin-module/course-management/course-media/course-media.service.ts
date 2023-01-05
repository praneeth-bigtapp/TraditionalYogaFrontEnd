import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseMediaService extends BaseHttp {

  // getURL = 'student/getAll?operation=course';



  getAllcoursesURL = 'courseList/getAll?operation=coursesList'

  getcoursemediaURL = 'courseList/getAll?operation=praticeMedia'
  postcoursemedaiAddURL = 'courseList/praticeMedia?operation=add'
  postcoursemediaSaveURL = 'courseList/praticeMedia?operation=save'
  postcoursemediaDeleteURL = 'courseList/praticeMedia?operation=delete'


  getcourseImageURL = 'courseList/getAll?operation=praticeImageMedia'
  postcourseImageAddURL = 'courseList/praticeImageMedia?operation=add'
  postcourseImageSaveURL = 'courseList/praticeImageMedia?operation=save'
  postcourseImageDeleteURL = 'courseList/praticeImageMedia?operation=delete'

  getcoursedocURL = 'courseList/getAll?operation=praticeDocumentMedia'
  postcoursedocAddURL = 'courseList/praticedocumentMedia?operation=add'
  postcoursedocSaveURL = 'courseList/praticedocumentMedia?operation=save'
  postcoursedocDeleteURL = 'courseList/praticedocumentMedia?operation=delete'

  postcoursemediaURL = "course/addCourseMediaPractice"

  getALLmediatypeURL = 'courseList/getAll?operation=mediaType'

  getALLcategorymaterialsURL = 'courseList/getAll?operation=materialCategory'

  getAllcoursematerialURL = 'courseList/getAll?operation=coursematerial'

  getcoursematerials() {
    return this.get<any>(this.getAllcoursematerialURL);

  }

  getmediatype() {
    return this.get<any>(this.getALLmediatypeURL);

  }
  getcategorymaterial() {
    return this.get<any>(this.getALLcategorymaterialsURL);

  }

  getCourse() {

    return this.get<any>(this.getAllcoursesURL);

  }

  postcoursemedia(body: any) {
    return this.post(this.postcoursemediaURL, body)
  }
  getcoursemedia() {
    return this.get<any>(this.getcoursemediaURL);
  }
  postcoursemediaAdd(body: any) {
    return this.post(this.postcoursemedaiAddURL, body)
  }
  postcoursemediasave(body: any) {
    return this.post(this.postcoursemediaSaveURL, body)
  }
  postcoursemediadelete(body: any) {
    return this.post(this.postcoursemediaDeleteURL, body)
  }


  getcourseimage() {
    return this.get<any>(this.getcourseImageURL);
  }
  postcourseimageAdd(body: any) {
    return this.post(this.postcourseImageAddURL, body)
  }
  postcourseimagesave(body: any) {
    return this.post(this.postcourseImageSaveURL, body)
  }
  postcourseimagedelete(body: any) {
    return this.post(this.postcourseImageDeleteURL, body)
  }

  getcoursedoc() {
    return this.get<any>(this.getcoursedocURL);
  }
  postcoursedocAdd(body: any) {
    return this.post(this.postcoursedocAddURL, body)
  }
  postcoursedocsave(body: any) {
    return this.post(this.postcoursedocSaveURL, body)
  }
  postcoursedocdelete(body: any) {
    return this.post(this.postcoursedocDeleteURL, body)
  }


  // Course Media
  getCourseMaterialURL = "courseList/getAll?operation=coursematerial"
  postCourseMaterialURL = "courseList/addMaterial?operation=add"
  updateCourseMaterialURL = "courseList/addMaterial?operation=save"
  deleteCourseMaterialURL = "courseList/addMaterial?operation=delete"

  getCourseMaterial() {
    return this.get(this.getCourseMaterialURL)
  }

  postCourseMaterial(body: any) {
    return this.post(this.postCourseMaterialURL, body)
  }

  updateCourseMaterial(body: any) {
    return this.post(this.updateCourseMaterialURL, body)
  }

  deleteCourseMaterial(body: any) {
    return this.post(this.deleteCourseMaterialURL, body)
  }

}
