import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from 'src/app/data/services/admin-module/user-management/student-master/student.service';
import { DialogPopupComponent } from 'src/app/shared/components/dialog-popup/dialog-popup.component';

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

}
