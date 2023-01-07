import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-volunteer-intrested',
  templateUrl: './volunteer-intrested.component.html',
  styleUrls: ['./volunteer-intrested.component.css']
})
export class VolunteerIntrestedComponent implements OnInit {
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
  data=[{"sno":"1","date_of_consent":"08/01/2023","name":"Ajith", "user_id":"123ajith","gender":"male","age":"25","perfomance_rating":"","message":"one there are many variations of passages lorem ipsum available. but the majoraty have suffered alteration in some form. but injected humor or randomised words, which dont look even slightly belivable"},
  {"sno":"1","date_of_consent":"08/01/2023","name":"Ajith", "user_id":"123ajith","gender":"male","age":"25","perfomance_rating":"","message":"two there are many variations of passages lorem ipsum available. but the majoraty have suffered alteration in some form. but injected humor or randomised words, which dont look even slightly belivable"},
  {"sno":"1","date_of_consent":"08/01/2023","name":"Ajith", "user_id":"123ajith","gender":"male","age":"25","perfomance_rating":"","message":" three there are many variations of passages lorem ipsum available. but the majoraty have suffered alteration in some form. but injected humor or randomised words, which dont look even slightly belivable"},
  {"sno":"1","date_of_consent":"08/01/2023","name":"Ajith", "user_id":"123ajith","gender":"male","age":"25","perfomance_rating":"","message":" there are many variations of passages lorem ipsum available. but the majoraty have suffered alteration in some form. but injected humor or randomised words, which dont look even slightly belivable"},
  
  ]
  displayedColumns: string[] = ['sno', 'date_of_consent', 'name',"user_id","gender", "age", "perfomance_rating", "message"];
  dataSource :any;
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
  }

}
