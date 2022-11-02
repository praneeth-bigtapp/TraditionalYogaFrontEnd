import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SendReceiveService } from 'src/app/shared/services/sendReceive.service';
import { CsvGeneratorService } from './service/csv-generator.service';
import { MyAppHttp } from 'src/app/shared/services/myAppHttp.service';
import { NotifierService } from 'src/app/notifier.service';

@Component({
  selector: 'app-csv-generator',
  templateUrl: './csv-generator.component.html'
})
export class CsvGeneratorComponent implements OnInit {
  displayedColumns: string[] = ['sno', 'tableName', 'schedulerName', 'actions'];
  filterData: any;
  TablesListData: any;
  gridData = [];
  AccessSchedulerList: any;
  schedulerList: any;
  SchedulerForm!: FormGroup;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  pageSize = 50;
  constructor(private csvGenertor: CsvGeneratorService,
    private formBuilder: FormBuilder,
    public sendReceiveService: SendReceiveService,
    private notifierService: NotifierService) { }
  ngOnInit(): void {
    this.filterData = {
      filterColumnNames: [
        { "Key": 'sno', "Value": "" },
        { "Key": 'tableName', "Value": "" },
        { "Key": 'schedulerName', "Value": "" }
      ],
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };
    this.SchedulerForm = this.formBuilder.group({
      'scheduler': ['', Validators.required]
    });
    this.getSchedulerList();
  }
  updatePagination() {
    this.filterData.dataSource.paginator = this.paginator;
  }
  getTablesList() {
    this.csvGenertor.getAllTables().subscribe((response) => {
      const TablesListData: any = [];
      for (let i = 0; i < response.length; i++) {
        response[i].sno = i + 1;
        response[i].editMode = false;
        response[i].schedulerName = this.getschedulerName(response[i].schedulerNumber);
        TablesListData.push(response[i]);
      }
      this.TablesListData = TablesListData;
      this.filterData.gridData = TablesListData;
      this.dataSource = new MatTableDataSource(TablesListData);
      this.filterData.dataSource = this.dataSource;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      for (let col of this.filterData.filterColumnNames) {
        col.Value = '';
      }
    })
  }
  getSchedulerList() {
    this.csvGenertor.getSchedularList().subscribe((response) => {
      this.schedulerList = response;
      this.getTablesList();
    });
  }
  getschedulerName(id: any) {
    for (let element of this.schedulerList) {
      if (element.schedulerId == id) { return element.schedulerType; }
    }
  }
  editSave(tableDetails: any) {
    this.TablesListData.forEach((element: any) => {
      if (element.tableId == tableDetails.tableId) {
        element.editMode = true;
        this.SchedulerForm.controls['scheduler'].setValue(tableDetails.schedulerNumber);
      }
      else
        element.editMode = false;
    });
  }
  saveBatch(tableDetails: any) {
    let obj = {
      "tableId": tableDetails.tableId,
      "tableName": tableDetails.tableName,
      "schedulerNumber": this.SchedulerForm.value.scheduler
    }
    this.csvGenertor.saveTableDetails(obj).subscribe(response => {
      this.getTablesList();
      this.notifierService.showNotification('Success', MyAppHttp.ToasterMessage.templateSuccess);
    })
  }
}


