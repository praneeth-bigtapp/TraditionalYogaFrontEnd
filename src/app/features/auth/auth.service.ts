import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseHttp {
  postVerifyEmailUrl = "register/verifyEmail"
  postOtpUrl = "register/opt"

  postVerifyEmail(body: any) {
    return this.login(this.postVerifyEmailUrl, body);
  }

  postOtp(body: any) {
    return this.login(this.postOtpUrl, body);
  }
}
