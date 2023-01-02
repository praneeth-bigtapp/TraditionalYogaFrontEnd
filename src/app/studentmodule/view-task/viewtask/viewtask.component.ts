import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatPaginator)
  paginatorTwo!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatSort)
  sortTwo!: MatSort;

  filterData: any;
  filterDataTwo: any;
  gridData: any;
  gridDataTwo: any;
  pageno:number=1
  data=[{"sno":"1","Description":"Question Paper.jpg","TestLevel":"Level 1", "date_of_assignment":"02/01/2023","dueDate":"10/01/2023","select":""},
  {"sno":"1","Description":"Question Paper.jpg","TestLevel":"Level 1", "date_of_assignment":"02/01/2023","dueDate":"10/01/2023","select":""},
  {"sno":"1","Description":"Question Paper.jpg","TestLevel":"Level 1", "date_of_assignment":"02/01/2023","dueDate":"10/01/2023","select":""},
  {"sno":"1","Description":"Question Paper.jpg","TestLevel":"Level 1", "date_of_assignment":"02/01/2023","dueDate":"10/01/2023","select":""},
  
  ]
  displayedColumns: string[] = ['sno', 'Description', 'TestLevel',"date_of_assignment","dueDate", "select"];
  dataSource :any;

  datasourceTwo:any;
  datatwo=[{"sno":"1","Description":"Question Paper.jpg", "redueDate":"10/01/2023","select":""},]

  displayedColumnsTwo: string[] = ['sno', 'Description', "redueDate", "select"];
  updatePagination() {

    this.dataSource.paginator = this.paginator;
  }
  onpaginatechange(event: any) {
    if (event.pageIndex === 0) {
      this.pageno = 1
      return
    }
    this.pageno = (event.pageIndex * event.pageSize) + 1
    return
  }
  
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach((row: any) => this.selection.select(row));
  }
  // filechange(event: any) {
  //   this.filerror = this.Audiomanagement.value.file === null ? true : false

  //   this.audiodata = event.target.files[0]
  // }

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
