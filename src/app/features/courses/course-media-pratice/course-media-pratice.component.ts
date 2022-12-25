import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
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


  displayedColumns = ['id', 'title', 'description', 'uploadMediaFile', 'duration', 'metaKeyword', 'buttons']
  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private service: CoursesService,
    private _snackBar: MatSnackBar, private dialog: MatDialog
  ) {


    this.service.getcoursemedia().subscribe({
      next: (response) => {
        console.log(response);
        this.data = response

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
    this.getcourseslist()
    this.courseform = this.formbuilder.group({courses: [null, Validators.compose([Validators.required])],})
    this.addmediaform = this.formbuilder.group({


      videolink: [null, Validators.compose([Validators.required, Validators.pattern(InputvalidationService.inputvalidation.videolink)])],
      videotitle: [null, Validators.compose([Validators.required])],
      videodescription: [null, Validators.compose([Validators.required])],
      videoduration: [null, Validators.compose([Validators.required, Validators.pattern(InputvalidationService.inputvalidation.durationvalidation)])],
      vidoemetakeywords: [null, Validators.compose([Validators.required, Validators.pattern(InputvalidationService.inputvalidation.keywordsvalidation)])],
      videofile: [null, Validators.compose([])],
      courses1: [null, Validators.compose([Validators.required])]
      
     
    })
  }


  openImages() {


    const dialogref = this.dialog.open(AddCourseimageComponent, {
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

      this.addmediaform.value.mediafile = this.filedata
      this.addmediaform.value.videofile = this.filedata1

      this.addmediaform.value.socfile = this.filedata2


      const body = {

        "uploadMediaFile": this.addmediaform.value.mediafile,

        "videoLink": this.addmediaform.value.videolink,

        "title": this.addmediaform.value.videotitle,

        "description": this.addmediaform.value.videodescription,

        "duration": this.toHoursAndMinutes(Number(this.addmediaform.value.videoduration)),

        "metaKeyword": this.addmediaform.value.vidoemetakeywords,

      }

      console.log(body);

      this.service.postcoursemedia(body).subscribe({
        next: (response) => {
          this.addmediaform.reset()
          this.openSnackBar(response)

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

  }
  editdetails(element: any) {

  }
  openSnackBar(data: any) {
    this._snackBar.open(data.message, 'Close', {
      duration: 2 * 1000,
    });
  }

  deletedetails(id: any) {

    // const body = {
    //   "coursesId": id
    // }

    // const dialogref = this.dialog.open(DialogPopupComponent, {
    //   data: {
    //     title: "Delete Confirmation",
    //     message: "Are You Sure You Want To Delete this Course ?"
    //   },
    //   width: "30%"
    // })

    // dialogref.afterClosed().subscribe(data => {
    //   if (data) {
    //     this.AddCourseService.deletecourse(body).subscribe({
    //       next: (response) => {
    //         this.openSnackBar(response)
    //         this.addCourseForm.reset()
    //         this.getdata()
    //       },
    //       error: (error) => {
    //         console.error(error.message);
    //       }
    //     })
    //     return
    //   }

    // })



  }



}
