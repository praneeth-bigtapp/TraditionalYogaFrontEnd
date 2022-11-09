import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
    providedIn: 'root',
})
export class UserService extends BaseHttp {
    getUsersUrl: string = 'getAll?operation=users';
    addUserUrl: string = 'user?operation=add';
    saveUserUrl: string = 'user?operation=save';
    deleteUserUrl: string = 'user?operation=delete';
    getRolesUrl: string = 'getAll?operation=roles';
    getRegRolesUrl: string = 'getRegRole';
    

    getUsersList() {
        return this.get<any>(this.getUsersUrl);
    }

    addUser(User: any) {
        return this.post<any>(this.addUserUrl, User);
    }

    getRoles() {
        return this.get<any>(this.getRolesUrl);
    }

    getRolesReg() {
        return this.getRole<any>(this.getRegRolesUrl);
    }

    saveUser(User: any) {
        return this.post<any>(this.saveUserUrl, User);
    }

    deleteUser(User: any) {
        return this.post<any>(this.deleteUserUrl, User);
    }
}