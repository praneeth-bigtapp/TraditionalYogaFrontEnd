import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class BlacklistUsersService extends BaseHttp {

  getURL='blacklistuser/getAll?operation=blacklistuser';
  postURL='blacklistuser/?operation=add';
  deleteURL='blacklistuser/?operation=delete';


  getBlacklist(){

   return this.get<any>(this.getURL);

  }
  addBlacklist(data:any){
  
    return this.post<any>(this.postURL,data);
  }
  removeBlacklist(data:any){
    
   return this.post<any>(this.deleteURL,data);
  }
}
