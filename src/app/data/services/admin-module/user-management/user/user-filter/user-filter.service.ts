import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class UserFilterService extends BaseHttp {
  searchUsersUrl = ""
  getUsersUrl = ""
  getSuspiscousUrl = ""
  searchSuspiscoursUsersUrl = ""
  toggleUsersURL = ""
  toggleSuspisciousUserUrl = ""

  searchUsers(body: any) {
    return this.post(this.searchUsersUrl, body)
  }
  getUsers() {
    return this.get(this.getUsersUrl)
  }
  getSuspiscous() {
    return this.get(this.getSuspiscousUrl)
  }

  searchSuspiscoursUser(body: any) {
    return this.post(this.searchSuspiscoursUsersUrl, body)
  }

  toggleSuspisciousUser(body: any) {
    return this.post(this.toggleSuspisciousUserUrl, body)
  }
  toggleUsers(body: any) {
    return this.post(this.toggleUsersURL, body)
  }
}
