import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/features/dashboard/dashboard.service';
import { StudentDashboardService } from '../student-dashboard.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  course!: any
  courseList!: any

  displayedColumns: string[] = ['text', "week1", "week2", "week3", "week4", "cumulative", "performancerating"];
  gridData = [];
  filterData: any;
  dataSource: any;
  data: any

  constructor(
    private service: StudentDashboardService,
    private router: Router,
  ) {

    this.filterData = {
      filterColumnNames: this.displayedColumns.map((ele: any) => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      // paginator: this.paginator,
      // sort: this.sort
    };
    this.service.getallcourses().subscribe({
      next: (response) => {
        this.courseList = response

      },

      error: (error) => {
        console.error(error.message);

      }
    })

    this.getperformancedata()

  }

  getperformancedata() {
    this.data = [
      {
        text: "Total No of hours of live class",
        week1: {
          "hour": 25,
          "percentage": 50
        },
        week2: {
          "hour": 25,
          "percentage": 50
        },
        week3: {
          "hour": 25,
          "percentage": 50
        },
        week4: {
          "hour": 25,
          "percentage": 50
        },
        cumulative: {
          "hour": 25,
          "percentage": 50
        },
        "performancerating": "Good"
      }
    ]
    this.rendertabledata(this.data)


  }


  rendertabledata(data: any) {
    this.dataSource = new MatTableDataSource<any>(data)
    this.filterData.gridData = data;
    this.filterData.dataSource = this.dataSource;
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    // this.filterData.sort = this.sort;
    for (let col of this.filterData.filterColumnNames) {
      col.Value = '';
    }
  }


  ngOnInit() {
  }

  onCourseChange() {
    console.log(this.course);
  }

  changeMentor(event: any) {
    console.log(event.checked);
  }
  changeChiefMentor(event: any) {
    console.log(event.checked);
  }
  performanceAcknowledge(event: any) {
    console.log(event.checked);

  }
  watchCourseClasses() {

  }
  openNotification(value: any) {

  }
  openGratitude(value: any) {

  }
  viewAllNotification() {

  }
  viewAllGratitude() {

  }
}
