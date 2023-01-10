import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from 'src/app/data/services/admin-module/course-management/course-material/course-material.service';
import { WorldWideApplicationService } from 'src/app/data/services/admin-module/word-wide-application/world-wide-application.service';

@Component({
  selector: 'app-manage-exemption-course',
  templateUrl: './manage-exemption-course.component.html',
  styleUrls: ['./manage-exemption-course.component.css']
})
export class ManageExemptionCourseComponent implements OnInit {
  courseList: any;
  course!: any
  manageExemption!: any
  constructor(
    private courseService: CoursesService,
    private service: WorldWideApplicationService,
    private _snackBar: MatSnackBar


  ) { }

  ngOnInit(): void {
    this.courseService.getCourse().subscribe({
      next: (response) => {
        this.courseList = response

      },

      error: (error) => {
        console.error(error.message);

      }
    })
  }

  courseChange() {
    this.getmanageExemption()
  }

  getmanageExemption() {
    const body = {
      // :course
    }
    this.service.getmanageExemptionCourse(body).subscribe({
      next: (response) => {
        this.manageExemption = response
      },
      error: (error) => {
        console.error(error);
        this.manageExemption = [
          {
            text: "Frequency to validate for every (Number of Days)",
            value: null,
            isEnable: false,
          },
          {
            text: "Percentage of Minimum Screen time for Live classes",
            value: null,
            isEnable: false,
          },
          {
            text: "Percentage of Minimum Screen time for course practice sessions",
            value: null,
            isEnable: false,
          },
          {
            text: "Number of Gratitude messages to be sent & circulated",
            value: null,
            isEnable: false,
          },
          {
            text: "Percentage of Tasks/Assignment to be submitted",
            value: null,
            isEnable: false,
          },
          {
            text: "Percentage of Minimu, Screen time for short videos",
            value: null,
            isEnable: false,
          }
        ]
      }
    })
  }

  openSnackBar(data: any) {
    this._snackBar.open(data.message, 'Close', {
      duration: 2 * 1000,
    });
  }
  isEnableorNot(element: any) {
    const yes = ["Yes", "Y", "yes", "y"]
    const no = ["No", "N", "no", "n"]
    return yes.includes(element)
  };

  changeExemptionStatus(element: any) {
    element.isEnable = !element.isEnable
    this.submitManageExemption()
  }

  submitManageExemption() {
    console.log(this.manageExemption);

    const body = {}

    this.service.manageExemptionCourse(body).subscribe({
      next: (response) => {
        this.openSnackBar(response)
      },
      error: (error) => {
        console.log(error);

      }
    })

  }


}
