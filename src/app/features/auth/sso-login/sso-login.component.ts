import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';
import { HeaderService } from 'src/app/core/layout/header/service/header.service';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { SendReceiveService } from 'src/app/shared/services/sendReceive.service';

@Component({
  selector: 'app-sso-login',
  templateUrl: './sso-login.component.html',
  styleUrls: ['./sso-login.component.css']
})
export class SsoLoginComponent implements OnInit {

  loginData: any;
  sCode: any;
  value: string[] | undefined;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private http: HttpClient,
    private dataStorageService: DataStorageService,
    public sendReceiveService: SendReceiveService,
    private userIdle: UserIdleService,
    private headerService: HeaderService
  ) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      console.log(params);
      this.sCode = params.role;
      console.log(this.sCode);
    });
    // this.activeRoute.
    console.log("Enterning into the SSO Login");
    console.log(localStorage);
    // this.sCode = localStorage.getItem('username');
    console.log("SCode is : " + this.sCode);
    if (this.router.url == "/ssoLogin" || this.router.url == "/inv/dm/ssoLogin") {
      // this.onSuccessfullLogin();
    }
    this.onSuccessfullLogin(this.data);
  }

  serviceLayer() {
    this.http.get("")
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
      //console.log(count)});
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

  stopWatching() {
    this.userIdle.stopWatching();
  }

  data: any = {
    "userId": "kasthuri",
    "roleId": 6,
    "userRole": "Application Admin",
    "roleStatus": "Y",
    "permissions": [
      {
        "moduleName": "Administration",
        "submodules": [
          {
            "subModuleId": 1,
            "subModuleName": "Roles",
            "tableId": 0,
            "tableName": null,
            "permissionId": 1,
            "permissionName": "VIEW/ADD/EDIT/DELETE",
            "primissionValue": "'View': true, 'Add': true, 'Edit': true, 'Delete': true"
          },
          {
            "subModuleId": 2,
            "subModuleName": "Users",
            "tableId": 0,
            "tableName": null,
            "permissionId": 1,
            "permissionName": "VIEW/ADD/EDIT/DELETE",
            "primissionValue": "'View': true, 'Add': true, 'Edit': true, 'Delete': true"
          },
          {
            "subModuleId": 3,
            "subModuleName": "RBA Permission",
            "tableId": 0,
            "tableName": null,
            "permissionId": 1,
            "permissionName": "VIEW/ADD/EDIT/DELETE",
            "primissionValue": "'View': true, 'Add': true, 'Edit': true, 'Delete': true"
          },
          {
            "subModuleId": 15,
            "subModuleName": "Table Configurator",
            "tableId": 0,
            "tableName": null,
            "permissionId": 1,
            "permissionName": "VIEW/ADD/EDIT/DELETE",
            "primissionValue": "'View': true, 'Add': true, 'Edit': true, 'Delete': true"
          },
          {
            "subModuleId": 17,
            "subModuleName": "CSV Generator",
            "tableId": 0,
            "tableName": null,
            "permissionId": 1,
            "permissionName": "VIEW/ADD/EDIT/DELETE",
            "primissionValue": "'View': true, 'Add': true, 'Edit': true, 'Delete': true"
          }
        ]
      },
      {
        "moduleName": "Security Master",
        "submodules": [
          {
            "subModuleId": 9,
            "subModuleName": "Data Creation/Update",
            "tableId": 0,
            "tableName": null,
            "permissionId": 1,
            "permissionName": "VIEW/ADD/EDIT/DELETE",
            "primissionValue": "'View': true, 'Add': true, 'Edit': true, 'Delete': true"
          },
          {
            "subModuleId": 10,
            "subModuleName": "Static Master",
            "tableId": 0,
            "tableName": null,
            "permissionId": 1,
            "permissionName": "VIEW/ADD/EDIT/DELETE",
            "primissionValue": "'View': true, 'Add': true, 'Edit': true, 'Delete': true"
          },
          {
            "subModuleId": 12,
            "subModuleName": "Ad-hoc Bloomberg Request",
            "tableId": 0,
            "tableName": null,
            "permissionId": 2,
            "permissionName": "VIEW/ADD/EDIT",
            "primissionValue": "'View': true, 'Add': true, 'Edit': true, 'Delete': false"
          },
          {
            "subModuleId": 13,
            "subModuleName": "Alternative PE",
            "tableId": 0,
            "tableName": null,
            "permissionId": 6,
            "permissionName": "No Permission",
            "primissionValue": "'View': false, 'Add': false, 'Edit': false, 'Delete': false"
          }
        ]
      },
      {
        "moduleName": "View Data",
        "submodules": [
          {
            "subModuleId": 14,
            "subModuleName": "Data View",
            "tableId": 0,
            "tableName": null,
            "permissionId": 1,
            "permissionName": "VIEW/ADD/EDIT/DELETE",
            "primissionValue": "'View': true, 'Add': true, 'Edit': true, 'Delete': true"
          }
        ]
      },
      {
        "moduleName": "Data Upload",
        "submodules": [
          {
            "subModuleId": 6,
            "subModuleName": "Entity Related",
            "tableId": 0,
            "tableName": null,
            "permissionId": 1,
            "permissionName": "VIEW/ADD/EDIT/DELETE",
            "primissionValue": "'View': true, 'Add': true, 'Edit': true, 'Delete': true"
          },
          {
            "subModuleId": 7,
            "subModuleName": "Static Reference",
            "tableId": 0,
            "tableName": null,
            "permissionId": 1,
            "permissionName": "VIEW/ADD/EDIT/DELETE",
            "primissionValue": "'View': true, 'Add': true, 'Edit': true, 'Delete': true"
          },
          {
            "subModuleId": 8,
            "subModuleName": "Report Static Data",
            "tableId": 0,
            "tableName": null,
            "permissionId": 1,
            "permissionName": "VIEW/ADD/EDIT/DELETE",
            "primissionValue": "'View': true, 'Add': true, 'Edit': true, 'Delete': true"
          },
          {
            "subModuleId": 16,
            "subModuleName": "Asset Mix Report",
            "tableId": 0,
            "tableName": null,
            "permissionId": 1,
            "permissionName": "VIEW/ADD/EDIT/DELETE",
            "primissionValue": "'View': true, 'Add': true, 'Edit': true, 'Delete': true"
          }
        ]
      }
    ],
    "userType": "",
    "firstName": "Kasthuri",
    "lastName": "Vanama",
    "response": {
      "message": "kasthuri User logged in successfully",
      "statusCode": 200,
      "errorMessage": ""
    },
    "userToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrYXN0aHVyaSIsImV4cCI6MTY2NTU3MTI3NCwiaWF0IjoxNjY1NTU2ODc0fQ.xW18xaTDLxZtHmXLd3-omN8CPj86POaYwbR3sA8Az6bMAhdvXCcXHk31UuF1Moly_0aOAxKSQYvVdhDMSIKxaA",
    "active": true
  }

}
