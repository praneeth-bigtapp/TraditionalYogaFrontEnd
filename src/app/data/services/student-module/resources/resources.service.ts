import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService extends BaseHttp {

  getAudioCategoryURL = "course/getAll?operation=audio-category"
  getPracticeLibraryURL = "libary/getAllLibary?operation=categoryLibary"
  getDharanasCategoryURL = "libary/getAllLibary?operation=subCategory"

  getAudioCategory() {
    return this.get(this.getAudioCategoryURL)
  }
  getPracticeLibrary() {
    return this.get(this.getPracticeLibraryURL)
  }
  getDharanasCategory() {
    return this.get(this.getDharanasCategoryURL)
  }

}
