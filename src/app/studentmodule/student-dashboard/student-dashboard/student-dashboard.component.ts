import { Component, OnInit } from '@angular/core';
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
  constructor(
    private service: StudentDashboardService,
    private router: Router,
  ) {

    this.service.getallcourses().subscribe({
      next: (response) => {
        this.courseList = response

      },

      error: (error) => {
        console.error(error.message);

      }
    })


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
}
