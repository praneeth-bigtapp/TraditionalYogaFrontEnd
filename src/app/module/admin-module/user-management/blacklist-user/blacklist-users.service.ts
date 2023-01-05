import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class BlacklistUsersService extends BaseHttp {

  getBlacklistURL = 'student/getAll?operation=blackListUser';
  addBlacklistURL = 'student/blockListUsers?operation=add';
  removeBlacklistURL = 'student/blockListUsers?operation=delete';
  updateBlacklistURL = 'student/blockListUsers?operation=save'

  getBlacklist() {
    return this.get<any>(this.getBlacklistURL);
  }

  addBlacklist(data: any) {
    return this.post<any>(this.addBlacklistURL, data);
  }

  removeBlacklist(data: any) {
    return this.post<any>(this.removeBlacklistURL, data);
  }
  saveBlacklist(data: any) {
    return this.post<any>(this.updateBlacklistURL, data);
  }
}
