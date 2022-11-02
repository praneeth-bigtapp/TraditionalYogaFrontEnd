import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
    providedIn: 'root',
})
export class HeaderService extends BaseHttp {
    logoutUrl: string = 'logout';

    UserLogout(userName: any) {
        return this.get<any>(this.logoutUrl + "?userName=" + userName);
    }

}