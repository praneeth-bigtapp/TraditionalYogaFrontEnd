import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
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

  MenuList: any = [];
  SubMenuList: any = [];
  filterData: any;
  editMode: any;
  editedSubMenu: any;
  errorMessage: any;
  Message: any;
  errorType: any;

  displayedColumns: string[] = ['sno', 'menuName' ,'subMenuName', 'actions'];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

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
      dataSource: this.dataSource,
    };

    this.AddSubModuleForm = this.formBuilder.group({
      menuName: [null, Validators.required],
      subMenuName: [null, Validators.required]
    });
    this.getSubMenus();
    this.setPageLevelPermissions();
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
    console.log(this.AddSubModuleForm.value.menuName);
    console.log(this.editedSubMenu);
    console.log(this.MenuList);

    for (let subMenu of this.SubMenuList) {
      if (subMenu.moduleName == this.AddSubModuleForm.value.subMenuName) {
        editCheck = false;
        this.notifierService.showNotification('Error', "Sub Menu Already Exist");
        break;
      }
    }

    const data = {
      "subModuleId": this.editedSubMenu.subModuleId,
      "moduleId": this.editedSubMenu.moduleId,
      "subModuleName": this.AddSubModuleForm.value.subMenuName,
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
    console.log(  );
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
    this.subModuleService.activateSubMenu(subMenu).subscribe({
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
      menuName: this.editedSubMenu.moduleId,
      subMenuName: this.editedSubMenu.subModuleName
    });
    this.isAddSubModuleForm = true;
  }

  onsubMenuDelete(subMenu: any) {

  }
}
