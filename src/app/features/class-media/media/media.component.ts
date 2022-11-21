import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {
  data=[{"s_no":"1","date":"02-08-2022","type":"Live class Link","media_file":" 12",},
  {"s_no":"2","date":"02-08-2022","type":"media","media_file":" 11",},
  {"s_no":"3","date":"02-08-2022","type":"Live class Link","media_file":" 8",},
  {"s_no":"4","date":"02-08-2022","type":"Live class Link","media_file":" 9",},
  {"s_no":"5","date":"02-08-2022","type":"Live class Link","media_file":" 10",},
  {"s_no":"6","date":"02-08-2022","type":"Live class Link","media_file":" 5",},
  {"s_no":"7","date":"02-08-2022","type":"Live class Link","media_file":" 9",},]
  displayedColumns: string[] = ['s_no', 'date', 'type',"media_file","Action"];
  dataSource :any;
  disableSelect = new FormControl(false);

  constructor() { 
    this.dataSource=new MatTableDataSource<any>(this.data)
  }

  ngOnInit(): void {
  }

}
