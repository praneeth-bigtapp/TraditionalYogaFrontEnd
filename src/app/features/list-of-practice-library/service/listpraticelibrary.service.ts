import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class ListpraticelibraryService extends BaseHttp {

  praticelistURl = "libary/getAllLibary?operation=praticelibary"

  getpraticelibrary() {
    return this.get(this.praticelistURl)
  }
}
