import { Component, OnInit } from '@angular/core';
import { ViewstudentService } from '../viewstudent.service';

@Component({
  selector: 'app-studentprofile',
  templateUrl: './studentprofile.component.html',
  styleUrls: ['./studentprofile.component.css']
})
export class StudentprofileComponent implements OnInit {
  StudentList: any;
  selectedStudent: any

  constructor(
    private service: ViewstudentService
  ) { }

  ngOnInit(): void {
    this.getStudentList()
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

  onSelectStudent() {
   
  }
}
