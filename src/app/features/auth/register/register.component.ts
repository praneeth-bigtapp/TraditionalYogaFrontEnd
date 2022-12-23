import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyAppHttp } from 'src/app/shared/services/myAppHttp.service';
import { UserService } from '../../administration/user/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  RegisterForm!: FormGroup;
  errorFlag: boolean = false;
  authorizationMessage: any;
  validation_messages = MyAppHttp.loginErrorMessages;

  RolesList: any = [];
  showPassword: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.RegisterForm = this.formBuilder.group({
      userName: [null, Validators.required],
      password: [null, Validators.compose([Validators.required, Validators.minLength(12), Validators.pattern(MyAppHttp.validation.password)])],
      // firstName: [null, Validators.required],
      // lastName: [null, Validators.required],
      email: [null, Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(MyAppHttp.validation.email),
      ])],
      roleId: [null, Validators.required],
      status: ['Y'],
      mobileNumber: [null, Validators.required]
    });
    this.getRoles();
  }

  onUserSubmit() {

    if (this.RegisterForm.invalid)
      return this.RegisterForm.markAllAsTouched()

  }

  getRoles() {
    this.userService.getRolesReg().subscribe({
      next: (data) => {
        for (let resp of data) {
          if (resp.active == 'Y') {
            this.RolesList.push(resp);
          }
        }
      }
    });
  }

  onClear() {
    this.RegisterForm.reset();
  }

  onKeyPress(event: any) {
    const pattern = /[\d]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

}
