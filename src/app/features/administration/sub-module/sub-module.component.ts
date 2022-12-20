import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotifierService } from 'src/app/notifier.service';
import { SendReceiveService } from 'src/app/shared/services/sendReceive.service';
import { ModuleService } from '../module/service/module.service';
import { SubModuleService } from './service/sub-module.service';

@Component({
  selector: 'app-sub-module',
  templateUrl: './sub-module.component.html',
  styleUrls: ['./sub-module.component.css']
})
export class SubModuleComponent implements OnInit {
  isAddSubModuleForm: boolean = false;
  AddSubModuleForm!: FormGroup;
  dataSource!: MatTableDataSource<any>;

  loginData: any;
  navList: any = [];
  permissionName: any;
  pagePermissions: any;
  pageno: number = 1


  MenuList: any = [];
  SubMenuList: any = [];
  filterData: any;
  gridData = [];
  editMode: any;
  editedSubMenu: any;
  errorMessage: any;
  Message: any;
  errorType: any;

  displayedColumns: string[] = ['sno', 'menuName', 'subMenuName', 'actions'];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(
    private formBuilder: FormBuilder,
    public moduleService: ModuleService,
    public subModuleService: SubModuleService,
    public sendReceiveService: SendReceiveService,
    private notifierService: NotifierService,
  ) { }

  ngOnInit(): void {
    this.filterData = {
      filterColumnNames: [
        { "Key": 'sno', "Value": "" },
        { "Key": 'menuName', "Value": "" },
        { "Key": 'subMenuName', "Value": "" },
      ],
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };

    this.AddSubModuleForm = this.formBuilder.group({
      menuName: [null, Validators.required],
      subMenuName: [null, Validators.required]
    });
    this.getSubMenus();
    this.setPageLevelPermissions();
  }
  onpaginatechange(event: any) {
    if (event.pageIndex === 0) {
      this.pageno = 1
      return
    }
    this.pageno = (event.pageIndex * event.pageSize) + 1
    return
  }


  onSubModuleSubmit() {
    if (this.AddSubModuleForm.valid) {
      console.log(this.editMode);
      if (this.editMode) {
        this.updateSubMenu();
      } else {
        this.addSubMenu();
      }
    }
  }

  updateSubMenu() {
    let editCheck = true;
    // console.log(this.AddSubModuleForm);
    // console.log(this.editedSubMenu);
    // console.log(this.MenuList);

    for (let subMenu of this.SubMenuList) {
      if (subMenu.moduleName == this.AddSubModuleForm.value.subMenuName) {
        editCheck = false;
        this.notifierService.showNotification('Error', "Sub Menu Already Exist");
        break;
      }
    }

    const data = {
      "subMenuId": this.editedSubMenu.subModuleId,
      "menuId": this.AddSubModuleForm.value.menuName,
      "subMenuName": this.AddSubModuleForm.value.subMenuName,
      "status": this.editedSubMenu.status
    }

    if (editCheck) {
      this.subModuleService.updateSubMenu(data).subscribe({
        next: (response) => {
          this.onCancel();
          this.getSubMenus();
          this.notifierService.showNotification('Success', response.message);
        },
        error: (error) => {
          console.log(error);
          this.notifierService.showNotification('Error', error.error.message);
        }
      });
    }
  }

  addSubMenu() {
    console.log();
    const data = {
      "menuId": this.AddSubModuleForm.value.menuName,
      "subMenuName": this.AddSubModuleForm.value.subMenuName
    }
    this.subModuleService.addSubMenu(data).subscribe({
      next: (response) => {
        this.onCancel();
        this.getSubMenus();
        this.notifierService.showNotification('Success', response.message);
      },
      error: (error) => {
        this.notifierService.showNotification('Error', error.error.message);
      }
    });
  }

  onCancel() {
    this.AddSubModuleForm.reset();
    this.isAddSubModuleForm = false;
    this.editMode = false;
    this.editedSubMenu = null;
  }

  onAddSubMenu() {
    this.editMode = false;
    this.isAddSubModuleForm = true;
    this.getMenus();
  }

  getMenus() {
    this.moduleService.getMenuList().subscribe({
      next: (data) => {
        this.MenuList = data;
      },
      error: (error) => {
        this.errorType = "Error";
        this.errorMessage = true;
        this.Message = "No Menu Found";
      }
    });
  }

  getSubMenus() {
    this.subModuleService.getSubMenuList().subscribe({
      next: (data) => {
        this.SubMenuList = data;
        console.log(this.SubMenuList);
        this.dataSource = new MatTableDataSource(this.SubMenuList);
        this.filterData.dataSource = this.dataSource;
        this.filterData.gridData = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.filterData.sort = this.sort;

      },
      error: (error) => {
        this.errorType = "Error";
        this.errorMessage = true;
        this.Message = "No data Found";
      }
    });
  }

  setPageLevelPermissions() {
    let data = localStorage.getItem("LoginData");
    if (data) {
      this.loginData = JSON.parse(data);
      this.navList = this.loginData.permissions;
      for (let permission of this.navList) {
        for (let submodule of permission.subModules) {
          if (submodule.subModuleName == "Sub Menus") {
            this.permissionName = submodule.permissionName;
            console.log(this.permissionName);
            this.pagePermissions = this.sendReceiveService.getPageLevelPermissions(this.permissionName);
          }
        }
      }
    }
  }

  updatePagination() {
    this.filterData.dataSource.paginator = this.paginator;
  }

  onActivateSubMenu(subMenu: any, event: MatSlideToggleChange) {
    console.log(subMenu);
    if (event.checked) {
      subMenu.active = 'Y';
    } else {
      subMenu.active = 'N';
    }

    const data = {
      "subMenuId": subMenu.subModuleId,
      "menuId": subMenu.moduleId,
      "subMenuName": subMenu.subModuleName,
      "status": subMenu.active
    }


    this.subModuleService.activateSubMenu(data).subscribe({
      next: (response) => {
        this.getSubMenus();
      },
      error: (error) => {

      }
    });
  }

  onEditSubMenu(subMenu: any) {
    console.log(subMenu);
    this.editMode = true;
    this.editedSubMenu = subMenu;
    this.getMenus();
    this.AddSubModuleForm.patchValue({
      menuName: this.editedSubMenu.moduleId.moduleId,
      subMenuName: this.editedSubMenu.subModuleName
    });
    this.isAddSubModuleForm = true;
  }

  onsubMenuDelete(subMenu: any) {
    console.log(subMenu);
    var message = 'Are you sure you want to delete?';
    this.sendReceiveService.confirmationDialog(message).subscribe({
      next: (result) => {
        if (!!result) {
          const data = {
            "subMenuId": subMenu.subModuleId,
            "menuId": subMenu.moduleId,
            "subMenuName": subMenu.subModuleName,
            "status": subMenu.status
          }
          this.subModuleService.deleteSubMenu(data).subscribe({
            next: (response) => {
              this.getSubMenus();
              this.notifierService.showNotification('Success', response.message);
            },
            error: (error) => {
              this.getSubMenus();
              this.notifierService.showNotification('Error', error.error.message);
            }
          });
        }
      }
    });
  }
}
