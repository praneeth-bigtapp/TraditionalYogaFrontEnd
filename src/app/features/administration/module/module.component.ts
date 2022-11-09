import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { data } from 'jquery';
import { ModuleService } from './service/module.service';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {
  isAddModuleForm: boolean = false;
  AddModuleForm!: FormGroup;
  dataSource!: MatTableDataSource<any>;

  MenuList: any = [];
  filterData: any;
  editMode: any;
  editedRole: any;
  errorMessage: any;
  Message: any;
  errorType: any;

  displayedColumns: string[] = ['sno', 'menuName', 'actions'];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(
    private formBuilder: FormBuilder,
    public moduleService: ModuleService,
  ) { }

  ngOnInit(): void {
    this.filterData = {
      filterColumnNames: [
        { "Key": 'sno', "Value": "" },
        { "Key": 'menuName', "Value": "" },
      ],
      dataSource: this.dataSource,
    };
    this.AddModuleForm = this.formBuilder.group({
      menuName: [null, Validators.required]
    });
    this.getMenus();
  }

  onAddModuleSubmit() {

  }

  onCancel() {
    this.AddModuleForm.reset();
    this.isAddModuleForm = false;
  }

  onAddMenu() {
    this.isAddModuleForm = true;
  }

  getMenus() {
    this.moduleService.getMenuList().subscribe({
      next: (data) => {
        // for (let resp of data) {
        //   this.MenuList.push(resp);
        // }
        this.MenuList = data;
        console.log(this.MenuList);
        this.dataSource = new MatTableDataSource(this.MenuList);
        this.filterData.dataSource = this.dataSource;
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

  onActivateRole(role: any, event: MatSlideToggleChange) {
    if (event.checked) {
      role.active = 'Y';
    } else {
      role.active = 'N';
    }
    // this.rolesService.saveRole(role).subscribe((response) => {
    //   this.getRoles();
    // })
  }

  onEditRole(role: any) {
    this.editMode = true;
    this.editedRole = role;
    this.AddModuleForm.patchValue({
      roleName: role.roleName
    });
    this.isAddModuleForm = true;
  }

  onRoleDelete(role: any) {
    var message = 'Are you sure you want to delete?';
    // this.sendReceiveService.confirmationDialog(message).subscribe((result) => {
    //   if (!!result) {
    //     this.rolesService.deleteRole(role).subscribe((response) => {
    //       if (response.statusCode == 200) {
    //         this.getRoles();
    //         this.notifierService.showNotification('Success', response.message);
    //       } else {
    //         this.notifierService.showNotification('Error', response.message);
    //       }
    //     }, error => {
    //       console.log(error);
    //     });
    //   }
    // });
  }

}
