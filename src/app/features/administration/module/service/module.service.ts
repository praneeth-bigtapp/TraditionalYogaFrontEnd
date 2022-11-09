import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class ModuleService extends BaseHttp {
  getMenus: string = 'getAll?operation=menus';
  addMenuUrl: string = 'menu?operation=add';
  saveMenuUrl: string = 'menu?operation=save';
  deleteMenuUrl: string = 'menu?operation=delete';

  getMenuList() {
    return this.get<any>(this.getMenus);
  }

}
