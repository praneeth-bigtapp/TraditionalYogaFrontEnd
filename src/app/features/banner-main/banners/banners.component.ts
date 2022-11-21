import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {
   
  data=[{"banner_name":"banner1","GivenBy":"admin","date_of_add":" 02,aug,2022 12:30:37"},
  {"banner_name":"banner1","GivenBy":"admin","date_of_add":" 02,aug,2022 12:30:37"},
  {"banner_name":"banner1","GivenBy":"admin","date_of_add":" 02,aug,2022 12:30:37"},]
  displayedColumns: string[] = ['s.no', 'banner_name', 'GivenBy',"date_of_add"];
  dataSource :any;


  


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor() { 
    this.dataSource=new MatTableDataSource<any>(this.data)
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  ngOnInit(): void {
  }

}
