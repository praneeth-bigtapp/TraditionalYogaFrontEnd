import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyAppHttp } from 'src/app/shared/services/myAppHttp.service';
import { LoginService } from '../login/services/login.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  formDetails!: FormGroup;
  ispasswordNotMatch: boolean = false

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.formDetails = this.formBuilder.group({
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.email
          // Validators.pattern(MyAppHttp.validation.email)
        ]),
      ],
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

    const { email, password, confirmpassword } = this.formDetails.value
    console.log({ email, password, confirmpassword });

    this.router.navigate(['login'])
  }

  cancelBtn()
  {
    this.router.navigate(['login'])
  }

}
