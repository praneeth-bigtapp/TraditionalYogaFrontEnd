import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class SubModuleService extends BaseHttp {
  getSubMenus: string = 'getAll?operation=subMenus';
  addSubMenuUrl: string = 'subMenu?operation=add';
  updateSubMenuUrl: string = 'subMenu?operation=save';
  activateSubMenuUrl: string = 'subMenu?operation=active';
  deleteSubMenuUrl: string = 'subMenu?operation=delete';

  getSubMenuList() {
    return this.get<any>(this.getSubMenus);
  }

  addSubMenu(menu: any) {
    return this.post<any>(this.addSubMenuUrl, menu);
  }

  updateSubMenu(menu: any) {
    return this.post<any>(this.updateSubMenuUrl, menu);
  }

  activateSubMenu(menu: any) {
    return this.post<any>(this.activateSubMenuUrl, menu);
  }

  deleteSubMenu(menu: any) {
    return this.post<any>(this.deleteSubMenuUrl, menu);
  }

}
