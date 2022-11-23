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

export interface CourseData {
  no: string,
  category: string,
  coursename: string,
  duration: string,
  startdate: string,
  enddate: string,
  currentstatus: string
}

const coursedata: CourseData[] = [
  { no: "1", category: "web", coursename: "Web Development", duration: "6 month", startdate: "17 Nov 2022", enddate: "17 Dec 2022", currentstatus: "ongoing" },
  { no: "2", category: "Android", coursename: "React Native Development", duration: "3 month", startdate: "20 Nov 2022", enddate: "22 Dec 2022", currentstatus: "completed" },
  { no: "3", category: "AWS", coursename: "AWS Basic", duration: "2 month", startdate: "17 Nov 2022", enddate: "17 Mar 2022", currentstatus: "ongoing" },
  { no: "4", category: "Azure", coursename: "Azure Basic", duration: "1 month", startdate: "17 Nov 2022", enddate: "17 Apr 2022", currentstatus: "ongoing" },
  { no: "5", category: "GCP", coursename: "GCP Basic", duration: "5 month", startdate: "17 Nov 2022", enddate: "17 Dec 2022", currentstatus: "ongoing" },
  { no: "6", category: "Angular", coursename: "Angular Development", duration: "12 month", startdate: "17 Apr 2022", enddate: "17 May 2022", currentstatus: "ongoing" },
  { no: "7", category: "BigData", coursename: "BigData Development", duration: "24 month", startdate: "17 May 2022", enddate: "17 June 2022", currentstatus: "ongoing" },
  { no: "8", category: "Data Scientist", coursename: "Data Scientist Basic", duration: "15 days", startdate: "17 June 2022", enddate: "17 July 2022", currentstatus: "ongoing" },
  // { no: "9", category: "web", coursename: "Angular Development", duration: "6 month", startdate: "17 Nov 2022", enddate: "17 Dec 2022", currentstatus: "ongoing" }, 
  // { no: "10", category: "web", coursename: "Angular Development", duration: "6 month", startdate: "17 Nov 2022", enddate: "17 Dec 2022", currentstatus: "ongoing" },
  // { no: "11", category: "web", coursename: "Angular Development", duration: "6 month", startdate: "17 Nov 2022", enddate: "17 Dec 2022", currentstatus: "ongoing" },
  // { no: "12", category: "web", coursename: "Angular Development", duration: "6 month", startdate: "17 Nov 2022", enddate: "17 Dec 2022", currentstatus: "ongoing" },
  // { no: "13", category: "web", coursename: "Angular Development", duration: "6 month", startdate: "17 Nov 2022", enddate: "17 Dec 2022", currentstatus: "ongoing" },
  // { no: "14", category: "web", coursename: "Angular Development", duration: "6 month", startdate: "17 Nov 2022", enddate: "17 Dec 2022", currentstatus: "ongoing" }, 
  // { no: "15", category: "web", coursename: "Angular Development", duration: "6 month", startdate: "17 Nov 2022", enddate: "17 Dec 2022", currentstatus: "ongoing" },
  // { no: "16", category: "web", coursename: "Angular Development", duration: "6 month", startdate: "17 Nov 2022", enddate: "17 Dec 2022", currentstatus: "ongoing" },
  // { no: "17", category: "web", coursename: "Angular Development", duration: "6 month", startdate: "17 Nov 2022", enddate: "17 Dec 2022", currentstatus: "ongoing" },
  // { no: "18", category: "web", coursename: "Angular Development", duration: "6 month", startdate: "17 Nov 2022", enddate: "17 Dec 2022", currentstatus: "ongoing" },
];

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
  dataSource: any

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
    private headerService: HeaderService

  ) {
    this.filterData = {
      filterColumnNames: [
        { "Key": 'no', "Value": "" },
        { "Key": 'category', "Value": "" },
        { "Key": 'coursename', "Value": "" },
        { "Key": 'duration', "Value": "" },
        { "Key": 'startdate', "Value": "" },
        { "Key": 'enddate', "Value": "" },
        { "Key": 'currentstatus', "Value": "" },
      ],
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };

    this.dataSource = new MatTableDataSource<any>(coursedata)
    this.filterData.gridData = coursedata;
    this.filterData.dataSource = this.dataSource;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.filterData.sort = this.sort;
    for (let col of this.filterData.filterColumnNames) {
      col.Value = '';
    }
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.filterData.dataSource.paginator = this.paginator;
  }


  ngOnInit(): void {

  }

  columns = [
    {
      columnDef: 'SNO',
      header: 'SNO.',
      cell: (element: CourseData) => `${element.no}`,
    },
    {
      columnDef: 'Category',
      header: 'Category',
      cell: (element: CourseData) => `${element.category}`,
    },
    {
      columnDef: 'Course Name',
      header: 'Course Name',
      cell: (element: CourseData) => `${element.coursename}`,
    },
    {
      columnDef: 'Duration',
      header: 'Duration',
      cell: (element: CourseData) => `${element.duration}`,
    },
    {
      columnDef: 'Start Date',
      header: 'Start Date',
      cell: (element: CourseData) => `${element.startdate}`,
    },
    {
      columnDef: 'End Date',
      header: 'End Date',
      cell: (element: CourseData) => `${element.enddate}`,
    },
    {
      columnDef: 'Current Status',
      header: 'Current Status',
      cell: (element: CourseData) => `${element.category}`,
    },
  ];

  displayedColumns = this.columns.map(c => c.columnDef);


  addviewcourses() {
    // console.log("add/view course");
    this.router.navigateByUrl("addCourse");

  }
  updatePagination(col: any) {

    this.dataSource.paginator = this.paginator;
  }


}
