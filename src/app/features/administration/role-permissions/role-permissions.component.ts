import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolePermissionsService } from './service/role-permissions.service';
import * as $ from 'jquery';
import { LoginService } from '../../auth/login/services/login.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SendReceiveService } from 'src/app/shared/services/sendReceive.service';

@Component({
  selector: 'app-role-permissions',
  templateUrl: './role-permissions.component.html'
})
export class RolePermissionsComponent implements OnInit {
  displayedColumns: string[] = ['sno', 'moduleName', 'subModuleName', 'tableName', 'permissionName', 'actions'];
  RolesList: any;
  ModulesList: any;
  SubModulesList: any;
  RolePermissionsIdList: any;
  RolePermissionsList: any;
  AccessPermissionsList: any;
  AllTableNamesList: any;
  AddRolePermissionForm!: FormGroup;
  RolePermissionForm!: FormGroup;
  selectedRoleId: any;
  filterData: any;
  gridData = [];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  pageSize = 50;

  constructor(private rolePermissionsService: RolePermissionsService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,public sendReceiveService: SendReceiveService) { }

  ngOnInit(): void {
    this.filterData = {
      filterColumnNames: [
        { "Key": 'sno', "Value": "" },
        { "Key": 'moduleName', "Value": "" },
        { "Key": 'subModuleName', "Value": "" },
        { "Key": 'tableName', "Value": "" },
        { "Key": 'permissionName', "Value": "" },

      ],
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };
    this.AddRolePermissionForm = this.formBuilder.group({
      roleName: ['', Validators.required],
    });
    this.RolePermissionForm = this.formBuilder.group({
      'permission': ['', Validators.required]
    });
    this.getRoles();
  }

  updatePagination() {
    this.filterData.dataSource.paginator = this.paginator;
  }

  getRoles() {
    this.rolePermissionsService.getRoles().subscribe((response) => {
      this.RolesList = [];
      for (let resp of response) {
        if (resp.isActive == 'Y') {
          this.RolesList.push(resp);
        }
      }
      this.getModules();
    });
  }

  getModules() {
    this.rolePermissionsService.getAllModules().subscribe((response) => {
      this.ModulesList = response;
      this.getSubModules();
    });
  }

  getSubModules() {
    this.rolePermissionsService.getAllSubModules().subscribe((response) => {
      this.SubModulesList = response;
      this.getAllTableNames();
    });
  }

  getAllTableNames() {
    this.rolePermissionsService.getAllTableNames().subscribe((response) => {
      this.AllTableNamesList = response;
      this.getAccessPermissions();
    });
  }

  getAccessPermissions() {
    this.rolePermissionsService.getAccessPermissions().subscribe((response) => {
      this.AccessPermissionsList = response;
      this.AddRolePermissionForm.controls['roleName'].setValue(this.RolesList[0].roleId);
      this.getSelectedRole(this.RolesList[0].roleId);
    });
  }

  onSelectRoleSubmit() {
    this.rolePermissionsService.getRolePermissionsByRoleId(this.AddRolePermissionForm.value.roleName).subscribe((response) => {
      if (response) {
        this.getRolePermissionsListWithName(response);
      }
    });
  }

  getSelectedRole(roleId: any) {
    this.rolePermissionsService.getRolePermissionsByRoleId(roleId).subscribe((RolePermissions: any) => {
      if (RolePermissions) {
        this.getRolePermissionsListWithName(RolePermissions);
      }
    });
  }

  getRolePermissionsListWithName(response: any) {
    this.RolePermissionsList = response;
    for (let rolePermission of this.RolePermissionsList) {
      this.assignDetailsUsingID(rolePermission);
    }
    const RolePermissionsData: any = [];
    for (let i = 0; i < this.RolePermissionsList.length; i++) {
      response[i].sno = i + 1;
      response[i].editMode = false;
      RolePermissionsData.push(response[i]);
    }
    this.RolePermissionsList = RolePermissionsData;
    this.filterData.gridData = RolePermissionsData;
    this.dataSource = new MatTableDataSource(RolePermissionsData);
    this.filterData.dataSource = this.dataSource;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    for (let col of this.filterData.filterColumnNames) {
      col.Value = '';
    }
  }


  assignDetailsUsingID(rolePermission: any) {
    for (let role of this.RolesList) {
      if (rolePermission.roleId == role.roleId) {
        rolePermission.roleName = role.roleName;
      }
    }
    for (let module of this.ModulesList) {
      if (rolePermission.moduleId == module.moduleId) {
        rolePermission.moduleName = module.moduleName;
      }
    }
    for (let subModule of this.SubModulesList) {
      if (rolePermission.subModuleId == subModule.subModuleId) {
        rolePermission.subModuleName = subModule.subModuleName;
      }
    }
    for (let accessPermission of this.AccessPermissionsList) {
      if (rolePermission.permissionId == accessPermission.permissionId) {
        rolePermission.permissionName = accessPermission.permissionName;
      }
    }
    for (let tableName of this.AllTableNamesList) {
      if (rolePermission.tableId == tableName.tableId) {
        rolePermission.tableName = tableName.tableName;
      }
    }
  }

  onCancel() {
    this.AddRolePermissionForm = this.formBuilder.group({
      roleName: ['', Validators.required],
    });
  }

  editPermission(row: any) {
    this.selectedRoleId = row.id;
    this.RolePermissionsList.forEach((element: any) => {
      if (element.sno == row.sno)
        element.editMode = true;
      else
        element.editMode = false;
    });
    var tempPermissionValue = $.grep(this.AccessPermissionsList, function (e: any) { return e.PermissionId == row.PermissionId });
    this.RolePermissionForm.controls['permission'].setValue(tempPermissionValue.length > 0 ? tempPermissionValue[0].permissionId : {});
  }

  saveRolePermission(row: any) {
    if (!this.RolePermissionForm.valid) {
      return false;
    }
    let requestData = {
      "id": row.id,
      "roleId": row.roleId,
      "moduleId": row.moduleId,
      "subModuleId": row.subModuleId,
      "permissionId": this.RolePermissionForm.value.permission,
      "tableId": row.tableId
    };
    this.rolePermissionsService.SaveRolepermission(requestData).subscribe((response) => {
      this.AddRolePermissionForm.controls['roleName'].setValue(row.roleId);
      this.getSelectedRole(row.roleId);
    }, error => {
      console.log(error);
    });
    return true;
  }
}
