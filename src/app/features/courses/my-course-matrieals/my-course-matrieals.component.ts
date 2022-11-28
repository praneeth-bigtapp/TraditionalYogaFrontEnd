import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-my-course-matrieals',
  templateUrl: './my-course-matrieals.component.html',
  styleUrls: ['./my-course-matrieals.component.css']
})
export class MyCourseMatriealsComponent implements OnInit {
courses!:FormGroup;
coursesDescription!:FormGroup
FormDeatils!:FormGroup
// data:any;
datas:any
data=[{'S_No':'1', 'title':'Traditional Yoga', 'description':"All the scriptures which need to the shared with the students will be avaliable in this section.", "mtype":"images"},
{'S_No':'1', 'title':'Traditional Yoga', 'description':"All the scriptures which need to the shared with the students will be avaliable in this section.", "mtype":"images"},
{'S_No':'1', 'title':'Traditional Yoga', 'description':"All the scriptures which need to the shared with the students will be avaliable in this section.", "mtype":"images"},
{'S_No':'1', 'title':'Traditional Yoga', 'description':"All the scriptures which need to the shared with the students will be avaliable in this section.", "mtype":"images"},
{'S_No':'1', 'title':'Traditional Yoga', 'description':"All the scriptures which need to the shared with the students will be avaliable in this section.", "mtype":"images"}]
dataSource: any;
displayedColumns: string[] = ['S_No', 'Title', 'Description', "Media type", "Details"];

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
   this.dataSource = new MatTableDataSource<any>(this.data);
  }
  viewDetails(element:any){

  }

}
