import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/data/services/admin-module/user-management/student-master/student.service';

@Component({
  selector: 'app-studentprofile',
  templateUrl: './studentprofile.component.html',
  styleUrls: ['./studentprofile.component.css']
})
export class StudentprofileComponent implements OnInit {
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
        console.log(this.CourseList)
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
