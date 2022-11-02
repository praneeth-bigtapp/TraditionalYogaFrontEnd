import { Component, Input, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { TableData } from 'src/app/shared/models/excel-data.model';
import { MyAppHttp } from 'src/app/shared/services/myAppHttp.service';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { SendReceiveService } from 'src/app/shared/services/sendReceive.service';
import { TableDataService } from '../../services/table-data.service';
import { take } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { ViewDataService } from 'src/app/features/view-data/service/view-data.service';


import { NotifierService } from 'src/app/notifier.service';

type AOA = any[][];

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  @Input() inputSubModuleId: number = 0;
  tablesListWithPermissionId: any = [];
  loginData: any;
  subModuleId: any;
  data!: AOA;
  tableData!: TableData;
  tableUploadForm!: FormGroup;
  tableName: any;
  fileName: any;
  files: any[] = [];
  invalidrecords: { [key: string]: string }[] = [];
  columnList: string[] = [];
  isSpinner: boolean = false;
  templateDetails: any;
  validationFlag1: boolean = false;
  validationFlag2: boolean = false;
  validationFlag3: boolean = false;
  validationFlag4: boolean = false;
  finalFlagValidation: boolean = false;
  templateDetailsNotFound: boolean = false;
  @ViewChild(FormGroupDirective, { static: false }) formDirective!: FormGroupDirective;
  FKTableInfo: any = [];
  currentTableData: any;
  primaryKeyFlag: boolean = false;
  pkArray: any = [];
  errorMessage: any;
  Message: any;
  errorType: any;
  submodelPermissionid: any;
  templatePermission: any;
  strActions = "";
  dateErrorMsg!: string;
  AlltablesList: any = [];

  constructor(private tableDataService: TableDataService,
    private formBuilder: FormBuilder,
    public sendReceiveService: SendReceiveService, public datepipe: DatePipe
    , private viewDataService: ViewDataService, private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.tableUploadForm = this.formBuilder.group({
      tableId: ['', Validators.required],
    });
    this.getTableNamesList();
    this.getAllTables();
  }

  getTableNamesList() {
    let data = localStorage.getItem("LoginData");
    if (data) {
      this.getSubmoduleID(data);
      this.tableDataService.getTableNamesBySubModuleIdAndRoleId(this.loginData.roleId, this.subModuleId).pipe(take(1)).subscribe((response) => {
        for (let element of response) {
          if (element.permissionId !== 6) {
            this.tablesListWithPermissionId.push(element);
          }
        }
      });
    }
  }

  getAllTables() {
    this.tableDataService.getAllTables().subscribe((tables: any) => {
      this.AlltablesList = tables;
    });
  }

  getSubmoduleID(data: any) {
    this.loginData = JSON.parse(data);
    for (let Module of (this.loginData.permissions)) {
      for (let subModule of Module.submodules) {
        if (subModule.subModuleId == this.inputSubModuleId) {
          this.subModuleId = subModule.subModuleId;
        }
      }
    }
  }

  onFileChange(evt: any) {
    this.invalidrecords = [];
    this.columnList = [];
    const file = evt.target.files[0];
    let fileExtension = file.name.split('.').pop();
    this.fileName = file.name.substr(0, file.name.lastIndexOf("."));
    if (fileExtension == "xlsx" || fileExtension == "xls") {
      this.files = evt.target.files;
      /* wire up file reader */
      const target: DataTransfer = <DataTransfer>(evt.target);
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary', cellDates: true });

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      };
      reader.readAsBinaryString(target.files[0]);
    }
    else {
      this.notifierService.showNotification("Error", MyAppHttp.ToasterMessage.onlyExcel);
    }
  }

  getTableName(tableDetails: any) {
    this.tableName = tableDetails.tableName;
    this.invalidrecords = [];
    this.files = [];
  }

  ontableUploadSubmit() {
    if (this.tableUploadForm.valid && this.isTemplateEmpty()) {
      this.tableDataService.getTableTemplateByTableId(this.tableUploadForm.value.tableId).pipe(take(1)).subscribe((response) => {
        this.templatePermission = this.sendReceiveService.getTemplatePermissions(response.actionId);
        this.strActions = this.templatePermission.join(' or ');
        this.tableDataService.getTemplateDetails(this.tableUploadForm.value.tableId, response.templateId).pipe(take(1)).subscribe((templateDetails) => {
          this.templateDetailsNotFound = false;
          if (templateDetails.message) {
            this.templateDetailsNotFound = true;
          } else {
            this.getTableData(templateDetails);
          }
        }, (error) => { console.log(error) });
      });
    }
  }

  getTableData(response: any,) {
    let fkTableDetails: any = [];
    let pkTableDetails;
    this.templateDetails = response;
    this.primaryKeyFlag = true;
    for (let template of this.templateDetails) {
      ({ fkTableDetails, pkTableDetails } = this.getPKFKDetails(template, fkTableDetails, pkTableDetails));
    }
    fkTableDetails = this.removeDuplicates(fkTableDetails);
    if (fkTableDetails.length > 0) {
      this.getForeignKeyTableData(pkTableDetails, fkTableDetails);
    } else if (pkTableDetails) {
      this.getPrimaryKeyTableData(pkTableDetails);
    } else {
      this.getNoPrimaryKeyTableData();
    }
  }

  removeDuplicates(fkTableDetails: any) {
    let newArray = [];
    let uniqueObject: any = {};
    let objTitle: any;
    for (let i in fkTableDetails) {
      objTitle = fkTableDetails[i]['tableId'];
      uniqueObject[objTitle] = fkTableDetails[i];
    }
    for (let i in uniqueObject) {
      newArray.push(uniqueObject[i]);
    }
    return newArray;
  }

  private getPKFKDetails(template: any, fkTableDetails: any, pkTableDetails: any) {
    if (template.isFk == 'Y') {
      let tableId = template.fkTableId;
      let tableName;
      for (let tableWithPermissionId of this.AlltablesList) {
        if (tableWithPermissionId.tableId == tableId) {
          tableName = tableWithPermissionId.tableName;
        }
      }
      fkTableDetails.push({ "tableId": tableId, "tableName": tableName });
    }
    if (template.isPrimaryKey == 'Y' && this.primaryKeyFlag) {
      pkTableDetails = { "tableId": this.tableUploadForm.value.tableId, "tableName": this.tableName };
    }
    return { fkTableDetails, pkTableDetails };
  }

  getForeignKeyTableData(pkTableDetails: any, fkTableDetails: any) {
    this.viewDataService.getViewData(pkTableDetails).pipe(take(1)).subscribe(async (pkTableData) => {
      this.currentTableData = pkTableData;
      this.FKTableInfo = [];
      for (let [i, table] of fkTableDetails.entries()) {
        let fkTableData = await this.viewDataService.getViewDataFK(table);
        let tempObj: any = {};
        tempObj['tableId'] = table.tableId;
        tempObj['tableName'] = table.tableName;
        tempObj["data"] = fkTableData;
        this.FKTableInfo.push(tempObj);
        if (i == (fkTableDetails.length - 1)) {
          this.validateExcelFile();
        }
      }
    });
  }

  getPrimaryKeyTableData(pkTableDetails: any) {
    this.viewDataService.getViewData(pkTableDetails).pipe(take(1)).subscribe((pkTableData) => {
      this.currentTableData = pkTableData;
      this.validateExcelFile();
    });
  }

  getNoPrimaryKeyTableData() {
    let TableDetails = {
      "tableId": this.tableUploadForm.value.tableId,
      "tableName": this.tableName
    }
    this.sendReceiveService.confirmationDialog(MyAppHttp.ToasterMessage.PrimaryKeyNotSetup).subscribe((result) => {
      console.log(result)
      if (result) {
        this.viewDataService.getViewData(TableDetails).pipe(take(1)).subscribe((TabData: any) => {
          this.currentTableData = TabData;
          this.validateExcelFile();
        });
      }
    });
  }

  validateExcelFile() {
    this.tableData = {
      columnList: this.data[3],
      tableId: this.tableUploadForm.value.tableId,
      templateName: this.fileName,
      tableValues: [],
      tableName: this.data[0][1],
      invalidRecords: [],
    }
    for (let i = 5; i < (this.data.length); i++) {
      for (let j = 0; j < (this.data[i].length); j++) {
        if (this.data[i][j] instanceof Date) {
          this.data[i][j].setDate(this.data[i][j].getDate() + 1);
          this.data[i][j] = this.datepipe.transform(this.data[i][j], 'yyyy-MM-dd');
        }
      }
    }
    this.checkExcelValidations();
    if (this.finalFlagValidation) {
      if (this.templateDetailsNotFound) {
        this.notifierService.showNotification('Error', MyAppHttp.ToasterMessage.templateValidation);
        return;
      }
      let columnsLength = this.data[3].length;
      if ((columnsLength - 1) !== this.templateDetails.length) {
        this.notifierService.showNotification('Error', MyAppHttp.ToasterMessage.columnsCount);
        return;
      }
      for (let templateDetails of this.templateDetails) {
        if (!(this.data[3].includes(templateDetails.tableFieldName))) {
          this.notifierService.showNotification('Error', MyAppHttp.ToasterMessage.excelColumns);
          return;
        }
      }
      this.isSpinner = true;
      let validRecords = [];
      let row;
      let isValid = true;
      let pushError = false;
      for (let k = 5; k < this.data.length; k++) {
        isValid = true;
        row = this.data[k];
        pushError = false;
        if (this.templatePermission.includes(row[0])) {
          let rowErrors: any = [];
          for (let i = 0; i < this.tableData.columnList.length; i++) {
            for (let j = 0; j < this.templateDetails.length; j++) {
              if (this.tableData.columnList[i] == this.templateDetails[j].tableFieldName) {
                if (row[0] == "NEW" || row[0] == "UPD") {
                  isValid = this.DataTypeValidation(k, i, j, isValid, rowErrors);
                }
                else {
                  if (this.templatePermission.includes(row[0])) {
                    if (row[0] == "DEL") {
                      isValid = !!isValid;
                      this.data[k][i] = this.RemoveTrailingSpaces(this.data[k][i]);
                      if (this.data[k][i] == undefined || this.data[k][i] == null || this.data[k][i] == "") {
                        isValid = this.checkPrimaryKeyMandatory(j, k, isValid, rowErrors);
                      }
                    }
                  }
                }
                if (!isValid) {
                  pushError = true;
                }
              }
            }
          }
          if (!pushError) {
            validRecords.push(row);
          } else {
            this.tableData.invalidRecords.push(this.getAsObject(this.data[k].join('||'), rowErrors.join(";")));
          }
        } else {
          this.tableData.invalidRecords.push(this.getAsObject(this.data[k].join("||"), MyAppHttp.ToasterMessage.invalidActionPermission1 + this.strActions + MyAppHttp.ToasterMessage.invalidActionPermission2));
        }

      }
      this.tableData.tableValues.push(...validRecords);
      this.CompareDates();
      //primary key
      let pkArrayIndex = [];
      this.pkArray = [];
      for (let template of this.templateDetails) {
        if (template.isPrimaryKey == 'Y') { this.pkArray.push(template.tableFieldName); }
      }
      for (let pkElm of this.pkArray) { pkArrayIndex.push(this.tableData.columnList.indexOf(pkElm)); }
      let recordsBeforePKvalidation = [];
      recordsBeforePKvalidation.push(...this.tableData.tableValues);
      for (let validatePKRecord of this.tableData.tableValues) {
        if (this.checkPrimaryKey(validatePKRecord, this.pkArray, pkArrayIndex, validatePKRecord[0])) {
          // valid primary key
        } else {
          if (this.currentTableData.length > 0) {
            this.currentDataExist(validatePKRecord, recordsBeforePKvalidation);
          }
          else {
            this.noCurrentData(validatePKRecord, recordsBeforePKvalidation);
          }
        }
      }
      this.tableData.tableValues = recordsBeforePKvalidation;
      this.invalidrecords = [];
      this.RolepermissionValidate(this.tableData.tableValues);
      this.setEmptyCols(this.tableData.tableValues);
      this.transformInvalidRecordswithCount();
      this.tableDataService.uploadTableData(this.tableData).pipe(take(1)).subscribe(response => {
        if (response.invalidCount > 0) {
          this.invalidRecordsExists(response);
        } else {
          this.notifierService.showNotification('Success',
            MyAppHttp.ToasterMessage.uploadSuccess +
            " \nTotal number of records processed: " + response.totalCount +
            ", \nInserted records: " + response.insertedCount +
            ", \nUpdated records: " + response.updatedCount +
            ", \nDeleted records: " + response.deletedCount +
            ", \nInvalid records: " + response.invalidCount);
        }
        this.isSpinner = false;
      }, (error) => {
        this.isSpinner = false;
        console.log(error);
      });

    }
  }

  transformInvalidRecordswithCount() {
    this.tableData.invalidRecords.forEach((record: any) => {
      Object.entries(record).forEach(([key, value]) => {
        let currentKeyValue = "";
        let reasonArray: string[] = record[key].split(";");
        reasonArray.forEach((message: string, i: number) => { currentKeyValue += '(' + (i + 1) + ')' + message + "; "; });
        record[key] = currentKeyValue;
      });
    });
  }

  CompareDates() {
    let recordsBeforeDatesCompare = [];
    recordsBeforeDatesCompare.push(...this.tableData.tableValues);
    let firstIndex = this.getDateFirstIndex();
    let secondIndex = this.getDateSecondIndex();
    if (firstIndex && secondIndex) {
      for (let row of this.tableData.tableValues) {
        if (row[firstIndex] && row[secondIndex]) {
          if (this.CompareTwoDates(firstIndex, secondIndex, row)) {
            //if it is true
          } else {
            this.tableData.invalidRecords.push(this.getAsObject(row.join("||"), this.dateErrorMsg));
            let index = recordsBeforeDatesCompare.indexOf(row);
            recordsBeforeDatesCompare.splice(index, 1);
          }
        }
      }
      this.tableData.tableValues = recordsBeforeDatesCompare;
    }
  }

  getDateFirstIndex() {
    for (let template of this.templateDetails) {
      if (template.tableFieldName == 'MATURITY') {
        this.dateErrorMsg = template.errorDesc;
        return this.tableData.columnList.indexOf(template.tableFieldName);
      }
    }
  }

  getDateSecondIndex() {
    for (let template of this.templateDetails) {
      if (template.tableFieldName == 'ISSUE_DT') {
        return this.tableData.columnList.indexOf(template.tableFieldName);
      }
    }
  }

  CompareTwoDates(firstIndex: any, secondIndex: any, row: any) {
    return row[firstIndex] > row[secondIndex];
  }

  private noCurrentData(validatePKRecord: any, recordsBeforePKvalidation: any[]) {
    if (validatePKRecord[0] == "NEW") {
      this.tableData.invalidRecords.push(this.getAsObject(validatePKRecord.join("||"), MyAppHttp.ToasterMessage.RecorddoesexistsPK));
      let index = recordsBeforePKvalidation.indexOf(validatePKRecord);
      recordsBeforePKvalidation.splice(index, 1);
    } else if (validatePKRecord[0] == "DEL") {
      this.recordDoesExistPK(validatePKRecord, recordsBeforePKvalidation);
    }
    else if (validatePKRecord[0] == "UPD") {
      this.recordDoesExistPK(validatePKRecord, recordsBeforePKvalidation);
    } else {
      this.tableData.invalidRecords.push(this.getAsObject(validatePKRecord.join("||"), validatePKRecord[0] + MyAppHttp.ToasterMessage.invalidActionCol));
      let index = recordsBeforePKvalidation.indexOf(validatePKRecord);
      recordsBeforePKvalidation.splice(index, 1);
    }
  }

  private currentDataExist(validatePKRecord: any, recordsBeforePKvalidation: any[]) {
    if (validatePKRecord[0] == "NEW") {
      this.tableData.invalidRecords.push(this.getAsObject(validatePKRecord.join("||"), MyAppHttp.ToasterMessage.duplicateEntry));
      let index = recordsBeforePKvalidation.indexOf(validatePKRecord);
      recordsBeforePKvalidation.splice(index, 1);
    } else if (validatePKRecord[0] == "DEL") {
      this.tableData.invalidRecords.push(this.getAsObject(validatePKRecord.join("||"), MyAppHttp.ToasterMessage.deleteAction));
      let index = recordsBeforePKvalidation.indexOf(validatePKRecord);
      recordsBeforePKvalidation.splice(index, 1);
    }
    else if (validatePKRecord[0] == "UPD") {
      this.tableData.invalidRecords.push(this.getAsObject(validatePKRecord.join("||"), MyAppHttp.ToasterMessage.UpdateAction));
      let index = recordsBeforePKvalidation.indexOf(validatePKRecord);
      recordsBeforePKvalidation.splice(index, 1);
    }
    else {
      this.tableData.invalidRecords.push(this.getAsObject(validatePKRecord.join("||"), validatePKRecord[0] + MyAppHttp.ToasterMessage.invalidActionCol));
      let index = recordsBeforePKvalidation.indexOf(validatePKRecord);
      recordsBeforePKvalidation.splice(index, 1);
    }
  }

  private invalidRecordsExists(response: any) {
    let obj: { [key: string]: string; } = {};
    let invalidRecords = new Array();
    this.columnList = [...this.tableData.columnList, "REASON"];
    response.invalidRecords.forEach((record: any) => {
      Object.entries(record).forEach(([key, value]) => {
        let keys: string[] = key.split("||");
        for (let i = 0; i < this.tableData.columnList.length; i++) {
          if (keys[i] === "NULL") { keys[i] = ""; }
          obj[this.tableData.columnList[i]] = keys[i];
        }
        obj["REASON"] = value as string;
        invalidRecords.push({ ...obj });
      });
    })

    this.invalidrecords = invalidRecords;
    this.notifierService.showNotification('Success',
      MyAppHttp.ToasterMessage.uploadSuccess +
      " \nTotal number of records processed: " + response.totalCount +
      ", \nInserted records: " + response.insertedCount +
      ", \nUpdated records: " + response.updatedCount +
      ", \nDeleted records: " + response.deletedCount +
      ", \nInvalid records: " + response.invalidCount);
  }

  private recordDoesExistPK(validatePKRecord: any, recordsBeforePKvalidation: any[]) {
    this.tableData.invalidRecords.push(this.getAsObject(validatePKRecord.join("||"), MyAppHttp.ToasterMessage.RecorddoesexistsPK));
    let index = recordsBeforePKvalidation.indexOf(validatePKRecord);
    recordsBeforePKvalidation.splice(index, 1);
  }

  private DataTypeValidation(k: number, i: number, j: number, isValid: boolean, rowErrors: any) {
    this.data[k][i] = this.RemoveTrailingSpaces(this.data[k][i]);
    if (this.data[k][i] == undefined || this.data[k][i] == null || this.data[k][i] == "") {
      isValid = this.validateMandatory(j, k, isValid, rowErrors);
    }
    else if (this.templateDetails[j].dataType.toLowerCase() == "varchar") {
      isValid = this.validateVarchar(j, k, i, isValid, rowErrors);
    }
    else if (this.templateDetails[j].dataType.toLowerCase() == "number" || this.templateDetails[j].dataType.toLowerCase() == "integer") {
      isValid = this.validateInteger(k, i, j, isValid, rowErrors);
    }
    else if (this.templateDetails[j].dataType.toLowerCase() == "char") {
      isValid = this.validateChar(k, i, j, isValid, rowErrors);
    }
    else if (this.templateDetails[j].dataType.toLowerCase() == "decimal") {
      isValid = this.validateDecimal(k, i, j, isValid, rowErrors);
    }
    else if (this.templateDetails[j].dataType.toLowerCase() == "date") {
      isValid = this.validateDate(k, i, j, isValid, rowErrors);
    }
    else if (this.templateDetails[j].dataType.toLowerCase() == "datetime") {
      isValid = this.validateDateTime(k, i, j, isValid, rowErrors);
    }
    else if (this.templateDetails[j].dataType.toLowerCase() == "boolean") {
      isValid = this.validateBoolean(k, i, j, isValid, rowErrors);
    }
    else if (this.templateDetails[j].dataType.toLowerCase() == "timestamp") {
      isValid = this.validateTimestamp(k, i, j, isValid, rowErrors);
    }
    //foreign key
    if (this.templateDetails[j].isFk == 'Y' && this.data[k][i].length !== 0) {
      isValid = this.checkForeignKey(j, k, i, isValid, rowErrors);
    }
    return isValid;
  }

  private validateMandatory(j: number, k: number, isValid: boolean, rowErrors: any) {
    if (this.templateDetails[j].mandatoryOptional == "Mandatory") {
      isValid = false;
      rowErrors.push(this.templateDetails[j].tableFieldName + MyAppHttp.ToasterMessage.nullMessage);
    }
    return isValid;
  }

  checkPrimaryKeyMandatory(j: number, k: number, isValid: boolean, rowErrors: any) {
    if (this.templateDetails[j].isPrimaryKey == "Y") {
      isValid = false;
      rowErrors.push(this.templateDetails[j].tableFieldName + MyAppHttp.ToasterMessage.nullMessage);
    }
    return isValid;
  }

  private checkForeignKey(j: number, k: number, i: number, isValid: boolean, rowErrors: any) {
    let fkColName = this.templateDetails[j].fkTableFieldName;
    for (let table of this.FKTableInfo) {
      if (table.tableId == this.templateDetails[j].fkTableId) {
        let fkArray = [];
        for (let fktable of table.data) {
          fkArray.push(fktable[fkColName]);
        }
        if (!(fkArray.includes(this.data[k][i]))) {
          rowErrors.push(this.templateDetails[j].errorDesc + " " + this.data[k][i])
          return false;
        }
      }
    }
    return true;
  }

  private validateTimestamp(k: number, i: number, j: number, isValid: boolean, rowErrors: any) {
    let timestampPattern = (new Date(this.data[k][i])).getTime() > 0;
    if (!timestampPattern) {
      isValid = false;
      rowErrors.push(MyAppHttp.ToasterMessage.dataType1 + this.templateDetails[j].tableFieldName
        + MyAppHttp.ToasterMessage.dataType2 + this.templateDetails[j].dataType.toLowerCase() + MyAppHttp.ToasterMessage.dataType3)
    }
    return isValid;
  }

  private validateBoolean(k: number, i: number, j: number, isValid: boolean, rowErrors: any) {
    var booleanPattern = this.data[k][i];
    if (booleanPattern != "TRUE" || booleanPattern != "FALSE") {
      isValid = false;
      rowErrors.push(MyAppHttp.ToasterMessage.dataType1 + this.templateDetails[j].tableFieldName
        + MyAppHttp.ToasterMessage.dataType2 + this.templateDetails[j].dataType.toLowerCase() + MyAppHttp.ToasterMessage.dataType3)
    }
    return isValid;
  }

  private validateDateTime(k: number, i: number, j: number, isValid: boolean, rowErrors: any) {
    var dateTimePattern = /^(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2}):(\d{2})$/;
    if (!(dateTimePattern.test(this.data[k][i]))) {
      isValid = false;
      rowErrors.push(MyAppHttp.ToasterMessage.dataType1 + this.templateDetails[j].tableFieldName
        + MyAppHttp.ToasterMessage.dataType2 + this.templateDetails[j].dataType.toLowerCase() + MyAppHttp.ToasterMessage.dataType3)
    }
    return isValid;
  }

  private validateDate(k: number, i: number, j: number, isValid: boolean, rowErrors: any) {
    var datePattern = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][\d]|3[01])$/;
    if (!(datePattern.test(this.data[k][i]))) {
      isValid = false;
      rowErrors.push(MyAppHttp.ToasterMessage.dataType1 + this.templateDetails[j].tableFieldName
        + MyAppHttp.ToasterMessage.dataType2 + this.templateDetails[j].dataType.toLowerCase() + MyAppHttp.ToasterMessage.dataType3)
    }

    return isValid;
  }

  private validateDecimal(k: number, i: number, j: number, isValid: boolean, rowErrors: any) {
    var decimalPattern = /^\d+(\.\d+)?$/;
    if (!(decimalPattern.test(this.data[k][i]))) {
      isValid = false;
      rowErrors.push(MyAppHttp.ToasterMessage.dataType1 + this.templateDetails[j].tableFieldName
        + MyAppHttp.ToasterMessage.dataType2 + this.templateDetails[j].dataType.toLowerCase() + MyAppHttp.ToasterMessage.dataType3)
    }
    if ((this.templateDetails[j].fieldLength < (this.data[k][i].toString()).length + 1)) {
      isValid = false;
      rowErrors.push(this.templateDetails[j].tableFieldName + MyAppHttp.ToasterMessage.fieldLength1 + this.templateDetails[j].fieldLength + MyAppHttp.ToasterMessage.fieldLength2)
    }
    return isValid;
  }

  private validateChar(k: number, i: number, j: number, isValid: boolean, rowErrors: any) {
    var charPattern = /^[a-zA-Z]+$/;
    if (!(charPattern.test(this.data[k][i]))) {
      isValid = false;
      rowErrors.push(MyAppHttp.ToasterMessage.dataType1 + this.templateDetails[j].tableFieldName
        + MyAppHttp.ToasterMessage.dataType2 + this.templateDetails[j].dataType.toLowerCase() + MyAppHttp.ToasterMessage.dataType3)
    }
    if ((this.templateDetails[j].fieldLength < (this.data[k][i].toString()).length)) {
      isValid = false;
      rowErrors.push(this.templateDetails[j].tableFieldName + MyAppHttp.ToasterMessage.fieldLength1 + this.templateDetails[j].fieldLength + MyAppHttp.ToasterMessage.fieldLength2)
    }
    return isValid;
  }

  private validateInteger(k: number, i: number, j: number, isValid: boolean, rowErrors: any) {
    var onlyDigitsPattern = /^[-+]?\d+$/;
    if (!(onlyDigitsPattern.test(this.data[k][i]))) {
      isValid = false;
      rowErrors.push(MyAppHttp.ToasterMessage.dataType1 + this.templateDetails[j].tableFieldName
        + MyAppHttp.ToasterMessage.dataType2 + this.templateDetails[j].dataType.toLowerCase() + MyAppHttp.ToasterMessage.dataType3)

    }
    if ((this.templateDetails[j].fieldLength < (this.data[k][i].toString()).length)) {
      isValid = false;
      rowErrors.push(this.templateDetails[j].tableFieldName + MyAppHttp.ToasterMessage.fieldLength1 + this.templateDetails[j].fieldLength + MyAppHttp.ToasterMessage.fieldLength2)
    }
    return isValid;
  }

  private validateVarchar(j: number, k: number, i: number, isValid: boolean, rowErrors: any) {
    this.data[k][i] = this.RemoveNewlines(this.data[k][i]);
    if ((this.templateDetails[j].fieldLength < (this.data[k][i].toString()).length)) {
      isValid = false;
      rowErrors.push(this.templateDetails[j].tableFieldName + MyAppHttp.ToasterMessage.fieldLength1 + this.templateDetails[j].fieldLength + MyAppHttp.ToasterMessage.fieldLength2);
    }
    return isValid;
  }

  isTemplateEmpty() {
    if (this.data.length == 0) {
      this.notifierService.showNotification('Error', MyAppHttp.ToasterMessage.EmptyTemplate);
      return false;
    } else {
      return true;
    }
  }

  checkExcelValidations() {
    this.isTableNameExists();
    if (this.validationFlag1) {
      this.isTableNameValid();
      if (this.validationFlag2) {
        if (this.validateTemplateBeforeHeaders() && this.isColumnHeaderExists()) {
          if (this.validateTemplateData()) {
            // this.setEmptyCols()
            this.setEmptyColsFirst();
            this.isValidAction();
            this.finalFlagValidation = true;
          } else {
            this.finalFlagValidation = false;
          }
        } else {
          this.finalFlagValidation = false;
        }
      } else {
        this.finalFlagValidation = false;
      }
    } else {
      this.finalFlagValidation = false;
    }
  }

  validateTemplateBeforeHeaders() {
    if (this.data.length <= 3) {
      this.notifierService.showNotification('Error', MyAppHttp.ToasterMessage.EmptyTemplate);
      return false;
    } else {
      return true;
    }
  }

  isTableNameExists() {
    if (this.data[0][1] == undefined) {
      this.notifierService.showNotification('Error', MyAppHttp.ToasterMessage.tableName1 + MyAppHttp.ToasterMessage.tableName2 + this.tableName + MyAppHttp.ToasterMessage.tableName3);
      this.validationFlag1 = false;
    } else {
      this.validationFlag1 = true;
    }
  }

  isTableNameValid() {
    let name = this.data[0][1];
    if ((name !== this.tableName.trim())) {
      this.notifierService.showNotification('Error', MyAppHttp.ToasterMessage.tableName1 + MyAppHttp.ToasterMessage.tableName2 + this.tableName + MyAppHttp.ToasterMessage.tableName3);
      this.validationFlag2 = false;
    } else {
      this.validationFlag2 = true;
    }
  }

  isColumnHeaderExists() {
    this.validationFlag3 = true;
    if (this.data[3].length == 0) {
      this.notifierService.showNotification('Error', MyAppHttp.ToasterMessage.excelColumns);
      this.validationFlag3 = false;
      return this.validationFlag3;
    } else {
      for (let col of this.data[3]) {
        if (col == undefined) {
          this.notifierService.showNotification('Error', MyAppHttp.ToasterMessage.excelColumns);
          this.validationFlag3 = false;
          return this.validationFlag3;
        }
      }
    }
    return this.validationFlag3;
  }

  isValidAction() {
    let recordsBeforeActionValidation = [];
    recordsBeforeActionValidation.push(...this.data);
    for (let i = 5; i < (this.data.length); i++) {
      this.data[i][0] = this.RemoveTrailingSpaces(this.data[i][0]);
      if (this.data[i][0] == "NEW" || this.data[i][0] == "UPD" || this.data[i][0] == "DEL") {
        this.validationFlag4 = true;
      }
      else {
        this.validationFlag4 = false;
        this.tableData.invalidRecords.push(this.getAsObject(this.data[i].join("||"), MyAppHttp.ToasterMessage.invalidActionPermission1 + this.strActions + MyAppHttp.ToasterMessage.invalidActionPermission2));
        let index = recordsBeforeActionValidation.indexOf(this.data[i]);
        recordsBeforeActionValidation.splice(index, 1);
      }
    }
    this.data = recordsBeforeActionValidation;
  }

  validateTemplateData() {
    if (this.data.length >= 6) {
      return true;
    } else {
      this.notifierService.showNotification('Error', MyAppHttp.ToasterMessage.NoRecords);
      return false;
    }
  }

  setEmptyCols(validRecords: any) {
    for (let j = 0; (validRecords.length) > j; j++) {
      for (let k = 0; k < this.data[3].length; k++) {
        if (validRecords[j][k] == undefined || validRecords[j][k] == null || validRecords[j][k] == 'empty' || validRecords[j][k] == '') {
          validRecords[j][k] = "";
        }
      }
    }
  }

  setEmptyColsFirst() {
    for (let j = 5; j < (this.data.length); j++) {
      for (let k = 0; k < this.data[3].length; k++) {
        if (this.data[j][k] == undefined || this.data[j][k] == null || this.data[j][k] == 'empty' || this.data[j][k] === '' || this.data[j][k] === "NULL") {
          this.data[j][k] = "";
        }
      }
    }
  }

  RemoveTrailingSpaces(celldata: string) {
    return celldata?.toString()?.trim();
  }

  RolepermissionValidate(data: any) {
    let validDataBeforeValidation = [];
    let name = this.data[0][1];
    validDataBeforeValidation.push(...data);
    for (let j = 0; j < this.tablesListWithPermissionId.length; j++) {
      if (name == this.tablesListWithPermissionId[j].tableName) {
        this.checkRolePermission(j, data, validDataBeforeValidation);
      }
    }
    this.tableData.tableValues = validDataBeforeValidation;
  }

  private checkRolePermission(j: number, data: any, validDataBeforeValidation: any[]) {
    this.submodelPermissionid = this.tablesListWithPermissionId[j].permissionId;
    for (let i = 0; i < data.length; i++) {
      var action = data[i][0];
      if (this.submodelPermissionid == 1) {
        this.validateRoleOne(action, data, i, validDataBeforeValidation);
      }
      else if (this.submodelPermissionid == 2) {
        this.validateRoletwo(action, data, i, validDataBeforeValidation);
      }
      else if (this.submodelPermissionid == 3) {
        this.validateRoleThree(action, data, i, validDataBeforeValidation);
      }
      else if (this.submodelPermissionid == 4) {
        this.validateRoleFour(action, data, i, validDataBeforeValidation);
      }
    }
  }

  private validateRoleFour(action: any, data: any, i: number, validDataBeforeValidation: any[]) {
    if (action == "UPD") {
      //when only UPD
    } else {
      this.tableData.invalidRecords.push(this.getAsObject(data[i].join("||"), "Unauthorized Action"));
      let index = validDataBeforeValidation.indexOf(data[i]);
      validDataBeforeValidation.splice(index, 1);
    }
  }

  private validateRoleThree(action: any, data: any, i: number, validDataBeforeValidation: any[]) {
    if (action == "NEW") {
      //when only NEW
    } else {
      this.tableData.invalidRecords.push(this.getAsObject(data[i].join("||"), "Unauthorized Action"));
      let index = validDataBeforeValidation.indexOf(data[i]);
      validDataBeforeValidation.splice(index, 1);
    }
  }

  private validateRoletwo(action: any, data: any, i: number, validDataBeforeValidation: any[]) {
    if (action == "NEW" || action == "UPD") {
      //when only NEW, UPD
    } else {
      this.tableData.invalidRecords.push(this.getAsObject(data[i].join("||"), MyAppHttp.ToasterMessage.Unauthorizedaction));
      let index = validDataBeforeValidation.indexOf(data[i]);
      validDataBeforeValidation.splice(index, 1);
    }
  }

  private validateRoleOne(action: any, data: any, i: number, validDataBeforeValidation: any[]) {
    if (action == "NEW" || action != "UPD" || action != "DEL") {
      //when only NEW
    } else {
      this.tableData.invalidRecords.push(this.getAsObject(data[i].join("||"), "Unauthorized Action"));
      let index = validDataBeforeValidation.indexOf(data[i]);
      validDataBeforeValidation.splice(index, 1);
    }
  }

  checkPrimaryKey(excelRowData: any, pkArray: any, pkArrayIndex: any, operation: string) {
    let trueCount = 0;
    if (operation == 'NEW') {
      let rowCount;
      for (let j = 0; j < (this.currentTableData.length); j++) {
        rowCount = 0;
        for (let n = 0; n < pkArray.length; n++) {
          if (this.currentTableData[j][pkArray[n]] == excelRowData[pkArrayIndex[n]]) {
            rowCount++;
            if (rowCount == pkArray.length) {
              return false;
            }
          }
          else {
            // if pkExist is true;
          }
        }
      }
      return true;
    } else {
      for (let j = 0; j < (this.currentTableData.length); j++) {
        trueCount = 0;
        for (let n = 0; n < pkArray.length; n++) {
          if (this.currentTableData[j][pkArray[n]] == excelRowData[pkArrayIndex[n]]) {
            trueCount++;
            if (trueCount == pkArray.length) {
              return true
            }
          } else {
            // if pkExist is false;
          }
        }
      }
      return false;
    }
  }

  onCancel() {
    this.files = [];
    this.tableUploadForm.reset();
    this.invalidrecords = [];
    this.columnList = [];
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: any, decimals: any) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  setMessage(type: any, message: any) {
    this.errorMessage = true;
    this.errorType = type;
    this.Message = message;
    setTimeout(() => {
      this.errorMessage = false;
    }, MyAppHttp.notificationTimeOut);
  }
  getAsObject(ColWithDelimiter: any, Errormessage: any) {
    let obj: any = {};
    obj[ColWithDelimiter] = Errormessage;
    return obj;
  }
  RemoveNewlines(cellValue: string) {
    return cellValue.replace(/[\r\n]+/g, " ");
  }
}
