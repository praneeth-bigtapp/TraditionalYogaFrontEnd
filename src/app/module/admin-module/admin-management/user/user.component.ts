import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from './service/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SendReceiveService } from 'src/app/shared/services/sendReceive.service';
import { MyAppHttp } from 'src/app/shared/services/myAppHttp.service';
import { NotifierService } from 'src/app/notifier.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})

export class UserComponent implements OnInit {
  displayedColumns: string[] = ['sno', 'userName', 'Name', 'mobile', 'email', 'roleName', 'actions'];
  UserList: any;
  AddUserForm!: FormGroup;
  isAddUserForm: boolean = false;
  RolesList: any = [];
  pageno: number = 1

  validation_messages = {
    email_id: [
      { type: 'required', message: 'Please Enter Email' },
      { type: 'pattern', message: 'Please enter valid Email ID' },
      { type: 'maxlength', message: 'Password should be maximum 50 characters.' }
    ],
    password: [
      { type: 'required', message: 'Please Enter Password' },
      { type: 'pattern', message: 'Password should contain at least one uppercase letter, one lowercase letter, one number and one special character' },
      { type: 'minlength', message: 'Password should be minimum 12 characters.' },
      { type: 'maxlength', message: 'Password should be maximum 20 characters.' }
    ]
  };
  pagePermissions: any;
  loginData: any;
  menuList: any = [];
  permissionName: any;
  editMode: any;
  editedUserId: any;
  show_password: boolean = false;
  show_eye: boolean = false;
  filterData: any;
  gridData = [];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  editUsername: any;
  errorMessage: any;
  Message: any;
  errorType: any;

  constructor(private userService: UserService,
    private formBuilder: FormBuilder, public sendReceiveService: SendReceiveService, private notifierService: NotifierService) { }

