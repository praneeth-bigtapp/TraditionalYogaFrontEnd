import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-mentordashboardstudentdetails',
  templateUrl: './mentordashboardstudentdetails.component.html',
  styleUrls: ['./mentordashboardstudentdetails.component.css']
})
export class MentordashboardstudentdetailsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  filterData: any
  gridData: any;

  data = [
    {     
      "SNo": "1",
      "StudentName": "Ramesh",
      "StudentId": "5245"
    },
    {
      "SNo": "2",
      "StudentName": "Karthisk",
      "StudentId": "5246"
    },
    {
      "SNo": "3",
      "StudentName": "Anji",
      "StudentId": "5247"
    },
    {
      "SNo": "4",
      "StudentName": "Naren",
      "StudentId": "5248"
    },
    {
      "SNo": "5",
      "StudentName": "Naveen",
      "StudentId": "5249"
    },
    {
      "SNo": "6",
      "StudentName": "Ravi",
      "StudentId": "5260"
    },
    {
      "SNo": "7",
      "StudentName": "Raju",
      "StudentId": "5261"
    }



  ]
  displayedColumns: string[] = ["SNo","StudentName", "StudentId"];

  dataSource: any;

  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>(this.data)
    this.filterData = {
      filterColumnNames: this.displayedColumns.map(ele => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };


    this.filterData.gridData = this.data;
    this.filterData.dataSource = this.dataSource;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.filterData.sort = this.sort;
    for (let col of this.filterData.filterColumnNames) {
      col.Value = '';
    }
    
  }

  ngAfterViewInit() {
    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort;

  }

  updatePagination() {

    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort;

  }

}
