import { SelectionModel } from '@angular/cdk/collections';
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
  data=[{"sno":"1","name":"Ajith R","emailId":" ajith98ra@gmail", "country":"india","Gender":"male","usersince":"2020","status":"","view":"","select":""},
  {"sno":"1","name":"ajith K","emailId":" ajithk@gmail", "country":"india","Gender":"male","usersince":"2020","status":"","view":"","select":""},
  {"sno":"1","name":"Karthi","emailId":"karthi@gmail", "country":"india","Gender":"male","usersince":"2020","status":"","view":"","select":""},
  {"sno":"1","name":"Ajith","emailId":" ajith98ra@gmail", "country":"india","Gender":"male","usersince":"2020","status":"","view":"","select":""},
  {"sno":"1","name":"ajith","emailId":" ajith98ra@gmail", "country":"india","Gender":"male","usersince":"2020","status":"","view":"","select":""},
  ]
  displayedColumns: string[] = ['sno', 'image', 'name',"emailId","country","Gender","usersince","status", "view", "select"];
  dataSource :any;
  disableSelect = new FormControl(false);
  nameerror = new FormControl('', [Validators.required ]);
  mailerror = new FormControl('', [Validators.required ]);
  selectMob = new FormControl('', [Validators.required ]);
  selectRegion = new FormControl('', [Validators.required ]);
  country = new FormControl('', [Validators.required ]);
  status = new FormControl('', [Validators.required ]);
  agefrom = new FormControl('', [Validators.required ]);
  ageto = new FormControl('', [Validators.required ]);
  selection = new SelectionModel<any>(true, []);
 
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  filterData: any;
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  

  constructor() {
   
  
   
   }

  ngOnInit(): void {
    this.dataSource=new MatTableDataSource<any>(this.data)
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   
  

    
    
  }
  ngAfterViewInit() {
    this.filterData.dataSource.paginator = this.paginator;

  }
  updatePagination() {

    this.dataSource.paginator = this.paginator;
  }
  
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach((row: any) => this.selection.select(row));
  }
  



 
}



