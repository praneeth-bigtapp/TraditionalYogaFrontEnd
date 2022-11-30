import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BannerviewService } from '../service/bannerview.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {
  displayedColumns: string[] = ['bannerId', 'bannerName', 'categoryId', "date", "Action"];
  dataSource: any;

  data!: any;
  checks=false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  

  constructor(
    private banner: BannerviewService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getBanner();
  }

  getBanner() {
    this.banner.getbanner().subscribe({
      next: (response) => {
        this.data = response
        for (let data of this.data) {
          data.check = false;
        }
        console.log(this.data);

        this.dataSource = new MatTableDataSource<any>(this.data)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  checkAll(e:any) {
    // console.log(status.value);
    // for (let data of this.data) {
    //   data.check = true;
    // }
    // console.log(this.data);
    // this.dataSource = new MatTableDataSource<any>(this.data)
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    if(e.target.checked==true){
      this.checks=true;
        }
        else{
          this.checks=false;
        }

  }

  onAddBanner() {
    this.router.navigateByUrl("addbanner");
  }

}
