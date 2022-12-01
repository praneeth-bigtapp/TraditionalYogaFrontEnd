import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';
import { HeaderService } from 'src/app/core/layout/header/service/header.service';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { SendReceiveService } from 'src/app/shared/services/sendReceive.service';
import { LoginService } from '../../auth/login/services/login.service';
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
  displayedColumns: string[] = ['courseId', 'category', 'courseName', "courseDuration", "startDate", "endDate", "currentStatus"];
  data: any;
  values =
    {

      "courseId": "",
      "category": "",
      "courseName": "",
      "courseDuration": "",
      "startDate": "",
      "endDate": "",
      "currentStatus": ""
    }

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = false;
  disabled = false;




  // pageEvent!: PageEvent;

  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private loginService: LoginService,
    private dataStorageService: DataStorageService,
    public sendReceiveService: SendReceiveService,
    private userIdle: UserIdleService,
    private headerService: HeaderService,
    private service: CoursesService

  ) {
    this.filterData = {
      filterColumnNames: [
        { "Key": 'courseId', "Value": "" },
        { "Key": 'category', "Value": "" },
        { "Key": 'courseName', "Value": "" },
        { "Key": 'courseDuration', "Value": "" },
        { "Key": 'startDate', "Value": "" },
        { "Key": 'endDate', "Value": "" },
        { "Key": 'currentStatus', "Value": "" },
      ],
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };


  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
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







  addviewcourses() {
    // console.log("add/view course");
    this.router.navigateByUrl("addCourse");

  }
  updatePagination(col: any) {
    this.filterData.dataSource.paginator = this.paginator;

    this.dataSource.paginator = this.paginator;
  }


}
