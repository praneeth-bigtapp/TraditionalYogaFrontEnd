import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class SubModuleService extends BaseHttp {
  getSubMenus: string = 'getAll?operation=subMenus';
  addSubMenuUrl: string = 'subMenu?operation=add';
  saveSubMenuUrl: string = 'subMenu?operation=save';
  deleteSubMenuUrl: string = 'subMenu?operation=delete';
  
  getSubMenuList() {
    return this.get<any>(this.getSubMenus);
  }
}
