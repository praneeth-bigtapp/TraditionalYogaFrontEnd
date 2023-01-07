import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GratitudeMessagesService } from 'src/app/data/services/mentor-module/gratitude-messages/gratitude-messages.service';

@Component({
  selector: 'app-gratitude-summary',
  templateUrl: './gratitude-summary.component.html',
  styleUrls: ['./gratitude-summary.component.css']
})
export class GratitudeSummaryComponent implements OnInit {
  @ViewChild('dueDatepaginator', { static: true })
  paginator!: MatPaginator;
  @ViewChild('otherpaginator', { static: true })
  public secondPaginator!: MatPaginator;
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();


  reportDueDateColumns: string[] = ['SNo', 'duedate', 'studentActive', "gratitudeMessages",];
  gridData = [];
  dataSource!: MatTableDataSource<any>;
  pageno: number = 1;
  reportDueDataTable: any
  reportDueData: any

  otherDueDateColumns: string[] = ['SNo', 'duedate', 'gratitudeMessageReceived', "gratitudeMessages",];
  othergridData = [];
  otherdataSource!: MatTableDataSource<any>;
  otherreportDueDataTable: any
  otherreportDueData: any
  constructor(
    private service: GratitudeMessagesService
  ) { }

  ngOnInit(): void {

    this.reportDueDataTable = {
      filterColumnNames: this.reportDueDateColumns.map(ele => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };
    this.otherreportDueDataTable = {
      filterColumnNames: this.otherDueDateColumns.map(ele => ({ "Key": ele, "Value": "" })),
      gridData: this.othergridData,
      dataSource: this.otherdataSource,
      paginator: this.secondPaginator,
      sort: this.sort
    };
    this.getDueDate()
    this.getOtherDueDate()
  }
  onpaginatechange(event: any) {
    if (event.pageIndex === 0) {
      this.pageno = 1
      return
    }
    this.pageno = (event.pageIndex * event.pageSize) + 1
    return
  }

  renderTableDate(data: any, index: number) {
    if (index === 0) {
      this.dataSource = new MatTableDataSource<any>(data)
      this.reportDueDataTable.gridData = data;
      this.reportDueDataTable.dataSource = this.dataSource;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort.toArray()[index];
      this.reportDueDataTable.sort = this.sort.toArray()[index];
      for (let col of this.reportDueDataTable.filterColumnNames) {
        col.Value = '';
      }
      return
    }
    if (index === 1) {
      console.log(this.secondPaginator);

      this.otherdataSource = new MatTableDataSource<any>(data)
      this.otherreportDueDataTable.gridData = data;
      this.otherreportDueDataTable.otherdataSource = this.otherdataSource;
      this.otherreportDueDataTable.paginator = this.secondPaginator;
      this.otherreportDueDataTable.sort = this.sort.toArray()[index];
      this.otherreportDueDataTable.sort = this.sort.toArray()[index];
      for (let col of this.otherreportDueDataTable.filterColumnNames) {
        col.Value = '';
      }
      return
    }
  }
  updatePagination(index: number) {
    if (index === 0) {
      this.reportDueDataTable.dataSource.paginator = this.paginator;
      this.reportDueDataTable.dataSource.sort = this.sort.toArray()[index]
      return
    }
    if (index === 1) {
      this.otherreportDueDataTable.dataSource.paginator = this.secondPaginator;
      this.otherreportDueDataTable.dataSource.sort = this.sort.toArray()[index]
      return
    }
  }
  ngAfterViewInit() {
    this.updatePagination(1)
  }

  getDueDate() {
    this.reportDueData = [{
      "sno": "1",
      "duedate": new Date(),
      "studentActive": 50,
      "gratitudeMessages": {
        "received": 10,
        "forwarded": 10,
        "denied": 10,
        "informed": 10,
        "notSubmitted": 10
      }
    },
    {
      "sno": "1",
      "duedate": new Date(),
      "studentActive": 40,
      "gratitudeMessages": {
        "received": 10,
        "forwarded": 10,
        "denied": 10,
        "informed": 10,
        "notSubmitted": 10
      }
    },

    ]
    this.renderTableDate(this.reportDueData, 0)
  }
  getOtherDueDate() {
    this.otherreportDueData = [{
      "sno": "1",
      "duedate": new Date(),
      "gratitudeMessageReceived": 50,
      "gratitudeMessages": {

        "forwarded": 10,
        "denied": 10,

      }
    },
    {
      "sno": "1",
      "duedate": new Date(),
      "gratitudeMessageReceived": 50,
      "gratitudeMessages": {
        "forwarded": 10,
        "denied": 10,
      }
    },

    ]
    this.renderTableDate(this.otherreportDueData, 1)
  }
}
