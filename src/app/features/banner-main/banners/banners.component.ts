import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BannermainService } from '../bannermainservice/bannermain.service';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {



  displayedColumns: string[] = ['bannerId', 'bannerName', 'categoryId', "date"];

  dataSource: any;
  data!: any

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  searchvalue!: any

  constructor(
    private bannerservice: BannermainService
  ) {

    this.bannerservice.getbanners().subscribe({
      next: (response) => {
        this.data = response
        this.dataSource = new MatTableDataSource<any>(this.data)
      
      },
      error: (error) => {

      }
    })
    console.log(this.data);
    
   

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  ngOnInit(): void {
  }

  getsearch() {
    console.log(this.searchvalue);

  }

}
