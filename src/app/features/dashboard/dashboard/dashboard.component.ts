import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  courseForm!: FormGroup;
  overallReport: any;
  coursesReport: any;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.courseForm = this.formBuilder.group({
      roleId: [null, Validators.required]
    });
    this.overallReport = {
      registeredUsers: 18547,
      donationRecieved: 54785960,
      courses: 15,
      subscribers: 2015,
    }
    this.coursesReport = {
      enrolledUsers: 18547,
      activeUser: 2541,
      droppedUsers: 15,
      mentor: 57,
      cheifMentor: 57,
    }
  }

}
