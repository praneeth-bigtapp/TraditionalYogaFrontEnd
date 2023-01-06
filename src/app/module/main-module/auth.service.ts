import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseHttp {
  postVerifyEmailUrl = "register/verifyEmail"
  postOtpUrl = "register/opt"

  forgotPasswordURL = ""
  changePasswordUrl = ""

  postVerifyEmail(body: any) {
    return this.login(this.postVerifyEmailUrl, body);
  }

  postOtp(body: any) {
    return this.login(this.postOtpUrl, body);
  }

  forgotPassword(body: any) {
    return this.login(this.forgotPasswordURL, body)
  }
  changePassword(body: any) {
    return this.login(this.changePasswordUrl, body)
  }
}
