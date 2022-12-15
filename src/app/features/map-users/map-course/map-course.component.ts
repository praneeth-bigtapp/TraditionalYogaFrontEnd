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
  iseditable: boolean = false
  disableSelect = new FormControl(false);
  // nameerror = new FormControl('', [Validators.required ]);
  // mailerror = new FormControl('', [Validators.required ]);
  // selectMob = new FormControl('', [Validators.required ]);
  // selectRegion = new FormControl('', [Validators.required ]);
  // country = new FormControl('', [Validators.required ]);
  // status = new FormControl('', [Validators.required ]);
  // agefrom = new FormControl('', [Validators.required ]);
  // ageto = new FormControl('', [Validators.required ]);
  selection = new SelectionModel<any>(true, []);
  Mapusers!: FormGroup 
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  filterData: any;
  gridData: any;
  displaycontent: boolean = false

 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  

  constructor( private formbuilder:FormBuilder) {
    this.Mapusers = this.formbuilder.group({
      courseId: [null],
      nameerror: [null, Validators.compose([Validators.required])],
      mailerror: [null, Validators.compose([Validators.required])],
      country: [null, Validators.compose([Validators.required])],
      // duration: [null, Validators.compose([Validators.required])],
      selectMob: [null, Validators.compose([Validators.required])],
      selectRegion: [null, Validators.compose([Validators.required])],
      agefrom: [null, Validators.compose([Validators.required])],
      ageto: [null, Validators.compose([Validators.required])],
      status: [null, Validators.compose([Validators.required])],
      course: [null, Validators.compose([Validators.required])],
      gender: [null, Validators.compose([Validators.required])],
    });
   
  
   
   }

  ngOnInit(): void {
    this.dataSource=new MatTableDataSource<any>(this.data)
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.filterData = {
      filterColumnNames: this.displayedColumns.map(ele => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    }
    this.dataSource = new MatTableDataSource<any>(this.data)
    this.filterData.gridData = this.data;
    this.filterData.dataSource = this.dataSource;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.filterData.sort = this.sort;
    for (let col of this.filterData.filterColumnNames) {
      col.Value = '';
    }
   
  

    
    
  }
  ngAfterViewInit() {
    this.filterData.dataSource.paginator = this.paginator;

  }
  mapCourse(){
    this.displaycontent = !this.displaycontent
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
  reseteditable() {
    // this.addCourseForm.reset()
    this.iseditable = false
    this.displaycontent = !this.displaycontent
  }
  



 
}



