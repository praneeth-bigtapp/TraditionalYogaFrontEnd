import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotifierService } from 'src/app/notifier.service';
import { MyAppHttp } from 'src/app/shared/services/myAppHttp.service';
import { SendReceiveService } from 'src/app/shared/services/sendReceive.service';
import { ViewDataService } from './service/view-data.service';
import { Filterdatacolumns } from 'src/app/shared/models/excel-data.model';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.css']
})


export class ViewDataComponent implements OnInit {
  displayedColumns: string[] = ['sno', 'parentid', 'childid', 'startdate', 'enddate'];
  dataSource: any;
  loginData: any;
  submodulesList: any = [];
  viewDataForm!: FormGroup;
  tablesList: any = [];
  tableCols: any = [];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  tableName: any;
  pageSize = 10;
  errorMessage: any;
  Message: any;
  errorType: any;
  filterData: any;
  filtercolumnsarray: any = [];
  gridData: any = [];

  constructor(private formBuilder: FormBuilder, private viewDataService: ViewDataService,
    public sendReceiveService: SendReceiveService, public datepipe: DatePipe, private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.filterData = {
      filterColumnNames: [],
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };
    this.viewDataForm = this.formBuilder.group({
      subModuleName: ['', Validators.required],
      tableId: ['', Validators.required],
    });
    this.getSubModulesList();
  }

  getSubModulesList() {
    let data = localStorage.getItem("LoginData");
    if (data) {
      this.getSubModules(data);

    }
  }

  getSubModules(data: any) {
    this.loginData = JSON.parse(data);
    for (let menu of this.loginData.permissions) {
      for (let submenu of menu.submodules) {
        if (submenu.subModuleId !== 1 && submenu.subModuleId !== 2 && submenu.subModuleId !== 3 && submenu.subModuleId !== 15 && submenu.subModuleId !== 17) {
          this.submodulesList.push(submenu);
        }
      }
    }
    let tempSubModules = [];
    tempSubModules.push(...this.submodulesList)
    if (this.loginData.roleId != 5) {
      for (let i = 0; i < this.submodulesList.length; i++) {
        if (this.submodulesList[i].subModuleId == 14) {
          tempSubModules.splice(i, 1);
        }
      }
    }
    this.submodulesList = tempSubModules;
  }

  onSelectModule(id: any) {
    this.setGridEmpty();
    let subModuleId = id.value;
    let currentTableList: any = [];
    this.tablesList = [];
    this.viewDataService.getTableNamesBySubModuleIdAndRoleId(this.loginData.roleId, subModuleId).subscribe((response) => {
      for (let element of response) {
        if (element.permissionId !== 6) {
          currentTableList.push(element);
        }
      }
      this.tablesList = currentTableList;
    });
  }

  onSelectTableName(name: any) {
    this.setGridEmpty();
    this.tableName = name;
  }

  onViewDataFormSubmit() {
    this.setGridEmpty();
    let obj = {
      "tableId": this.viewDataForm.value.tableId,
      "tableName": this.tableName.trim()
    }
    this.dataSource = false;
    if (this.viewDataForm.valid) {
      this.viewDataService.getViewData(obj).subscribe(response => {
        if (response.length > 0) {
          this.getData(response);
        } else {
          this.notifierService.showNotification('Warning', MyAppHttp.ToasterMessage.noData);
        }
      });
    }
  }

  getData(response: any) {
    this.tableCols = [];
    let allTableColumns = Object.keys(response[0]);
    let tempCol = [];
    for (let allTableCol of allTableColumns) {
      if (allTableCol.substring(0, 10) !== "SRC_RECORD") {
        this.tableCols.push(allTableCol);
      }
    }
    tempCol.push(...this.tableCols);
    this.tableCols = this.tableCols.splice(2, tempCol.length);
    this.tableCols.push(tempCol[0], tempCol[1]);
    this.filterData.filterColumnNames = [];
    for (let tableCol of this.tableCols) {
      let temptable: Filterdatacolumns = { Key: tableCol, Value: " " }
      this.filterData.filterColumnNames.push(temptable);
    }
    for (let resp of response) {
      resp.LAST_UPDATE_DATE_TIME = this.datepipe.transform(resp.LAST_UPDATE_DATE_TIME, 'yyyy-MM-dd hh:mm:ss');
    }
    this.filterData.gridData = response;
    this.dataSource = new MatTableDataSource(response);
    this.filterData.dataSource = this.dataSource;
    this.dataSource.paginator = this.paginator;
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.filterData.sort = this.sort;
    }, 1000);
    for (let col of this.filterData.filterColumnNames) {
      col.Value = '';
    }
  }

  setMessage(type: any, message: any) {
    this.errorMessage = true;
    this.errorType = type;
    this.Message = message;
    setTimeout(() => {
      this.errorMessage = false;
    }, MyAppHttp.notificationTimeOut);
  }

  updatePagination() {
    this.filterData.dataSource.paginator = this.paginator;
  }

  setGridEmpty() {
    this.filterData = {
      filterColumnNames: [],
      gridData: [],
      dataSource: undefined,
      paginator: undefined,
      sort: undefined
    };
    this.dataSource = false;
  }
}
