import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-my-course-matrieals',
  templateUrl: './my-course-matrieals.component.html',
  styleUrls: ['./my-course-matrieals.component.css']
})
export class MyCourseMatriealsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
courses!:FormGroup;
coursesDescription!:FormGroup
FormDeatils!:FormGroup
filterData:any
gridData = [];
// data:any;
datas:any
data=[{'S_No':'1', 'title':'Traditional Yoga', 'description':"All the scriptures which need to the shared with the students will be avaliable in this section.", "mtype":"images"},
{'S_No':'1', 'title':'Traditional Yoga', 'description':"All the scriptures which need to the shared with the students will be avaliable in this section.", "mtype":"images"},
{'S_No':'1', 'title':'Traditional Yoga', 'description':"All the scriptures which need to the shared with the students will be avaliable in this section.", "mtype":"images"},
{'S_No':'1', 'title':'Traditional Yoga', 'description':"All the scriptures which need to the shared with the students will be avaliable in this section.", "mtype":"images"},
{'S_No':'1', 'title':'Traditional Yoga', 'description':"All the scriptures which need to the shared with the students will be avaliable in this section.", "mtype":"images"}]
dataSource: any;
displayedColumns: string[] = ['S_No', 'title', 'description', "mtype", "Details"];

  constructor(private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.courses = this.formbuilder.group({

     courses: [null, Validators.compose([Validators.required])],
    

    })
    this.coursesDescription = this.formbuilder.group({

        categories: [null, Validators.compose([Validators.required])],
        Description : [null, Validators.compose([Validators.required])],
      
 
     })
     this.FormDeatils = this.formbuilder.group({
      catogory: [null, Validators.compose([Validators.required])],
      addMedia : [null, Validators.compose([Validators.required])],
      upload: [null, Validators.compose([Validators.required])],
      videoLink : [null, Validators.compose([Validators.required])],
      message : [null, Validators.compose([Validators.required])],
    

   })
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
  viewDetails(element:any){

  }
  updatePagination() {

    this.dataSource.paginator = this.paginator;
  }


}
