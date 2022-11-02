import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs/operators';
import { NotifierService } from 'src/app/notifier.service';
import { MyAppHttp } from 'src/app/shared/services/myAppHttp.service';
import { SendReceiveService } from 'src/app/shared/services/sendReceive.service';
import { TableConfiguratorService } from './service/table-configurator.service';

@Component({
  selector: 'app-table-configurator',
  templateUrl: './table-configurator.component.html'
})
export class TableConfiguratorComponent implements OnInit {
  displayedColumns: string[] = ['tableFieldName', 'templateAttribute', 'dataType', 'fieldLength', 'mandatoryOptional', 'defaultValue', 'isPrimaryKey', 'isForeignKey', 'FKTableName', 'FKTableFieldName', 'errorDesc', 'actions'];
  dataSource: any;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  loginData: any;
  tableConfigForm!: FormGroup;
  submodulesList: any = [];
  tablesList: any = [];
  templateList: any = [];
  tableName!: string;
  templateId: any;
  tableFieldForm!: FormGroup;
  tableFieldId: any = 0;
  tableFieldName: any;
  columns: any;
  FKTableFieldNamesList = [];
  dataTypes = [
    { "dataTypeName": "Integer" },
    { "dataTypeName": "Varchar" },
    { "dataTypeName": "Date" },
    { "dataTypeName": "Datetime" },
    { "dataTypeName": "Char" },
    { "dataTypeName": "Decimal" },
    { "dataTypeName": "Timestamp" },
    { "dataTypeName": "Boolean" },
  ]
  fkTableColName: any;
  errorMessage: any;
  Message: any;
  errorType: any;
  AlltablesList: any = [];

  constructor(private formBuilder: FormBuilder,
    private tableConfiguratorService: TableConfiguratorService,
    private sendReceiveService: SendReceiveService, private notifierService: NotifierService) {
    this.tableFieldForm = this.formBuilder.group({
      tableFieldName: ['', Validators.required],
      templateAttribute: ['', Validators.required],
      dataType: ['', Validators.required],
      fieldLength: ['', Validators.required],
      mandatoryOptional: ['', Validators.required],
      defaultValue: [''],
      isPrimaryKey: ['', Validators.required],
      isForeignKey: ['', Validators.required],
      fKTableName: ['', Validators.required],
      fKTableFieldName: ['', Validators.required],
      errorDesc: ['']
    });
  }

  ngOnInit(): void {
    this.tableConfigForm = this.formBuilder.group({
      subModuleName: ['', Validators.required],
      tableId: ['', Validators.required],
      templateId: ['', Validators.required]
    });
    this.getSubModulesList();
  }

  getSubModulesList() {
    let data = localStorage.getItem("LoginData");
    if (data) {
      this.loginData = JSON.parse(data);
      for (let menu of this.loginData.permissions) {
        for (let submenu of menu.submodules) {
          if (submenu.subModuleId !== 1 && submenu.subModuleId !== 2 && submenu.subModuleId !== 3 && submenu.subModuleId !== 14 && submenu.subModuleId !== 15  && submenu.subModuleId !== 17) {
            this.submodulesList.push(submenu);
          }
        }
      }
    }
  }

  onSelectModule(id: any) {
    this.dataSource = false;
    this.templateList = []
    let subModuleId = id.value;
    let currentTableList: any = [];
    this.tablesList = [];
    this.tableConfiguratorService.getTableNamesBySubModuleIdAndRoleId(this.loginData.roleId, subModuleId).subscribe((response) => {
      for (let element of response) {
        if (element.permissionId !== 6) {
          currentTableList.push(element);
        }
      }
      this.tablesList = currentTableList;
    });
  }

  onSelectTable(id: any, name: string) {
    this.dataSource = false;
    let tableId = id;
    this.tableName = name;
    this.templateList = [];
    this.removeSelectedTable(id);
    this.tableConfiguratorService.getTableTemplateByTableId(tableId).subscribe((response) => {
      let data = [];
      data.push(response);
      this.templateList = data;
    });
  }

  removeSelectedTable(id: any) {
    this.tableConfiguratorService.getAllTables().subscribe((tables: any) => {
      for (let [i, tableDetail] of tables.entries()) {
        if (tableDetail.tableId == id) {
          tables.splice(i, 1);
        }
      }
      this.AlltablesList = tables;
    })
  }

