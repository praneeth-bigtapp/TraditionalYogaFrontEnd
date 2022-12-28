import { AutofillMonitor } from '@angular/cdk/text-field';
import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { TimeoutError } from 'rxjs';
import { DialogPopupComponent } from 'src/app/shared/dialog-popup/dialog-popup.component';
import { InputvalidationService } from 'src/app/shared/services/inputvalidation.service';
import { AddCoursedocumentComponent } from '../add-coursedocument/add-coursedocument.component';
import { AddCourseimageComponent } from '../add-courseimage/add-courseimage.component';
import { CoursesService } from '../courses.service';


export interface CourseData {
  no: string,
  title: string,
  description: string,
  mediatype: string,
  timeadded: string,
  keywords: string,

}


@Component({
  selector: 'app-course-media-pratice',
  templateUrl: './course-media-pratice.component.html',
  styleUrls: ['./course-media-pratice.component.css']
})



export class CourseMediaPraticeComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  pageno: number = 1
  addbtns=false
  updatebtn=false
  submitbtn=true
  title = ''
  keyword = ''
  description = ''
  filedata!: any
  filedata1!: any
  filedata2!: any
  paragrapherror: boolean = false
  filterData: any;
  gridData = [];
  dataSource: any
  categoryerror: boolean = false
  mediaId:any

  addmediaform!: FormGroup
  data!: any

  classtype!: string


  displaycontent: boolean = false
  courseform!: FormGroup;
  courseList:any

  onpaginatechange(event: any) {
    if (event.pageIndex === 0) {
      this.pageno = 1
      return
    }
    this.pageno = (event.pageIndex * event.pageSize) + 1
    return
  }


  displayedColumns = ['id', 'videoTitle', 'description', 'praticeDate','praticeTime', 'createdDate', 'metaKeyword', 'buttons']
  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private service: CoursesService,
    private _snackBar: MatSnackBar, private dialog: MatDialog
  ) {


 

    this.filterData = {
      filterColumnNames: this.displayedColumns.map((ele: any) => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };


    console.log(this.filterData);




  }

  ngOnInit(): void {
    this.getALLtabledata()
    this.getcourseslist()
   
    this.courseform = this.formbuilder.group({courses: [null, Validators.compose([Validators.required])],})
    this.addmediaform = this.formbuilder.group({


      videolink: [null, Validators.compose([Validators.required, Validators.pattern(InputvalidationService.inputvalidation.videolink)])],
      videotitle: [null, Validators.compose([Validators.required])],
      videodescription: [null, Validators.compose([Validators.required])],
      videoduration: [null, Validators.compose([Validators.required, Validators.pattern(InputvalidationService.inputvalidation.durationvalidation)])],
      vidoemetakeywords: [null, Validators.compose([Validators.required, Validators.pattern(InputvalidationService.inputvalidation.keywordsvalidation)])],
      videofile: null,
      courses1: [null, Validators.compose([Validators.required])],
      practiceTime:['05:00 PM', Validators.compose([Validators.required])],
      practiceDate:[null, Validators.compose([Validators.required])],
      Instructions:[null, Validators.compose([Validators.required])],

      
     
    })
  }

  getALLtabledata(){
    this.service.getcoursemedia().subscribe({
      next: (response) => {
        console.log(response);
        this.data = response
        this.data=this.data.reverse()

        this.dataSource = new MatTableDataSource<any>(this.data)
        this.filterData.gridData = this.data;
        this.filterData.dataSource = this.dataSource;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.filterData.sort = this.sort;
        for (let col of this.filterData.filterColumnNames) {
          col.Value = '';
        }

      },
      error: (error) => {
        console.error(error.message);

      }
    })
  }

  openImages() {


    const dialogref = this.dialog.open(AddCourseimageComponent, {
      data: {
        // course: this.coursename
      },
      
      width: "80%",
     
      
    })

    dialogref.afterClosed().subscribe(data => {
      if (data) {

        return
      }

    })
  }

  openDocument() {


    const dialogref = this.dialog.open(AddCoursedocumentComponent, {
      data: {
        // course: this.coursename
      },
      width: "80%"
    })

    dialogref.afterClosed().subscribe(data => {
      if (data) {

        return
      }

    })
  }


  paragraphchange() {

    this.paragrapherror = this.addmediaform.value.paragraph === null ? true : false

  }

  updatePagination() {
    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort;
  }
  getcourseslist() {
    this.service.getCourse().subscribe({
      next: (response) => {
        this.courseList = response;

        console.log(this.courseList);


      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }
  // typechange() {

  //   this.displaycontent = false
  //   this.categoryerror = false
  //   if (!this.classtype) {
  //     this.categoryerror = true
  //     return
  //   }

  //   this.gobutton()
  // }
  cancelbt(){
    this.displaycontent = false
    this.addmediaform.reset()
    this.updatebtn=false
    this.submitbtn=true

  }
  gobutton() {
    

    this.displaycontent = true
    this.categoryerror = false

    const classtype = this.classtype
    console.log(classtype);
  }

  onfilechange(event: any) {
   

    this.filedata = event.target.files[0].name
  }
 
  viewmanage(data: any) {
    console.log(data);

  }

  toHoursAndMinutes(totalMinutes: number) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return Number(`${hours}.${minutes}`)
  }
  addmedia() {
    
    

    this.paragraphchange()

    console.log(this.addmediaform.valid);


    if (this.addmediaform.valid) {
      this.addbtns=true

      
      this.addmediaform.value.videofile = this.filedata1 || ''

  

      let date=new Date()
      // let date2=date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear()

      const body = {
       
        "courseId": {
            "coursesId": this.addmediaform.value.courses1
            
        },
        "praticeDate":this.addmediaform.value.practiceDate ,
        "praticeTime":this.addmediaform.value.practiceTime,
        "videoLink": this.addmediaform.value.videolink,
        "videoTitle": this.addmediaform.value.videotitle,
        "durationVideo": this.addmediaform.value.videoduration,
        "metaKeyword": this.addmediaform.value.vidoemetakeywords,
        "fileUpload": this.addmediaform.value.videofile,
        "description":this.addmediaform.value.videodescription,
        "instruction": this.addmediaform.value.Instructions,
        "createdBy": null,
        "updateBy": null,
        "updateDate": null,
        "isActive": "Y"
    }

      console.log(body);

      this.service.postcoursemediaAdd(body).subscribe({
        next: (response) => {
          this.addmediaform.reset()
          this.openSnackBar(response)
          this.getALLtabledata()
          

        },
        error: (error) => {
          console.error(error.message);
        }
      })


    }
    else {
      this.addmediaform.markAllAsTouched()
    }

  }

  viewDetails(element: any) {
this.updatebtn=false
this.submitbtn=false
this.addbtns=false
this.displaycontent=true
console.log(element);
// let date=new Date(element.practiceDate)
// let date2=date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()
this.addmediaform .setValue({
  videolink: element.videoLink,
  videotitle: element.videoTitle,
  videodescription: element.description,
  videoduration:element.durationVideo,
  vidoemetakeywords:element.metaKeyword,
  videofile: '',
  courses1: element.courseId.coursesId,
  practiceTime:element.praticeTime,
  practiceDate:formatDate(element.praticeDate, "yyyy-MM-dd", 'en'),
  Instructions:element.instruction, 
 
})
window.scroll({ 
  top: 0, 
  left: 0, 
  behavior: 'smooth' 
});

  }
  compareselect(obj1: any, obj2: any) {
    
    
    return obj1 && obj2 && obj1 === obj2
  }
  editdetails(element: any) {
    this.mediaId=element.mediaId
    this.addbtns=true
    this.updatebtn=true
    this.submitbtn=false
    this.displaycontent=true
//     let date=new Date(element.practiceDate)
// let date2=date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear()
    this.addmediaform .setValue({
      videolink: element.videoLink,
      videotitle: element.videoTitle,
      videodescription: element.description,
      videoduration:element.durationVideo,
      vidoemetakeywords:element.metaKeyword,
      videofile: '',
      courses1: element.courseId.coursesId,
      practiceTime:element.praticeTime,
      practiceDate:formatDate(element.praticeDate, "yyyy-MM-dd", 'en'),
      Instructions:element.instruction, 
     
    })
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
});
   

  }
  openSnackBar(data: any) {
    this._snackBar.open(data.message, 'Close', {
      duration: 2 * 1000,
    });
  }

  saveData(){
    this.updatebtn=false
    this.submitbtn=true
    this.addmediaform.value.videofile = this.filedata1 || ''
    const body = {
      "mediaId": this.mediaId,
      "courseId": {
          "coursesId": this.addmediaform.value.courses1
          
      },
      "praticeDate":this.addmediaform.value.practiceDate ,
      "praticeTime":this.addmediaform.value.practiceTime,
      "videoLink": this.addmediaform.value.videolink,
      "videoTitle": this.addmediaform.value.videotitle,
      "durationVideo": this.addmediaform.value.videoduration,
      "metaKeyword": this.addmediaform.value.vidoemetakeywords,
      "fileUpload": this.addmediaform.value.videofile,
      "description":this.addmediaform.value.videodescription,
      "instruction": this.addmediaform.value.Instructions,
      "createdBy": null,
      "createdDate": null,
      "updateBy": null,
      "updateDate": null,
      "isActive": "Y"
  }
  console.log(body);
  
  this.service.postcoursemediasave(body).subscribe({
    next: (response) => {
      this.addmediaform.reset()
      this.openSnackBar(response)
      this.getALLtabledata()
      

    },
    error: (error) => {
      console.error(error.message);
    }
  })

  }

  deletedetails(id: any) {

    const body = {
      "mediaId": id
  }

    const dialogref = this.dialog.open(DialogPopupComponent, {
      data: {
        title: "Delete Confirmation",
        message: "Are You Sure You Want To Delete this Course ?"
      },
      width: "30%"
    })

    dialogref.afterClosed().subscribe(data => {
      if (data) {
        this.service.postcoursemediadelete(body).subscribe({
          next: (response) => {
            this.addmediaform.reset()
            this.openSnackBar(response)
            this.getALLtabledata()
            
      
          },
          error: (error) => {
            console.error(error.message);
          }
        })
        return
      }

    })



  }



}
