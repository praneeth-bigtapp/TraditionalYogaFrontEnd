import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { SendReceiveService } from 'src/app/shared/services/sendReceive.service';
import { MyAppHttp } from 'src/app/shared/services/myAppHttp.service';
import { HeaderService } from 'src/app/core/layout/header/service/header.service';
import { UserIdleService } from 'angular-user-idle';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm!: FormGroup;
  loginData: any;
  errorFlag: boolean = false;
  authorizationMessage: any;

  validation_messages = MyAppHttp.loginErrorMessages;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private dataStorageService: DataStorageService,
    public sendReceiveService: SendReceiveService,
    private userIdle: UserIdleService,
    private headerService: HeaderService
  ) { }

  ngOnInit(): void {

    this.LoginForm = this.formBuilder.group({
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
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
      rememberMe: [false]
    });

    if (this.dataStorageService.isUserLoggedIn) {
      this.getModules();
    }

    // if ((this.router.url) == "/logout" || this.router.url == "/inv/dm/logout") {
    //   this.dataStorageService.isUserLoggedIn = false;
    //   this.onSignOut();
    // }
    // if (!(this.router.url).includes("/logout")) {
    //   // let scode = {"userName": "kasthuri"};
    //   let scode = true;
    //   if (scode) {
    //     this.validateScode(scode);
    //   } else {
    //     if (!this.dataStorageService.isUserLoggedIn) {
    //       this.router.navigateByUrl("");
    //     }
    //   }
    // }
    // console.log(document.getElementsByTagName('meta'))
    // const firstTime = localStorage.getItem('key')
    // if (!firstTime) {
    //   localStorage.setItem('key', 'loaded')
    //   location.reload()
    // } else {
    //   localStorage.removeItem('key')
    // }
    // this.onSsoLogin();
  }

  onSignIn() {
    this.errorFlag = false;
    console.log(this.validation_messages);

    if (this.LoginForm.valid) {
      localStorage.setItem("username", this.LoginForm.value.email);
      localStorage.setItem("password", this.LoginForm.value.password);
      let encryptedPassword = btoa(this.LoginForm.value.password);
      const loginJsonData = {
        "userName": this.LoginForm.value.email,
        "passWord": encryptedPassword
      }
      this.loginService.getLoginDetails(loginJsonData).subscribe({
        next: (response) => {
          // if (response.roleStatus == "N") {
          //   this.errorFlag = true;
          //   this.authorizationMessage = MyAppHttp.ToasterMessage.activeOrNot;
          //   return;
          // }
          if (response.response.statusCode == 200) {
            this.onSuccessfullLogin(response);
          } else {
            this.errorFlag = true;
            this.authorizationMessage = response.message;
          }
        },
        error: (error) => {
          this.errorFlag = true;
          this.authorizationMessage = error.error.response.message;
        }
      });
    }
  }

  onSignOut() {
    let data = localStorage.getItem("LoginData");
    if (data) {
      this.loginData = JSON.parse(data);
    }
    if (this.loginData) {
      this.headerService.UserLogout(this.loginData.userId).subscribe((response) => {
        localStorage.clear();
        this.dataStorageService.isUserLoggedIn = false;
        this.router.navigateByUrl('logout');
      });
    }
  }

  validateScode(scode: any) {
    console.log(scode);
    this.errorFlag = false;
    this.loginService.getLoginDetails(scode).subscribe((response) => {
      if (response.roleStatus == "N") {
        this.errorFlag = true;
        this.authorizationMessage = MyAppHttp.ToasterMessage.activeOrNot;
        return;
      }
      if (response.response.statusCode == 200) {
        this.onSuccessfullLogin(response);
      }
      else {
        this.errorFlag = true;
        this.authorizationMessage = response.message;
      }
    }, (error) => {
      this.errorFlag = true;
      this.authorizationMessage = error.error.response.message;
    })
  }

  getModules() {
    let data = localStorage.getItem("LoginData");
    if (data) {
      this.loginData = JSON.parse(data);
    }
    if (this.loginData) {
      let tempSubMenuName = [];
      let totalMenus = this.loginData.permissions;
      for (let menu of totalMenus) {
        for (let subModule of menu.submodules) {
          if (menu.submodules.permissionId !== 6) {
            tempSubMenuName.push(subModule.subModuleId);
          }
        }
      }
      let subMenuName = tempSubMenuName[0];
      this.sendReceiveService.navigateToMenu(subMenuName);
    }
  }

  stopWatching() {
    this.userIdle.stopWatching();
  }

  getAllPermittedModules() {
    let tempSubMenuName = [];
    let totalMenus = this.loginData.permissions;
    for (let menu of totalMenus) {
      for (let subModule of menu.submodules) {
        if (menu.submodules.permissionId !== 6) {
          tempSubMenuName.push(subModule.subModuleId);
        }
      }
    }
    let subMenuName = tempSubMenuName[0];
    this.sendReceiveService.navigateToMenu(subMenuName);
  }

  onSuccessfullLogin(response: any) {
    localStorage.clear();
    this.dataStorageService.isUserLoggedIn = true;
    localStorage.setItem("LoginData", JSON.stringify(response));
    localStorage.setItem("userToken", response.userToken);
    let data = localStorage.getItem("LoginData");
    if (data) {
      this.loginData = JSON.parse(data);
    }
    if (this.loginData) {
      this.getAllPermittedModules();
    }
    this.userIdle.startWatching();
    this.userIdle.onTimerStart().subscribe((count) => {
      if (count > 1) {
        this.headerService.UserLogout(this.loginData.userId).subscribe((resp: any) => {
          localStorage.clear();
          this.dataStorageService.isUserLoggedIn = false;
          this.router.navigateByUrl('/');
        });
        console.log(count)
        this.stopWatching();
      }

    });
    this.userIdle.onTimeout().subscribe(() => console.log('Time is up!'));
  }

}