  onKeyPress(event: any) {
    const pattern = /[\d]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  getAllTemplates() {
    this.tableConfiguratorService.getAllTemplates().subscribe((response) => {
      this.templateList = response;
    });
  }

  onSelectTemplate(id: any) {
    this.templateId = id;
  }

  onTableConfigFormSubmit() {
    let tableId = this.tableConfigForm.value.tableId;
    let templateId = this.templateId;
    this.tableConfiguratorService.getTemplateDetails(tableId, templateId).pipe(take(1)).subscribe((response) => {

      let tableDetails = {
        "tableId": tableId,
        "tableName": this.tableName
      }
      if (response.message) {
        this.tableConfiguratorService.getTableColumns(tableDetails).subscribe((cols: any) => {
          this.columns = cols;
          this.dataSource = [{ editMode: true }]
        });
      } else {
        this.getColums(response, tableDetails)
      }
    });
  }

  getColums(response: any, tableDetails: any) {
    this.tableConfiguratorService.getTableColumns(tableDetails).pipe(take(1)).subscribe((colData: any) => {
      this.columns = [];
      for (let i = 0; i < colData.length; i++) {
        for (let j = 0; j < response.length; j++) {
          if (!(response.some((x: { tableFieldName: any; }) => x.tableFieldName === colData[i].columnName))) {
            this.columns.push(colData[i]);
          }
        }
      }
      this.checkNewtable(response);
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  checkNewtable(response: any) {
    let unique = (this.columns).filter((item: any, i: any, ar: string | any[]) => ar.indexOf(item) === i);
    this.columns = unique;
    for (let i = 0; i < response.length; i++) {
      response[i].editMode = false;
      if ((i + 1) == response.length) {
        response[i].isLastRow = true;
        if (this.columns.length == 0) {
          response[i].isLastRow = false;
        }
      } else {
        response[i].isLastRow = false;
      }
    }
    for (let res of response) {
      for (let table of this.AlltablesList) {
        if (res.fkTableId == table.tableId) {
          res.fkTableName = table.tableName;
        }
      }
    }
  }


  editTableField(row: any) {
    let tableDetails = {
      "tableId": this.tableConfigForm.value.tableId,
      "tableName": this.tableName
    }
    this.tableConfiguratorService.getTableColumns(tableDetails).subscribe((response) => {
      this.columns = response;
    });
    (this.dataSource.filteredData).forEach((element: any) => {
      if (element.tableFieldId == row.tableFieldId) {
        element.editMode = true;
        this.tableFieldId = row.tableFieldId;
        this.tableFieldName = row.tableFieldName;
        if (row.isFk == "Y") {
          this.tableFieldForm.controls['fKTableName'].enable();
          this.tableFieldForm.controls['fKTableFieldName'].enable();
        } else {
          this.tableFieldForm.controls['fKTableName'].disable();
          this.tableFieldForm.controls['fKTableFieldName'].disable();
        }
        for (let table of this.AlltablesList) {
          if (row.fkTableId == table.tableId) {
            let tableDetail = {
              tableId: table.tableId,
              tableName: table.tableName
            }
            this.onFKTableField(tableDetail);
          }
        }
        this.tableFieldForm.patchValue({
          tableFieldName: row.tableFieldName,
          templateAttribute: row.templateAttribute,
          dataType: row.dataType,
          fieldLength: row.fieldLength,
          mandatoryOptional: row.mandatoryOptional,
          defaultValue: row.defaultValue,
          isPrimaryKey: row.isPrimaryKey,
          isForeignKey: row.isFk,
          fKTableName: row.fkTableId,
          fKTableFieldName: row.fkTableFieldName,
          errorDesc: row.errorDesc
        });
        this.fkTableColName = row.fkTableFieldName;
        this.tableFieldForm.controls['tableFieldName'].disable();
      } else {
        element.editMode = false;
      }
    });
  }

  ontableFieldFormSubmit(row: any) {
    if (this.tableFieldForm.valid) {
      this.tableFieldForm.controls['tableFieldName'].enable();
      let tableFieldData =
      {
        "tableFieldId": row.tableFieldId ? row.tableFieldId : this.tableFieldId,
        "lastUpdateDatetime": new Date(),
        "latUpdateUser": this.loginData.userId,
        "templateId": this.templateId,
        "tableId": this.tableConfigForm.value.tableId,
        "tableFieldName": this.tableFieldForm.value.tableFieldName,
        "templateAttribute": this.tableFieldForm.value.templateAttribute,
        "dataType": this.tableFieldForm.value.dataType,
        "fieldLength": this.tableFieldForm.value.fieldLength,
        "mandatoryOptional": this.tableFieldForm.value.mandatoryOptional,
        "defaultValue": this.tableFieldForm.value.defaultValue,
        "isPrimaryKey": this.tableFieldForm.value.isPrimaryKey,
        "isFk": this.tableFieldForm.value.isForeignKey,
        "fkTableId": this.tableFieldForm.value.fKTableName,
        "fkTableFieldName": this.fkTableColName,
        "errorDesc": this.tableFieldForm.value.errorDesc
      }
      this.tableConfiguratorService.getSaveTemplateDetails(tableFieldData).subscribe((response) => {
        this.onTableConfigFormSubmit();
        this.notifierService.showNotification('Success', MyAppHttp.ToasterMessage.templateSuccess);
      }, error => {
        this.notifierService.showNotification('Error', error);
      });
    } else {
      this.tableFieldForm.markAllAsTouched();
    }
  }

  onAddTableField() {
    this.tableFieldForm.reset();
    (this.dataSource.filteredData).forEach((element: any) => {
      element.isLastRow = false;
    });
    let data = [];
    data = this.dataSource.filteredData;
    data.push({ editMode: true });
    this.dataSource = data;
  }

  onSelectIsForeignKey(event: any) {
    if (event.value == "Y") {
      this.tableFieldForm.controls['fKTableName'].enable();
      this.tableFieldForm.controls['fKTableFieldName'].enable();
    } else {
      this.fkTableColName="";
      this.tableFieldForm.controls['fKTableName'].disable();
      this.tableFieldForm.controls['fKTableFieldName'].disable();
    }
  }
  async onFKTableField(table: any) {
    let tableDetails = {
      tableId: table.tableId,
      tableName: table.tableName
    }
    let data = await this.tableConfiguratorService.getTableColumns(tableDetails).subscribe((response) => {
      this.FKTableFieldNamesList = response;
    });
  }

  onSelectFKTableFieldName(evt: any) {
    this.fkTableColName = evt.value;
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
