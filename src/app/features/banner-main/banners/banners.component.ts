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
  displayedColumns: string[] = ['bannerId', 'bannerName', 'categoryId', "date"];
  dataSource: any;

  data!: any

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

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
        this.dataSource = new MatTableDataSource<any>(this.data)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  onAddBanner() {
    this.router.navigateByUrl("addbanner");
  }

}
