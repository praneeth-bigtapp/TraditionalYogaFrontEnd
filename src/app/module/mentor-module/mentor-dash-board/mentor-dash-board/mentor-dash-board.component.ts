import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface PeriodicElement {
  date: string;
  totalActivestudents: number;
  performance: string;
  
}

export interface PeriodicElement2 {
  watchinglive: number;
  date: string;
  
  
}

const ELEMENT_DATA: PeriodicElement[] = [
  {date: "", totalActivestudents: 10, performance: "Good"},
  {date: "04-01-2023", totalActivestudents: 7, performance: "Average"},
  {date: "", totalActivestudents: 6, performance: "Poor"},
  {date: "", totalActivestudents: 2, performance:"Red Alert"},
 
];

const ELEMENT_DATA2: PeriodicElement2[] = [
  {date: '04-01-2023', watchinglive: 12},
  
 
];

@Component({
  selector: 'app-mentor-dash-board',
  templateUrl: './mentor-dash-board.component.html',
  styleUrls: ['./mentor-dash-board.component.css']
})
export class MentorDashBoardComponent implements OnInit {
  displayedColumns: string[] = ['date', 'totalActivestudents', 'performance'];
  dataSource = ELEMENT_DATA;

  displayedColumns2: string[] = ['date', 'watchinglive', 'student'];
  dataSource2 = ELEMENT_DATA2;

  constructor(private router: Router) { 
    
  }

  ngOnInit(): void {
  }

  viewDetails(){
    this.router.navigateByUrl("mentordashboardstudent");
  }


}
