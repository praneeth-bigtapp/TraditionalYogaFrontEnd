import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OtpComponent } from 'src/app/shared/components/otp/otp.component';
import { MyAppHttp } from 'src/app/shared/services/my-app-http.service';
import { AuthService } from '../auth.service';
import { LoginService } from '../login/services/login.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  formDetails!: FormGroup;
  ispasswordNotMatch: boolean = false
  isemailVerified: boolean = false
  isemailSended: boolean = false
  email: string = ""
  isloading: boolean = false
  otpData: any
  successMessage: any
  errorMessage: any

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private dialog: MatDialog,
    private service: AuthService
  ) { }

  ngOnInit(): void {
    this.formDetails = this.formBuilder.group({
      // email: [
      //   null,
      //   Validators.compose([
      //     Validators.required,
      //     Validators.maxLength(50),
      //     Validators.email
      // Validators.pattern(MyAppHttp.validation.email)
      //   ]),
      // ],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(12),
          Validators.pattern(MyAppHttp.validation.password)
        ])
      ],
      confirmpassword: [
        null,
        Validators.compose([
          Validators.required,

          // Validators.pattern(MyAppHttp.validation.password)
        ])
      ],
      rememberMe: [false]
    });
  }

  verifyEmail() {
    this.isloading = true
    const data = {
      "emailId": this.email
    }
    console.log(data);
    this.service.postVerifyEmail(data).subscribe({
      next: (response) => {
        console.log(response);
        this.otpData = response;
        this.isloading = false
        this.openOtpDial(this.otpData.otp);
      },
      error: (error) => {
        console.error(error);

      }
    });
  }

  sucessDialog() {
    let successDialogRef = this.dialog.open(OtpComponent, {
      data: {
        emailId: this.email,
        title: "Traditional Yoga - Change Password",
        isRegisterSuccess: true,
        message: "Your password has been changed successfully."
      },
      width: "50%",
      height: "30%"
    });

    successDialogRef.afterClosed().subscribe(data => {

      this.router.navigate(['login'])

    })

  }

  openOtpDial(val: any) {
    let emailDialogRef = this.dialog.open(OtpComponent, {
      data: {
        emailId: this.email,
        otp: val,
        title: "Traditional Yoga - OTP Verification",
        isotp: true
      },
      width: "50%",
      height: "38%"
    });


    emailDialogRef.afterClosed().subscribe(data => {

      if (data.otpStatus == true) {
        this.isemailVerified = true

        this.emailVerifiedDialog()
      } else {
        this.isemailVerified = false

      }
    });

    //if(isemailsended);
  }

  emailVerifiedDialog() {
    let emailVerifiedRef = this.dialog.open(OtpComponent, {
      data: {
        emailId: this.email,
        title: "Traditional Yoga - Email Verification",
        isemailverified: true

      },
      width: "50%",
      height: "30%"
    });

    emailVerifiedRef.afterClosed().subscribe(data => {
      if (data) {

      }
    })
  }



  confirmpasswordchange() {
    this.ispasswordNotMatch = this.formDetails.value.password !== this.formDetails.value.confirmpassword
    console.log(this.formDetails.value.password !== this.formDetails.value.confirmpassword);

  }

  onForgotPassword() {
    this.ispasswordNotMatch = false

    if (this.formDetails.invalid)
      return this.formDetails.markAllAsTouched()

    this.ispasswordNotMatch = this.formDetails.value.password !== this.formDetails.value.confirmpassword
    if (this.ispasswordNotMatch)
      return

    const { password, confirmpassword } = this.formDetails.value
    console.log({ password, confirmpassword });

    const body = {
      "userName": this.email,
      "password": btoa(password) || btoa("123")
    }

    this.service.forgotPassword(body).subscribe({
      next: (response) => {
        this.successMessage = response
        if (this.successMessage.statusCode === 406) {
          this.errorMessage = "Email ID doesn't exists.Kindly check your registered mail ID."
          return
        }
        this.sucessDialog()
      },
      error: (error) => {
        console.error(error);
        if (error.error.statusCode === 406) {
          this.errorMessage = "Email ID doesn't exists.Kindly check your registered mail ID."
          console.log(this.errorMessage);

          return
        }
      }
    })
  }

  cancelBtn() {
    this.router.navigate(['login'])
  }

}
