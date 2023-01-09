import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class UserFilterService extends BaseHttp {
  searchUsersUrl = ""
  getUsersUrl = ""
  getSuspiscousUrl = ""

  searchUsers(body: any) {
    return this.post(this.searchUsersUrl, body)
  }
  getUsers() {
    this.get(this.getUsersUrl)
  }
  getSuspiscous() {
    this.get(this.getSuspiscousUrl)
  }
}
