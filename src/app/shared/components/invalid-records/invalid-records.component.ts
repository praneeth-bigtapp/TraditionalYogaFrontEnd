import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Filterdatacolumns } from '../../models/excel-data.model';

@Component({
  selector: 'app-invalid-records',
  templateUrl: './invalid-records.component.html',
  styleUrls: ['./invalid-records.component.css']
})
export class InvalidRecordsComponent implements OnInit {

  @Input() columnList: string[] = [];
  @Input() invalidrecords: { [key: string]: string }[] = [];
  invalidData: any;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  filterData: any;
  filtercolumnsarray: any = [];
  gridData: any = [];
  tableCols: any = [];
  pageSize = 10;

  ngOnInit() {
    this.filterData = {
      filterColumnNames: [],
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };
    this.tableCols = [];
    this.tableCols = Object.keys(this.invalidrecords[0]);
    this.filterData.filterColumnNames = [];
    for (let tableCol of this.tableCols) {
      let temptable: Filterdatacolumns = { Key: tableCol, Value: " " }
      this.filterData.filterColumnNames.push(temptable);
    }
    this.invalidData = this.invalidrecords;
    this.filterData.gridData = this.invalidData;
    this.dataSource = new MatTableDataSource(this.invalidData);
    this.filterData.dataSource = this.dataSource;
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    for (let col of this.filterData.filterColumnNames) {
      col.Value = '';
    }
  }
  updatePagination() {
    this.filterData.dataSource.paginator = this.paginator;
  }

}