  ngOnInit() {
    this.filterData = {
      filterColumnNames: [
        { "Key": 'sno', "Value": "" },
        { "Key": 'userName', "Value": "" },
        { "Key": 'firstName', "Value": "" },
        { "Key": 'lastName', "Value": "" },
        { "Key": 'email', "Value": "" },
        { "Key": 'roleName', "Value": "" },
      ],
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };
    this.AddUserForm = this.formBuilder.group({
      userName: [null, Validators.required],
      password: [null, Validators.compose([Validators.minLength(12), Validators.pattern(MyAppHttp.validation.password)])],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(MyAppHttp.validation.email),
      ])],
      roleId: [null, Validators.required],
      status: ['Y'],
      // remark: [null],
      mobileNumber: [null, Validators.required]
    });
    this.getRoles();
    this.setPageLevelPermissions();
  }

  updatePagination() {
    this.filterData.dataSource.paginator = this.paginator;
  }
  onpaginatechange(event: any) {
    if (event.pageIndex === 0) {
      this.pageno = 1
      return
    }
    this.pageno = (event.pageIndex * event.pageSize) + 1
    return
  }


  onKeyPress(event: any) {
    const pattern = /[\d]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  getUsers() {
    this.userService.getUsersList().subscribe(response => {
      const userData: any = [];
      for (let i = 0; i < response.length; i++) {
        response[i].sno = i + 1;
        userData.push(response[i]);
      }
      for (let user of userData) {
        for (let role of this.RolesList) {
          if (user.roleId == role.roleId) {
            user.roleName = role.roleName;
          }
        }
      }
      this.UserList = userData;
      this.filterData.gridData = userData;
      this.dataSource = new MatTableDataSource(userData);
      this.filterData.dataSource = this.dataSource;
      console.log(this.filterData.dataSource.filteredData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.filterData.sort = this.sort;
      for (let col of this.filterData.filterColumnNames) {
        col.Value = '';
      }
    })
  }

  getRoles() {
    this.userService.getRoles().subscribe((response) => {
      for (let resp of response) {
        if (resp.isActive == 'Y') {
          this.RolesList.push(resp);
        }
      }
      this.getUsers();
    })
  }

  onCheckStatus(event: any) {
    if (event.checked) {
      this.AddUserForm.controls['status'].setValue("Y");
    } else {
      this.AddUserForm.controls['status'].setValue("N");
    }
  }

  onAddUserSubmit() {
    if (this.AddUserForm.valid) {
      if (this.editMode) {
        let encrytPassword = btoa(this.AddUserForm.value.password);
        let user = {
          id: this.editedUserId,
          userName: this.editUsername,
          password: encrytPassword,
          firstName: this.AddUserForm.value.firstName,
          lastName: this.AddUserForm.value.lastName,
          email: this.AddUserForm.value.email,
          roleId: this.AddUserForm.value.roleId,
          status: this.AddUserForm.value.status,
          mobileNumber: this.AddUserForm.value.mobileNumber,
        }
        this.userService.saveUser(user).subscribe((response) => {
          this.editMode = false;
          this.isAddUserForm = false;
          this.getUsers();
          this.AddUserForm.reset();
          this.AddUserForm.controls['status'].setValue('Y');
          this.notifierService.showNotification('Success', MyAppHttp.ToasterMessage.userSaved);
        }, (error) => {
          console.log(error)
        });
      } else {
        this.AddUserForm.value.password = this.AddUserForm.value.password == null ? "" : btoa(this.AddUserForm.value.password);
        this.userService.addUser(this.AddUserForm.value).subscribe((response) => {
          if (response.statusCode == 200) {
            this.isAddUserForm = false;
            this.getUsers();
            this.AddUserForm.reset();
            this.AddUserForm.controls['status'].setValue('Y');
            this.notifierService.showNotification('Success', response.message);
          }
          else {
            this.notifierService.showNotification('Error', response.message);
          }
        }, (error) => {
          let errorMessage = error.error.errorMessage
          this.notifierService.showNotification('Error', errorMessage);
        });
      }
    }
  }

  onCancel() {
    this.isAddUserForm = false;
  }

  onAddUser() {
    this.isAddUserForm = true;
    this.editMode = false;
    this.AddUserForm.reset();
    this.AddUserForm.controls['userName'].enable();
    this.AddUserForm.controls['status'].setValue('Y');
  }

  setPageLevelPermissions() {
    if (localStorage.getItem("LoginData")) {
      let data = localStorage.getItem("LoginData");
      if (data) {
        this.loginData = JSON.parse(data);
      }
      this.menuList = this.loginData.permissions;
      for (let menu of this.menuList) {
        for (let subModule of menu.subModules) {
          if (subModule.subModuleName == "Users") {
            this.permissionName = subModule.permissionName;
            console.log(this.permissionName);
            this.pagePermissions = this.sendReceiveService.getPageLevelPermissions(this.permissionName);
          }
        }
      }
    }
  }
  onUserEdit(user: any) {
    this.isAddUserForm = true;
    this.editedUserId = user.id;
    let decrytPassword = atob(user.password);
    this.AddUserForm.patchValue({
      userName: user.userName,
      password: decrytPassword,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roleId: user.roleId,
      status: user.status,
      mobileNumber: user.mobileNumber
    });
    this.editMode = true;
    this.editUsername = user.userName;
    this.AddUserForm.controls['userName'].disable();
  }

  onActivateUser(user: any, event: MatSlideToggleChange) {
    if (event.checked) {
      user.status = 'Y';
    } else {
      user.status = 'N';
    }
    this.userService.saveUser(user).subscribe((response) => {
      this.getUsers();
    })
  }

  onUserDelete(user: any) {
    var message = 'Are you sure you want to delete?';
    this.sendReceiveService.confirmationDialog(message).subscribe((result) => {
      if (!!result) {
        this.userService.deleteUser(user).subscribe((response) => {
          if (response.statusCode == 200) {
            this.getUsers();
            // this.sendReceiveService.showToast(MyAppHttp.ToastType.SUCCESS, 'Success', response.message)
            this.notifierService.showNotification('Success', response.message);
          } else {
            // this.sendReceiveService.showToast(MyAppHttp.ToastType.ERROR, 'Error', response.message)
            this.notifierService.showNotification('Error', response.message);
          }
        }, error => {
          console.log(error);
        });
      }
    })
  }

  showPassword() {
    this.show_password = !this.show_password;
    this.show_eye = !this.show_eye;
  }

  setMessage(type: any, message: any) {
    this.errorMessage = true;
    this.errorType = type;
    this.Message = message;
    setTimeout(() => {
      this.errorMessage = false;
    }, MyAppHttp.notificationTimeOut);
  }
}
