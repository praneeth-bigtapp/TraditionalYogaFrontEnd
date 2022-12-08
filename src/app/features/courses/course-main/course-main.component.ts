import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { SendReceiveService } from 'src/app/shared/services/sendReceive.service';
import { CoursesService } from '../courses.service';



@Component({
  selector: 'app-course-main',
  templateUrl: './course-main.component.html',
  styleUrls: ['./course-main.component.css']
})
export class CourseMainComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  filterData: any;
  gridData = [];
  dataSource: any;
  displayedColumns: string[] = ['coursesId', 'categoriesId', 'coursesName', "courseDuration", "startDate", "endDate", "currentStatus"];
  data: any;


  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = false;
  disabled = false;




  constructor(
    private router: Router,
    public sendReceiveService: SendReceiveService,
    private service: CoursesService

  ) {
    this.filterData = {
      filterColumnNames: this.displayedColumns.map((ele: any) => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };


  }

  ngAfterViewInit() {
    this.filterData.dataSource.paginator = this.paginator;

  }


  ngOnInit(): void {
    this.getdata()

  }
  getdata() {
    this.service.getCourse().subscribe({



      next: (response) => {

        this.data = response
        console.log(this.data)


        this.dataSource = new MatTableDataSource<any>(this.data)
        this.filterData.gridData = this.data;
        this.filterData.dataSource = this.dataSource;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.filterData.sort = this.sort;
        for (let col of this.filterData.filterColumnNames) {
          col.Value = '';
        }

      },

      error: (error) => {
        console.error(error.message);
      }


    })
  }



  getMonthDifference(startDate: any, endDate: any) {
    return (
      new Date(endDate).getMonth() -
      new Date(startDate).getMonth() +
      12 * (new Date(endDate).getFullYear() - new Date(startDate).getFullYear())
    );
  }



  addviewcourses() {
    // console.log("add/view course");
    this.router.navigateByUrl("addCourse");

  }
  updatePagination(col: any) {
    this.filterData.dataSource.paginator = this.paginator;

    this.dataSource.paginator = this.paginator;
  }


}
