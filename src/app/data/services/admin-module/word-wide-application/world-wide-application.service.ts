import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class WorldWideApplicationService extends BaseHttp {

  getStudentUrl = ""

  getStudent() {
    return this.get(this.getStudentUrl)
  }
}

