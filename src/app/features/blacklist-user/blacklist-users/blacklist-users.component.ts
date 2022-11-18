import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, } from '@angular/material/table';


@Component({
  selector: 'app-blacklist-users',
  templateUrl: './blacklist-users.component.html',
  styleUrls: ['./blacklist-users.component.css']
})
export class BlacklistUsersComponent implements OnInit {
  data=[{"s_no":"1","blacklist_date":"19-08-2022","Emailid":"test@gmail.com","comments":"t is a long established fact that a reader will be distracted by the readable conetent of a page when looking at its layout. The point of using Loem ipsum is that it has a more-or-less normal distribution of letters"},
  {"s_no":"1","blacklist_date":"19-08-2022","Emailid":"test@gmail.com","comments":"t is a long established fact that a reader will be distracted by the readable conetent of a page when looking at its layout. The point of using Loem ipsum is that it has a more-or-less normal distribution of letters"},
  {"s_no":"1","blacklist_date":"19-08-2022","Emailid":"test@gmail.com","comments":"t is a long established fact that a reader will be distracted by the readable conetent of a page when looking at its layout. The point of using Loem ipsum is that it has a more-or-less normal distribution of letters"}]
  displayedColumns: string[] = ['s.no', 'blacklist_date', 'Emailid',"comments","action"];
  dataSource :any;
  constructor() {
    this.dataSource=new MatTableDataSource<any>(this.data)
   
   }

  ngOnInit(): void {
  }

}
