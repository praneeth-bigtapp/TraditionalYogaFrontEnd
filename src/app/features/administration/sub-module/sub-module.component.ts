import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
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

  MenuList: any = [];
  SubMenuList: any = [];
  filterData: any;
  editMode: any;
  editedRole: any;
  errorMessage: any;
  Message: any;
  errorType: any;

  displayedColumns: string[] = ['sno', 'subMenuName', 'actions'];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(
    private formBuilder: FormBuilder,
    public moduleService: ModuleService,
    public subModuleService: SubModuleService,
  ) { }

  ngOnInit(): void {
    this.filterData = {
      filterColumnNames: [
        { "Key": 'sno', "Value": "" },
        { "Key": 'subMenuName', "Value": "" },
      ],
      dataSource: this.dataSource,
    };

    this.AddSubModuleForm = this.formBuilder.group({
      menuName: [null, Validators.required],
      subMenuName: [null, Validators.required]
    });
    this.getSubMenus();
  }

  onAddSubModuleSubmit() {

  }

  onCancel() {
    this.AddSubModuleForm.reset();
    this.isAddSubModuleForm = false;
  }

  onAddMenu() {
    this.isAddSubModuleForm = true;
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
    this.AddSubModuleForm.patchValue({
      roleName: role.roleName
    });
    this.isAddSubModuleForm = true;
  }

  onRoleDelete(role: any) {

  }
}
