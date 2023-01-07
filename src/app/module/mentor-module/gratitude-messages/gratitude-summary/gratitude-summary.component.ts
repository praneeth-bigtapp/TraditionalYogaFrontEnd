import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GratitudeMessagesService } from 'src/app/data/services/mentor-module/gratitude-messages/gratitude-messages.service';

@Component({
  selector: 'app-gratitude-summary',
  templateUrl: './gratitude-summary.component.html',
  styleUrls: ['./gratitude-summary.component.css']
})
export class GratitudeSummaryComponent implements OnInit {
  @ViewChild('dueDatepaginator', { static: true })
  paginator!: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;


  reportDueDateColumns: string[] = ['SNo', 'duedate', 'studentActive', "gratitudeMessages"];
  gridData = [];
  dataSource!: MatTableDataSource<any>;
  pageno: number = 1;
  reportDueDataTable: any
  reportDueData: any

  constructor(
    private service: GratitudeMessagesService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.reportDueDataTable = {
      filterColumnNames: this.reportDueDateColumns.map(ele => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };
    this.getDueDate()

  }
  onpaginatechange(event: any) {
    if (event.pageIndex === 0) {
      this.pageno = 1
      return
    }
    this.pageno = (event.pageIndex * event.pageSize) + 1
    return
  }

  renderTableDate(data: any) {
    this.dataSource = new MatTableDataSource<any>(data)
    this.reportDueDataTable.gridData = data;
    this.reportDueDataTable.dataSource = this.dataSource;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.reportDueDataTable.sort = this.sort;
    for (let col of this.reportDueDataTable.filterColumnNames) {
      col.Value = '';
    }
    return

  }
  updatePagination(index: number) {
    this.reportDueDataTable.dataSource.paginator = this.paginator;
    this.reportDueDataTable.dataSource.sort = this.sort
    return


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
    this.renderTableDate(this.reportDueData)
  }


  studentActive(id: any) {

  }

  receivedMessage(id: any) {
    this.router.navigate(["mentor/gratitudeUnreadMessages/", id])
  }
  forwardedMessage(id: any) {
    this.router.navigate(["mentor/", id])
  }
  deniedMessage(id: any) {
    this.router.navigate(["mentor/gratitudeInformed&Denied", id])
  }
  notSubmittedMessage(id: any) {
    this.router.navigate([])
  }
  informedMessage(id: any) {
    this.router.navigate(["mentor/gratitudeInformed&Denied", id])
  }

}
