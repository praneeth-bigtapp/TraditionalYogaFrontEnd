import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GratitudeMessagesService } from 'src/app/data/services/mentor-module/gratitude-messages/gratitude-messages.service';

@Component({
  selector: 'app-gratitude-received-other-day',
  templateUrl: './gratitude-received-other-day.component.html',
  styleUrls: ['./gratitude-received-other-day.component.css']
})
export class GratitudeReceivedOtherDayComponent implements OnInit {
  pageno: number = 1;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('otherpaginator', { static: true })
  paginator!: MatPaginator;
  otherDueDateColumns: string[] = ['SNo', 'duedate', 'gratitudeMessageReceived', "gratitudeMessages",];
  gridData = [];
  dataSource!: MatTableDataSource<any>;
  otherreportDueDataTable: any
  otherreportDueData: any
  constructor(
    private service: GratitudeMessagesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.otherreportDueDataTable = {
      filterColumnNames: this.otherDueDateColumns.map(ele => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };
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
      "gratitudeMessageReceived": 40,
      "gratitudeMessages": {
        "forwarded": 10,
        "denied": 10,
      }
    },

    ]
    this.renderTableDate(this.otherreportDueData)
  }
  renderTableDate(data: any) {
    this.dataSource = new MatTableDataSource<any>(data)
    this.otherreportDueDataTable.gridData = data;
    this.otherreportDueDataTable.dataSource = this.dataSource;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.otherreportDueDataTable.sort = this.sort;
    for (let col of this.otherreportDueDataTable.filterColumnNames) {
      col.Value = '';
    }
    return

  }

  updatePagination() {
    this.otherreportDueDataTable.dataSource.paginator = this.paginator;
    this.otherreportDueDataTable.dataSource.sort = this.sort
    return
  }
  gratitudeMessage(id: any) {

  }
  otherForwarded(id: any) {
    this.router.navigate([])
  }
  otherDenied(id: any) {
    this.router.navigate([])
  }

}
