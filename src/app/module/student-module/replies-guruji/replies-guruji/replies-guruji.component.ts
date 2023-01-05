import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-replies-guruji',
  templateUrl: './replies-guruji.component.html',
  styleUrls: ['./replies-guruji.component.css']
})
export class RepliesGurujiComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  filterData: any
  gridData: any;


  

  data = [
    {     
      "sno": "1",
      "date":"04-01-2023",
      "repliesfromguruji":"Partner yoga is one form of group yoga, but the term is often used to refer to practices involving more than two people,Partner yoga is one form of group yoga, but the term is often used to refer to practices involving more than two people",    
      "isShowMoreTrue" : false
    },
    {
      "sno": "2",
      "date":"05-01-2023",
      "repliesfromguruji":"Partner yoga is one form of group yoga, but the term is often used to refer to practices involving more than two people,Partner yoga is one form of group yoga, but the term is often used to refer to practices involving more than two people",        
      "isShowMoreTrue" : false
    },
    {
      "sno": "3",
      "date":"06-01-2023",
      "repliesfromguruji":"Partner yoga is one form of group yoga, but the term is often used to refer to practices involving more than two people,Partner yoga is one form of group yoga, but the term is often used to refer to practices involving more than two people",       
      "isShowMoreTrue" : false
    },
    {
      "sno": "4",
      "date":"07-01-2023",
      "repliesfromguruji":"Partner yoga is one form of group yoga, but the term is often used to refer to practices involving more than two people,Partner yoga is one form of group yoga, but the term is often used to refer to practices involving more than two people",       
      "isShowMoreTrue" : false
    }
   ]
  displayedColumns: string[] = ["sno","date", "repliesfromguruji", "studentmessage"];

  dataSource: any;


  constructor(public dialog: MatDialog,
    public router: Router,
    private formbuilder: FormBuilder) { }

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

  showMoreText(element: any)
  { 
      element.isShowMoreTrue = true;
  }

 
 
 


}
