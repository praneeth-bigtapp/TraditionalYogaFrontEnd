import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { data } from 'jquery';
import { NotifierService } from 'src/app/notifier.service';
import { SendReceiveService } from 'src/app/shared/services/sendReceive.service';
import { ModuleService } from './service/module.service';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  gridData = [];
  isAddModuleForm: boolean = false;
  AddModuleForm!: FormGroup;
  dataSource!: MatTableDataSource<any>;


  pageno: number = 1

  onpaginatechange(event: any) {
    if (event.pageIndex === 0) {
      this.pageno = 1
      return
    }
    this.pageno = (event.pageIndex * event.pageSize) + 1
    return
  }


  loginData: any;
  navList: any = [];
  permissionName: any;
  pagePermissions: any;

  MenuList: any = [];
  filterData: any;
  editMode: any;
  editedMenu: any;
  errorMessage: any;
  Message: any;
  errorType: any;

  displayedColumns: string[] = ['sno', 'menuName', 'actions'];

  constructor(
    private formBuilder: FormBuilder,
    public moduleService: ModuleService,
    public sendReceiveService: SendReceiveService,
    private notifierService: NotifierService,
  ) { }

  ngOnInit(): void {
    this.filterData = {
      filterColumnNames: this.displayedColumns.map((ele: any) => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };
    this.AddModuleForm = this.formBuilder.group({
      menuName: [null, Validators.required]
    });
    this.getMenus();
    this.setPageLevelPermissions();
  }

  onModuleSubmit() {
    if (this.AddModuleForm.valid) {
      console.log(this.editMode);
      if (this.editMode) {
        this.updateMenu();
      } else {
        this.addMenu();
      }
    }
  }

  updateMenu() {
    let editCheck = true;
    console.log(this.AddModuleForm.value.menuName);
    console.log(this.editedMenu);
    console.log(this.MenuList);

    for (let menu of this.MenuList) {
      if (menu.moduleName == this.AddModuleForm.value.menuName) {
        editCheck = false;
        this.notifierService.showNotification('Error', "Menu Already Exist");
        break;
      }
    }

    const data = {
      "moduleId": this.editedMenu.moduleId,
      "moduleName": this.AddModuleForm.value.menuName,
      "status": this.editedMenu.status
    }

    if (editCheck) {
      this.moduleService.updateMenu(data).subscribe({
        next: (response) => {
          this.onCancel();
          this.getMenus();
          this.notifierService.showNotification('Success', response.message);
        },
        error: (error) => {
          console.log(error);
          this.notifierService.showNotification('Error', error.error.message);
        }
      });
    }
  }

  addMenu() {
    const data = {
      "moduleName": this.AddModuleForm.value.menuName
    }
    this.moduleService.addMenu(data).subscribe({
      next: (response) => {
        this.onCancel();
        this.getMenus();
        this.notifierService.showNotification('Success', response.message);
      }, error: (error) => {
        this.notifierService.showNotification('Error', error.error.message);
      }
    });
  }

  onCancel() {
    this.AddModuleForm.reset();
    this.isAddModuleForm = false;
    this.editedMenu = null;
  }

  onAddMenu() {
    this.isAddModuleForm = true;
    this.editMode = false
  }

  getMenus() {
    this.moduleService.getMenuList().subscribe({
      next: (data) => {
        // for (let resp of data) {
        //   this.MenuList.push(resp);
        // }
        this.MenuList = data;
        console.log(this.MenuList);
        this.dataSource = new MatTableDataSource<any>(this.MenuList)
        this.filterData.gridData = this.MenuList;
        this.filterData.dataSource = this.dataSource;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.filterData.sort = this.sort;
        for (let col of this.filterData.filterColumnNames) {
          col.Value = '';
        }
      },
      error: (error) => {
        this.errorType = "Error";
        this.errorMessage = true;
        this.Message = "No data Found";
      }
    });
  }

  updatePagination() {
    this.filterData.dataSource.paginator = this.paginator;
  }

  onActivateMenu(menu: any, event: MatSlideToggleChange) {
    console.log(menu);
    if (event.checked) {
      menu.status = 'Y';
    } else {
      menu.status = 'N';
    }
    this.moduleService.activateMenu(menu).subscribe((response) => {
      this.getMenus();
    });
  }

  onEditModule(menu: any) {
    this.editMode = true;
    this.editedMenu = menu;
    console.log(this.editedMenu);
    this.AddModuleForm.patchValue({
      menuName: menu.moduleName
    });
    this.isAddModuleForm = true;
  }

  onModuleDelete(menu: any) {
    var message = 'Are you sure you want to delete?';
    this.sendReceiveService.confirmationDialog(message).subscribe({
      next: (result) => {
        if (!!result) {
          this.moduleService.deleteMenu(menu).subscribe({
            next: (response) => {
              this.getMenus();
              this.notifierService.showNotification('Success', response.message);
            },
            error: (error) => {
              this.notifierService.showNotification('Error', error.error.message);
            }
          });
        }
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
          if (submodule.subModuleName == "Menus") {
            this.permissionName = submodule.permissionName;
            console.log(this.permissionName);
            this.pagePermissions = this.sendReceiveService.getPageLevelPermissions(this.permissionName);
          }
        }
      }
    }
  }

}
