import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
    providedIn: 'root',
})
export class LoginService extends BaseHttp {
    signInUrl: string = 'login';

    getLoginDetails(requestBody: any) {
        return this.login<any>(this.signInUrl, requestBody);
    }
}