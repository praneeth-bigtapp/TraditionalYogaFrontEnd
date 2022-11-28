import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators,FormGroup,  FormBuilder, } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-map-course',
  templateUrl: './map-course.component.html',
  styleUrls: ['./map-course.component.css']
})
export class MapCourseComponent implements OnInit {
  data=[{"sno":"1","image":"02-08-2022","name":"Live class Link","emailId":" 12", "country":"india","Gender":"male","usersince":"2020","status":"","view":"","select":""},
  {"sno":"1","image":"02-08-2022","name":"Live class Link","emailId":" 12", "country":"india","Gender":"male","usersince":"2020","status":"","view":"","select":""},
  {"sno":"1","image":"02-08-2022","name":"Live class Link","emailId":" 12", "country":"india","Gender":"male","usersince":"2020","status":"","view":"","select":""},
  {"sno":"1","image":"02-08-2022","name":"Live class Link","emailId":" 12", "country":"india","Gender":"male","usersince":"2020","status":"","view":"","select":""},
  {"sno":"1","image":"02-08-2022","name":"Live class Link","emailId":" 12", "country":"india","Gender":"male","usersince":"2020","status":"","view":"","select":""},
  ]
  displayedColumns: string[] = ['sno', 'image', 'name',"emailId","country","Gender","usersince","status", "view", "select"];
  dataSource :any;
  disableSelect = new FormControl(false);
  nameerror = new FormControl('', [Validators.required ]);
  mailerror = new FormControl('', [Validators.required ]);
  selectMob = new FormControl('', [Validators.required ]);
  selectRegion = new FormControl('', [Validators.required ]);
  status = new FormControl('', [Validators.required ]);

 
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
 


  constructor() {
   
  
   
   }

  ngOnInit(): void {
    this.dataSource=new MatTableDataSource<any>(this.data)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   
  

    
    
  }



 
}



