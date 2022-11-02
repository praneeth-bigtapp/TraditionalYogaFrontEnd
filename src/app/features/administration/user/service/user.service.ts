import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
    providedIn: 'root',
})
export class UserService extends BaseHttp {
    getUsersUrl: string = 'um/getAll?operation=users';
    addUserUrl: string = 'um/user?operation=add';
    saveUserUrl: string = 'um/user?operation=save';
    deleteUserUrl: string = 'um/user?operation=delete';
    getRolesUrl: string = 'um/getAll?operation=roles';

    getUsersList() {
        return this.get<any>(this.getUsersUrl);
    }

    addUser(User: any) {
        return this.post<any>(this.addUserUrl, User);
    }

    getRoles() {
        return this.get<any>(this.getRolesUrl);
    }

    saveUser(User: any) {
        return this.post<any>(this.saveUserUrl, User);
    }

    deleteUser(User: any) {
        return this.post<any>(this.deleteUserUrl, User);
    }
}