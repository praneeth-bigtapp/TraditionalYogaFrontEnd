import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/core/layout/header/service/header.service';
import { MustMatch } from 'src/app/core/services/must-match.validator';
import { NotifierService } from 'src/app/notifier.service';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { MyAppHttp } from 'src/app/shared/services/myAppHttp.service';
import { SendReceiveService } from 'src/app/shared/services/sendReceive.service';
import { ChangePasswordService } from './Service/change-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  // directives: [NgStyle]
})
export class ChangePasswordComponent implements OnInit {

  ChangePasswordForm!: FormGroup;
  show_password: boolean = false;
  show_eye: boolean = false;
  Newshow_password: boolean = false;
  Newshow_eye: boolean = false;
  Confirmshow_password: boolean = false;
  Confirmshow_eye: boolean = false;
  validation_messages = {
    oldpassword: [
      { type: 'required', message: 'Please Enter Old Password' },
    ],
    newpassword: [
      { type: 'required', message: 'Please Enter New Password' },
      { type: 'pattern', message: 'Password should contain at least one uppercase letter, one lowercase letter, one number and one special character' },
      { type: 'maxlength', message: 'Password should be maximum 20 characters.' },
      { type: 'minlength', message: 'Password should be minimum 12 characters.' },

    ],
    confirmpassword: [
      { type: 'required', message: 'Please Enter Confirm Password' },
      { type: 'pattern', message: 'Please enter valid Password' },

    ],
  };
  loginData: any;
  errorMessage: any;
  Message: any;
  errorType: any;
  ispasswordNotMatch: boolean = false;

  constructor(private changepasswordService: ChangePasswordService,
    private formBuilder: FormBuilder,
    private dataStorageService: DataStorageService,
    public sendReceiveService: SendReceiveService,
    private headerService: HeaderService,
    private router: Router, private notifierService: NotifierService) { }

  ngOnInit(): void {
    if (localStorage.getItem("LoginData")) {
      let data = localStorage.getItem("LoginData");
      if (data) {
        this.loginData = JSON.parse(data);
      }
      this.dataStorageService.isUserLoggedIn = true;
    }

    this.ChangePasswordForm = this.formBuilder.group({
      oldpassword: [null, Validators.compose([Validators.required, Validators.maxLength(20)])],
      newpassword: [null, Validators.compose([Validators.required, Validators.minLength(12),
        // Validators.pattern(MyAppHttp.validation.password)
      ])],
      confirmpassword: [null, Validators.compose([Validators.required, Validators.maxLength(20)])],
    })
    console.log(this.loginData);

  }

  // clkChangePassword() {
  //   let oldPassword: string = this.ChangePasswordForm.value.oldpassword;
  //   let newPassword: string = this.ChangePasswordForm.value.newpassword;
  //   let ConfirmPassword: string = this.ChangePasswordForm.value.confirmpassword;
  //   if (this.ChangePasswordForm.invalid)
  //     return this.ChangePasswordForm.markAllAsTouched()
  //   if (newPassword != ConfirmPassword) {
  //     return
  //   }
  //   alert(this.ChangePasswordForm.invalid)

  //   this.changepasswordService.changepassword({
  //     'oldPassword': btoa(oldPassword),
  //     'newPassword': btoa(newPassword)
  //   }).subscribe(res => {
  //     this.ChangePasswordForm.reset();
  //     if (res.statusCode == 200) {
  //       this.headerService.UserLogout(this.loginData.userId).subscribe((response) => {
  //         this.notifierService.showNotification('Success', res.message);
  //         localStorage.clear();
  //         this.dataStorageService.isUserLoggedIn = false;
  //         this.router.navigateByUrl('/');
  //       })
  //     }
  //   })
  // }
  confirmpasswordchange() {
    this.ispasswordNotMatch = this.ChangePasswordForm.value.newpassword !== this.ChangePasswordForm.value.confirmpassword

  }
  clkChangePassword() {
    this.ispasswordNotMatch = false

    if (this.ChangePasswordForm.invalid)
      return this.ChangePasswordForm.markAllAsTouched()
    this.ispasswordNotMatch = this.ChangePasswordForm.value.newpassword !== this.ChangePasswordForm.value.confirmpassword

    console.log(this.ChangePasswordForm.valid);

    this.router.navigate(['login'])

  }

  OldPassword() {
    this.show_password = !this.show_password;
    this.show_eye = !this.show_eye;
  }

  NewPassword() {
    this.Newshow_password = !this.Newshow_password;
    this.Newshow_eye = !this.Newshow_eye;
  }

  ConfirmPassword() {
    this.Confirmshow_password = !this.Confirmshow_password;
    this.Confirmshow_eye = !this.Confirmshow_eye
  }

  setMessage(type: any, message: any) {
    this.errorMessage = true;
    this.errorType = type;
    this.Message = message;
    setTimeout(() => {
      this.errorMessage = false;
    }, MyAppHttp.notificationTimeOut);
  }

  cancelBtn() {
    this.router.navigate(['login'])
  }
}
