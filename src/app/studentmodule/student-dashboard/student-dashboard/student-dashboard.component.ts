import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/features/dashboard/dashboard.service';
import { DashboardNotificationComponent } from '../dashboard-notification/dashboard-notification.component';
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
  mentorDetails: any
  performanceData: any
  gratitudeMessages: any
  notifications: any


  constructor(
    private service: StudentDashboardService,
    private router: Router,
    private dialog: MatDialog
  ) {
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

  onCourseChange() {
    console.log(this.course);
    this.openGurudakshinaAlert()
    this.openVolunteering()
    this.openCertificateAlert()
    this.data = ""
  }

  changeMentor(event: any) {
    console.log(event.checked);
  }
  changeChiefMentor(event: any) {
    console.log(event.checked);
  }
  openCertificateAlert() {
    const dialogref = this.dialog.open(DashboardNotificationComponent, {
      data: {
        title: "Certificate Alert",
        iscertificate: true,
        course: this.courseList.filter((ele: any) => ele.coursesId === this.course)[0].coursesName.trim(),
        message: null,
        lastdate: null
      },
      width: "60%",
      height: "55%",
      position: {
        top: "0%"
      }
    })

    dialogref.afterClosed().subscribe(data => {
      if (data) {
        console.log(data);

      }
    })
  }

  openGurudakshinaAlert() {
    const dialogref = this.dialog.open(DashboardNotificationComponent, {
      data: {
        title: "Gurudakshina",
        isgurudakshina: true,
        message: null,
        lastdate: null,
        paymentLastDate: new Date()
      },
      width: "60%",
      height: "55%",
      position: {
        top: "0%"
      }
    })

    dialogref.afterClosed().subscribe(data => {
      if (data) {
        console.log(data);

      }
    })
  }
  performanceAcknowledge(event: any) {
    console.log(event.checked);


  }
  watchCourseClasses() {

  }

  openVolunteering() {
    const dialogref = this.dialog.open(DashboardNotificationComponent, {
      data: {
        title: "Volunteering",
        isvolunterring: true,
        message: null
      },
      width: "50%",
      height: "50%",
      position: {
        top: "0%"
      }
    })

    dialogref.afterClosed().subscribe(data => {
      if (data) {
        console.log(data);

      }
    })
  }
  openNotification(value: any) {
    const dialogref = this.dialog.open(DashboardNotificationComponent, {
      data: {
        title: "Notification",
        isnotification: true,
        message: value || "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      },
      width: "50%",
      height: "40%",
      position: {
        top: "0%"
      }
    })

    dialogref.afterClosed().subscribe(data => {
      if (data) {
      }
    })
  }
  openGratitude(value: any) {

  }
  viewAllNotification() {

  }
  viewAllGratitude() {

  }
}
