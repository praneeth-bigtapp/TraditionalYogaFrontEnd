import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


export interface PeriodicElement {
  SNo: number;
  Date: string;
  AmountDonated: number;
  Description: string;
  ModeofPayment:string;
}

export interface PurcheseDataEle {
  SNo: number;
  Date: string;
  PurchesedAmount: number;
  ProductName: string;

}

export interface Volunteer {
  SNo: number;
  Category: string;
  Courses: string;
  StartDate: string;
  EndDate: string;
  SeervedAs:string;
  noMembers:number;

}

let ELEMENT_DATA: PeriodicElement[] = [
  {SNo: 1, Date: '21-08-2022', AmountDonated: 1.0079, Description: 'H', ModeofPayment:'online'},
  {SNo: 2, Date: '21-08-2022', AmountDonated: 4.0026, Description: 'He', ModeofPayment:'online'},
  {SNo: 3, Date: '21-08-2022', AmountDonated: 6.941, Description: 'Li',  ModeofPayment:'UPI'},  
];


let PURCHESD_DATA: PurcheseDataEle[] = [
  {SNo: 1, Date: '21-08-2022', PurchesedAmount: 1.0079, ProductName: 'H'},
  {SNo: 2, Date: '21-08-2022', PurchesedAmount: 4.0026, ProductName: 'He'},
  {SNo: 3, Date: '21-08-2022', PurchesedAmount: 6.941, ProductName: 'Li'},  
];

let VOLUNTEER_DATA: Volunteer[] = [
  {SNo: 1, Category: 'abc', Courses: '1.0079', StartDate: '21-08-2018', EndDate:'21-08-2018', SeervedAs: 'xxx', noMembers:1},
  {SNo: 1, Category: 'abc', Courses: '1.0079', StartDate: '21-08-2018', EndDate:'21-08-2018', SeervedAs: 'xxx', noMembers:1},
  {SNo: 1, Category: 'abc', Courses: '1.0079', StartDate: '21-08-2018', EndDate:'21-08-2018', SeervedAs: 'xxx', noMembers:1},
];

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})


export class StudentProfileComponent implements OnInit {

  displayedColumns: string[] = ['SNo', 'Date', 'AmountDonated', 'Description', 'ModeofPayment'];
  dataSource  = ELEMENT_DATA;

  displayedColumnsE: string[] = ['SNo', 'Date', 'PurchesedAmount', 'ProductName'];
  dataSource1 = PURCHESD_DATA;

  displayedColumnsV: string[] = ['SNo', 'Category', 'Courses', 'StartDate', 'EndDate', 'SeervedAs', 'noMembers'];
  dataSource2 = VOLUNTEER_DATA;


  constructor( public dialog: MatDialog ) { }


  ngOnInit(): void {
  }

}
