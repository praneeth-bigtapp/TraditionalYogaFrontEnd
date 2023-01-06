import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-status-task',
  templateUrl: './status-task.component.html',
  styleUrls: ['./status-task.component.css']
})
export class StatusTaskComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  gridData = [];
  filterData: any;

  pageno: number = 1

  dataSource: any;
  displayedColumns: string[] = ['sno', 'level', 'dateOfAssigement', 'duedate', 'submitteddate', 'resubmitteddate', 'status', 'action'];
  data: any;

  certificateStatus: any = {
    level1: null,
    level2: null,
    level3: null,
    final: null
  }
  constructor() { }

  ngOnInit(): void {
    this.filterData = {
      filterColumnNames: this.displayedColumns.map((ele: any) => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };
    this.getData()
  }

  ngAfterViewInit() {
    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort;

  }

  updatePagination(col: any) {
  }
  onpaginatechange(event: any) {
    if (event.pageIndex === 0) {
      this.pageno = 1
      return
    }
    this.pageno = (event.pageIndex * event.pageSize) + 1
    return
  }
  getData() {

    this.data = [{
      "level": "level 2",
      "dateOfAssigement": new Date(),
      "duedate": new Date(),
      "submitteddate": new Date(),
      "resubmitteddate": new Date(),
      "status": "completed"
    }]
    this.rendertabledata(this.data)
  }

  rendertabledata(data: any) {
    this.dataSource = new MatTableDataSource<any>(data)
    this.filterData.gridData = data;
    this.filterData.dataSource = this.dataSource;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.filterData.sort = this.sort;
    for (let col of this.filterData.filterColumnNames) {
      col.Value = '';
    }
  }

  viewdetails(data: any) {

  }

  printCertificate() {

  }

}
