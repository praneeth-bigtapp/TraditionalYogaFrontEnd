import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from 'src/app/data/services/admin-module/user-management/student-master/student.service';

@Component({
  selector: 'app-performance-details',
  templateUrl: './performance-details.component.html',
  styleUrls: ['./performance-details.component.css']
})
export class PerformanceDetailsComponent implements OnInit {

  @Input() student: any;
  donationData: any;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  filterData: any;
  courseLiveColumns: string[] = ['SNo', 'date', 'type', 'totalScreen', 'attendedScreen', 'percentage'];
  practiceLibColumns: string[] = ['SNo', 'dateTime', 'description', 'section', 'attendedTime'];

  gridData = [];
  dataSource!: MatTableDataSource<any>;
  pageno: number = 1;
  COURSES_LIVE_DATA: any[] = [

    { SNo: 1, date: '2022-12-10', type: 'type', totalScreen: '1 hours', attendedScreen: '2 hours', percentage: '20' },

    { SNo: 2, date: '2022-10-10', type: 'type', totalScreen: '3 hours', attendedScreen: '2 hours', percentage: '20' },

    { SNo: 3, date: '2022-11-11', type: 'type', totalScreen: '4 hours', attendedScreen: '2 hours', percentage: '20' },

    { SNo: 4, date: '2022-11-12', type: 'type', totalScreen: '5 hours', attendedScreen: '2 hours', percentage: '20' },

    { SNo: 5, date: '2022-11-13', type: 'type', totalScreen: '6 hours', attendedScreen: '2 hours', percentage: '20' },

  ];
  PARTICES_LIBARY: any[] = [

    { SNo: 1, dateTime: '2022-12-10', description: 'description', section: '1 section', attendedTime: '2 hours' },

    { SNo: 2, dateTime: '2022-10-10', description: 'description', section: '3 section', attendedTime: '2 hours' },

    { SNo: 3, dateTime: '2022-11-11', description: 'description', section: '4 section', attendedTime: '2 hours' },

    { SNo: 4, dateTime: '2022-11-12', description: 'description', section: '5 section', attendedTime: '2 hours' },

    { SNo: 5, dateTime: '2022-11-13', description: 'description', section: '6 section', attendedTime: '2 hours' },

  ];
  ELEMENT_DATA: any[] = [

    { SNo: 1, CourseName: 'RYIT 200', CourseDiscription: 'Free Online Traditional Meditation Teacher Training Based on Darashanas or sanathana Dharma For Yoga Teachers and Students to become a Yogi', CourseStartDate: '10-20-2022', CourseEndDate: '10-20-2022', AdmissionsStatus: "Admitted", CompletionStatus: 'Completed & Certified' },

    { SNo: 2, CourseName: 'RYIT 200', CourseDiscription: 'Free Online Traditional Meditation Teacher Training Based on Darashanas or sanathana Dharma For Yoga Teachers and Students to become a Yogi', CourseStartDate: '10-20-2022', CourseEndDate: '10-20-2022', AdmissionsStatus: "Admitted", CompletionStatus: 'Certified' },

    { SNo: 3, CourseName: 'RYIT 200', CourseDiscription: 'Free Online Traditional Meditation Teacher Training Based on Darashanas or sanathana Dharma For Yoga Teachers and Students to become a Yogi', CourseStartDate: '10-20-2022', CourseEndDate: '10-20-2022', AdmissionsStatus: "Admitted", CompletionStatus: 'Completed' },

  ];

  coureseLiveData = this.COURSES_LIVE_DATA;
  coureseShortData = this.COURSES_LIVE_DATA;
  practiceLibData = this.PARTICES_LIBARY;

  constructor(
    private service: StudentService,

  ) { }

  ngOnInit(): void {

  }


  ngOnChanges() {

  }

  onpaginatechange(event: any) {
    if (event.pageIndex === 0) {
      this.pageno = 1
      return
    }
    this.pageno = (event.pageIndex * event.pageSize) + 1
    return
  }
  renderTableDate(data: any) {
    this.dataSource = new MatTableDataSource<any>(data)
    this.filterData.gridData = data;
    this.filterData.dataSource = this.dataSource;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.filterData.sort = this.sort;
    for (let col of this.filterData.filterColumnNames) {
      col.Value = '';
    }
  }
  updatePagination() {
    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort
  }
}
