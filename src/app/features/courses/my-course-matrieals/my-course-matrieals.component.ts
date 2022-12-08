import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-my-course-matrieals',
  templateUrl: './my-course-matrieals.component.html',
  styleUrls: ['./my-course-matrieals.component.css']
})
export class MyCourseMatriealsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

FormDeatils!:FormGroup
filterData:any
gridData = [];
catogeries:any
othervalue:any
media:any
datas:any
filerror!:boolean
newcatogeries=false
data=[{'S_No':'1', 'title':'Traditional Yoga', 'date':'2022-22-12', "mtype":"images"},
{'S_No':'2', 'title':'Traditional Yoga1', 'date':'2022-22-10', "mtype":"images2"},
{'S_No':'3', 'title':'Traditional Yoga2', 'date':'2022-22-12', "mtype":"images3"},
{'S_No':'4', 'title':'Traditional Yoga3', 'date':'2022-22-2', "mtype":"images4"},
{'S_No':'5', 'title':'Traditional Yoga4', 'date':'2022-22-1', "mtype":"images"}]
dataSource: any;
displayedColumns: string[] = ['S_No', 'title', 'date', "mtype", "Details"];

  constructor(private formbuilder:FormBuilder,private service:CoursesService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getmedias()
    this.getcoursecatogery()
  
  
     this.FormDeatils = this.formbuilder.group({
      courses: [null, Validators.compose([Validators.required])],
      others: [null, Validators.compose([Validators.required])],
      catogery: [null, Validators.compose([Validators.required])],
      addMedia : [null, Validators.compose([Validators.required])],
      upload: [null, Validators.compose([Validators.required])],
      videoLink : [null, Validators.compose([Validators.required])],
      message : [null, Validators.compose([Validators.required])],
      coursetitle:[null, Validators.compose([Validators.required])],
    

   })
   this.filterData = {
    filterColumnNames: this.displayedColumns.map(ele => ({ "Key": ele, "Value": "" })),
    gridData: this.gridData,
    dataSource: this.dataSource,
    paginator: this.paginator,
    sort: this.sort
  }
  this.data.map(ele=>ele.date).sort()
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
  newOthers(value:any){
    if(value=='Others'){
      this.newcatogeries=true
  
    }
    console.log(this.FormDeatils.value)
    console.log(this.othervalue)
  }

  getmedias() {
    this.service.getmediatype().subscribe({
      next: (response) => {
        this.media = response;
       
        console.log(this.media);
        

      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }
  getcoursecatogery() {
    this.service.getcatogerymaterial().subscribe({
      next: (response) => {
        this.catogeries = response;
       
        console.log(this.catogeries);
        

      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }


  viewDetails(element:any){

  }
  ngAfterViewInit() {
    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort;

  }
  updatePagination() {

    this.dataSource.paginator = this.paginator;
  }
  onsubmit(){
    this.onfilechange()
    if(this.filerror==false){
      this.openSnackBar('Data Added Successfully','ok')
      this.FormDeatils.reset()
    }
  }
  onfilechange() {
      this.filerror = this.FormDeatils.value.upload === null ? true : false

  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
