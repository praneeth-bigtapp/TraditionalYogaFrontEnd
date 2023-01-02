import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {


  date: any = new Date()
  constructor(
  ) { }

  ngOnInit(): void {
  }

  savePdf(data: any) {

  }
  saveWord(data: any) {

  }

  saveFile(data: any) {

  }
}
