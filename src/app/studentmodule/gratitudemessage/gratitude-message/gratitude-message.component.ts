import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-gratitude-message',
  templateUrl: './gratitude-message.component.html',
  styleUrls: ['./gratitude-message.component.css']
})
export class GratitudeMessageComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatPaginator)
  paginatorTwo!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatSort)
  sortTwo!: MatSort;
  displaycontent: boolean = false
  filterData: any;
  filterDataTwo: any;
  gridData: any;
  gridDataTwo: any;
  datasourceTwo:any;
  pageno:number=1
  data=[{"sno":"1","date_of_submission":"02/01/2023","Message":"its a long established fact that a reader will be distracted by a relatable content of a page when lookin at its layout. The point of using lorem ipsum is that is as a more-or-less normal distribution of letter", },

  
  ]
  displayedColumns: string[] = ['sno', 'date_of_submission', 'Message'];
  dataSource :any;
  datatwo=[{"sno":"1","Duedate":"01/01/2023", "SubmissionDate":"10/01/2023","status":"accepted","view":""},
  {"sno":"1","Duedate":"01/01/2023", "SubmissionDate":"10/01/2023","status":"accepted","view":""},
  {"sno":"1","Duedate":"01/01/2023", "SubmissionDate":"10/01/2023","status":"accepted","view":""},
  {"sno":"1","Duedate":"01/01/2023", "SubmissionDate":"10/01/2023","status":"accepted","view":""}]

  displayedColumnsTwo: string[] = ['sno', 'Duedate', "SubmissionDate", "status","view"];
  updatePagination() {

    this.dataSource.paginator = this.paginator;
  }
  message(){
    this.displaycontent = !this.displaycontent

  }
  onpaginatechange(event: any) {
    if (event.pageIndex === 0) {
      this.pageno = 1
      return
    }
    this.pageno = (event.pageIndex * event.pageSize) + 1
    return
  }
  constructor() { }

  ngOnInit(): void {
    this.dataSource=new MatTableDataSource<any>(this.data)
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.filterData = {
      filterColumnNames: this.displayedColumns.map(ele => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    }
    this.dataSource = new MatTableDataSource<any>(this.data)
    this.filterData.gridData = this.data;
    this.filterData.dataSource = this.dataSource;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.filterData.sort = this.sort;
    for (let col of this.filterData.filterColumnNames) {
      col.Value = '';
    }
    this.datasourceTwo=new MatTableDataSource<any>(this.datatwo)
    // this.dataSource.paginator = this.paginator;
    this.datasourceTwo.sortTwo = this.sortTwo;
    this.filterDataTwo = {
      filterColumnNames: this.displayedColumnsTwo.map(ele => ({ "Key": ele, "Value": "" })),
      gridDataTwo: this.gridDataTwo,
      datasourceTwo: this.datasourceTwo,
      paginatorTwo: this.paginatorTwo,
      sortTwo: this.sortTwo
    }
    this.datasourceTwo = new MatTableDataSource<any>(this.datatwo)
    this.filterDataTwo.gridDataTwo = this.datatwo;
    this.filterDataTwo.datasourceTwo = this.datasourceTwo;
    this.datasourceTwo.paginatortwo = this.paginatorTwo;
    this.datasourceTwo.sortTwo = this.sortTwo;
    this.filterDataTwo.sortTwo = this.sortTwo;
    for (let col of this.filterDataTwo.filterColumnNames) {
      col.Value = '';
    }
  }

}
