import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class ModuleService extends BaseHttp {
  getMenus: string = 'getAll?operation=menus';
  addMenuUrl: string = 'menu?operation=add';
  updateMenuUrl: string = 'menu?operation=save';
  deleteMenuUrl: string = 'menu?operation=delete';

  getMenuList() {
    return this.get<any>(this.getMenus);
  }

  addMenu(menu: any) {
    return this.post<any>(this.addMenuUrl, menu);
  }

  updateMenu(menu: any) {
    return this.post<any>(this.updateMenuUrl, menu);
  }

  deleteMenu(menu: any) {
    return this.post<any>(this.deleteMenuUrl, menu);
  }

}
