import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/data/services/admin-module/user-management/student-master/student.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

  StudentList: any;
  selectedStudent: any
  CourseList: any;
  selectedCourse: any
  displaycontent: boolean = false
  constructor(
    private service: StudentService
  ) { }

  ngOnInit(): void {
    this.getStudentList()
    this.onselectCourse()
  }


  getStudentList() {
    this.service.getStudent().subscribe({
      next: (response) => {
        // console.log(response);
        this.StudentList = response;
      },
      error: (error) => {

      }
    });

  }

  onselectCourse() {
    this.service.getCourses().subscribe({
      next: (response) => {
        this.CourseList = response;
      },
      error: (error) => {

      }
    });
  }

  onSelectStudent() {

  }
  submit() {
    this.displaycontent = true
  }
}
