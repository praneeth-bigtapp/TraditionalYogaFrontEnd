import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MyAppHttp } from 'src/app/shared/services/my-app-http.service';
import { NotifierService } from 'src/app/shared/services/notifier.service';
import { SendReceiveService } from 'src/app/shared/services/send-receive.service';
import { RolesService } from './service/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html'
})
export class RolesComponent implements OnInit {
  displayedColumns: string[] = ['sno', 'roleName', 'actions'];
  RolesList: any = [];
  AddRoleForm!: FormGroup;
  isAddRoleForm: boolean = false;
  filterData: any;
  gridData = [];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  pagePermissions: any;
  loginData: any;
  menuList: any = [];
  permissionName: any;
  editMode: any;
  editedRole: any;
  errorMessage: any;
  Message: any;
  errorType: any;
  validt: any;
  pageno: number = 1


  constructor(
    private rolesService: RolesService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public sendReceiveService: SendReceiveService,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.filterData = {
      filterColumnNames: [
        { "Key": 'sno', "Value": "" },
        { "Key": 'roleName', "Value": "" },
      ],
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };
    this.AddRoleForm = this.formBuilder.group({
      roleName: ['', Validators.required],
    });
    this.getRoles();
    this.setPageLevelPermissions();
  }

  updatePagination() {
    this.filterData.dataSource.paginator = this.paginator;
  }

  getRoles() {
    this.rolesService.getRolesList().subscribe((response) => {
      const rolesData: any = [];
      for (let i = 0; i < response.length; i++) {
        response[i].sno = i + 1;
        rolesData.push(response[i]);
      }
      this.RolesList = rolesData.reverse();
      this.filterData.gridData = rolesData.reverse();
      this.dataSource = new MatTableDataSource(rolesData.reverse());
      this.filterData.dataSource = this.dataSource;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.filterData.sort = this.sort;
      for (let col of this.filterData.filterColumnNames) {
        col.Value = '';
      }
    });
  }

  onpaginatechange(event: any) {
    if (event.pageIndex === 0) {
      this.pageno = 1
      return
    }
    this.pageno = (event.pageIndex * event.pageSize) + 1
    return
  }


  onAddRoleSubmit() {
    if (this.AddRoleForm.valid) {
      if (this.editMode) {
        this.onEditMode();
      } else {
        this.rolesService.addRoles(this.AddRoleForm.value).subscribe((response) => {
          if (response.statusCode == 200) {
            this.isAddRoleForm = false;
            this.getRoles();
            this.AddRoleForm.reset();
            this.notifierService.showNotification('Success', response.message);
          } else {
            this.notifierService.showNotification('Error', response.message);
          }
        }, (error) => {
          console.log(error);
          this.notifierService.showNotification('Error', error.error.message);

        });
      }
    }
    else
      this.AddRoleForm.markAllAsTouched()
  }

  onEditMode() {
    this.validt = 0;
    let role = {
      "id": this.editedRole.id,
      "isActive": this.editedRole.isActive,
      "isDeleted": this.editedRole.isDeleted,
      "roleId": this.editedRole.roleId,
      "roleName": this.AddRoleForm.value.roleName
    }
    for (let roleList of this.RolesList) {
      if (roleList.roleName == role.roleName) {
        this.notifierService.showNotification('Error', "Role Already Exist");
        this.validt = 1;
        break;
      }
    }
    if (this.validt != 1) {
      console.log(role);

      const body = {
        "roleId": role.roleId,
        "roleName": role.roleName,
        "active": "Y"
      }

      this.rolesService.saveRole(body).subscribe((response) => {
        if (response.statusCode == 200) {
          this.isAddRoleForm = false;
          this.editMode = false;
          this.getRoles();
          this.notifierService.showNotification('Success', response.message);
        } else {
          this.notifierService.showNotification('Error', response.message);
          this.getRoles();
        }
      }, (error) => {
        console.log(error);
        this.notifierService.showNotification('Error', error.error.message);
      });
    }
  }

  onAddRole() {
    this.isAddRoleForm = true;
    this.editMode = false
    this.AddRoleForm.reset();
  }

  onCancel() {
    this.isAddRoleForm = false;
  }

  setPageLevelPermissions() {
    if (localStorage.getItem("LoginData")) {
      let data = localStorage.getItem("LoginData");
      if (data) {
        this.loginData = JSON.parse(data);
      }
      this.menuList = this.loginData.permissions;
      for (let menu of this.menuList) {
        for (let submodule of menu.subModules) {
          if (submodule.subModuleName == "Roles") {
            this.permissionName = submodule.permissionName;
            console.log(this.permissionName);
            this.pagePermissions = this.sendReceiveService.getPageLevelPermissions(this.permissionName);
          }
        }
      }
    }
  }

  onEditRole(role: any) {
    this.editMode = true;
    this.editedRole = role;
    this.AddRoleForm.patchValue({
      roleName: role.roleName
    });
    this.isAddRoleForm = true;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  onActivateRole(role: any, event: MatSlideToggleChange) {
    console.log(role);
    if (event.checked) {
      role.active = 'Y';
    } else {
      role.active = 'N';
    }
    this.rolesService.activateRole(role).subscribe((response) => {
      this.getRoles();
    });
  }

  onRoleDelete(role: any) {
    var message = 'Are you sure you want to delete?';
    this.sendReceiveService.confirmationDialog(message).subscribe({
      next: (result) => {
        if (!!result) {
          console.log("Enternig Delete");
          console.log(role);
          this.rolesService.deleteRole(role).subscribe({
            next: (response) => {
              if (response.statusCode == 200) {
                this.getRoles();
                this.notifierService.showNotification('Success', response.message);
              } else {
                this.notifierService.showNotification('Error', response.message);
              }
            },
            error: (error) => {
              this.notifierService.showNotification('Error', error.message);
            }
          });
        }
      }
    });
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


