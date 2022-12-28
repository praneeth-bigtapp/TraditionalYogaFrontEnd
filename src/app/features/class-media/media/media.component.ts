import { SelectionModel } from '@angular/cdk/collections';
import { formatDate } from '@angular/common';
import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs';
import { DialogPopupComponent } from 'src/app/shared/dialog-popup/dialog-popup.component';
import { InputvalidationService } from 'src/app/shared/services/inputvalidation.service';
import { GlimpemediaComponent } from '../glimpemedia/glimpemedia.component';
import { ServicesService } from '../services.service';
import { ShortvideomediaComponent } from '../shortvideomedia/shortvideomedia.component';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  selection = new SelectionModel<any>(true, []);
  submitbtn=true
  pageno: number = 1
  isothers: boolean = false
  displayform: boolean = false
  courselist!: any
  categorylist!: any
  displayedColumns: string[] = ['classMediaId', 'classDate', 'title', "classLink",'coursesName', "Action"];
  dataSource: any;
  disableSelect = new FormControl(false);
  dataForm!: FormGroup
  dateForm!: FormGroup
  data: any
  coursename!: any
  courses: any
  id: any
  filterData: any;
  categoryerror: boolean = false
  gridData = [];
  selectedmember!: any
  filerror!: boolean

  shortvideolist: any[] = []

  glimpsefile!: any

  glimpseform !: FormGroup
  videoform!: FormGroup
  shortvideoform!: FormGroup

  typecategory!: any
  displaycontent: boolean = false
  iseditable: boolean = false
  // data: any;

  constructor(private formbuilder: FormBuilder, private services: ServicesService, private _snackBar: MatSnackBar, private dialog: MatDialog,
  ) {

    this.dateForm = this.formbuilder.group({


      date: [null, Validators.compose([])],
      courseslist: [null, Validators.compose([])],

    })
    this.filterData = {
      filterColumnNames: this.displayedColumns.map(ele => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    }

    services.getcoursemediacategory().subscribe({
      next: (response) => {

        this.categorylist = response

      },
      error: (error) => {
        console.error(error.message);

      }
    })

    this.videoform = this.formbuilder.group({
      courseMediaId: [null],
      course: [null, Validators.compose([Validators.required])],

      videolink: [null, Validators.compose([Validators.required, Validators.pattern(InputvalidationService.inputvalidation.videolink)])],
      date: [null, Validators.compose([Validators.required])],
      title: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],

    })
  }

  openSnackBar(data: any) {
    this._snackBar.open(data.message, 'Close', {
      duration: 2 * 1000,
    });
  }
  coursechange() {
    this.displaycontent = true
  }

  gobutton() {

    this.displaycontent = true
    this.displayform = true

  }

  openliveclass() {
    this.displayform = true
  }

  closeliveform() {
    this.displaycontent = false
    this.videoform.reset()
  }

  openshortvideo() {


    const dialogref = this.dialog.open(ShortvideomediaComponent, {
      data: {
        course: this.coursename
      },
      width: "100%"
    })

    dialogref.afterClosed().subscribe(data => {
      if (data) {

        return
      }

    })
  }
  openglimpse() {


    const dialogref = this.dialog.open(GlimpemediaComponent, {
      data: {
        course: this.coursename
      },
      width: "100%"
    })

    dialogref.afterClosed().subscribe(data => {
      if (data) {

        return
      }

    })
  }
  ngOnInit(): void {


    this.getalldata()
    this.getallcourse()
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
  getalldata() {
    this.services.getALLMediadetails().subscribe({
      next: (response) => {
        this.data = response;
        this.data=this.data.reverse()
        console.log(this.data);
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
    });

  }

  onpaginatechange(event: any) {
    if (event.pageIndex === 0) {
      this.pageno = 1
      return
    }
    this.pageno = (event.pageIndex * event.pageSize) + 1
    return
  }
  getallcourse() {
    this.services.getcoursesdetails().subscribe({
      next: (response) => {

        this.courses = response

      },
      error: (error) => {
        console.error(error.message);
      }
    });

  }

  videoformsubmit() {
    if (this.videoform.invalid)
      return this.videoform.markAllAsTouched()

    const { course, courseMediaId, videolink, date, title, description } = this.videoform.value



    if (this.iseditable) {
     
      const body =  {
        "liveClassId": this.videoform.value.courseMediaId,
        "coursesId": {
            "coursesId":this.videoform.value.course
        },
        "classLink": this.videoform.value.videolink,
        "classDate": this.videoform.value.date,
        "title": this.videoform.value.title,
        "description": this.videoform.value.description
    }
      this.services.postupdatemedia(body).subscribe({
        next: (response) => {
  
          this.videoform.reset()
  
          this.openSnackBar(response)
          this.getalldata()
        },
        error: (error) => {
          console.error(error.message);
  
        }
      })
      return 
    }

    const body =  {
      
      "coursesId": {
          "coursesId":this.videoform.value.course
      },
      "classLink": this.videoform.value.videolink,
      "classDate": this.videoform.value.date,
      "title": this.videoform.value.title,
      "description": this.videoform.value.description
  }

    this.services.postaddmedia(body).subscribe({
      next: (response) => {

        this.videoform.reset()

        this.openSnackBar(response)
        this.getalldata()
      },
      error: (error) => {
        console.error(error.message);

      }
    })

  }

  filechange(event: any) {
    this.filerror = this.glimpseform.value.file === null ? true : false
    this.glimpsefile = event.target.files[0].name
  }

  datefilter() {
    const { date, courseslist } = this.dateForm.value

    let filterData = this.data

    if (courseslist) {

      filterData = filterData.filter((ele: any) => ele.coursesId.coursesId === courseslist)
    }

    // if (date) {
    //   filterData = filterData.filter((ele: any) => ele.classDate === date)

    // }

    this.dataSource = new MatTableDataSource<any>(filterData)
    this.filterData.gridData = filterData;
    this.filterData.dataSource = this.dataSource;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.filterData.sort = this.sort;
    for (let col of this.filterData.filterColumnNames) {
      col.Value = '';
    }
  }

  updatePagination(col: any) {

    this.filterData.dataSource.paginator = this.paginator;
  }

  viewDetails(element: any) {
    this.gobutton()
    this.iseditable=false
    this.submitbtn=false
    this.videoform.setValue({
      courseMediaId: element.liveClassId,
      course:element.coursesId.coursesId,

      videolink: element.classLink,
      date: formatDate(element.classDate, "yyyy-MM-dd", 'en'),
      title: element.title,
      description: element.description,

    })
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }
  editdetails(element: any) {
    this.gobutton()
    this.iseditable=true
    this.submitbtn=false

    this.videoform.setValue({
      courseMediaId: element.liveClassId,
      course:element.coursesId.coursesId,

      videolink: element.classLink,
      date: formatDate(element.classDate, "yyyy-MM-dd", 'en'),
      title: element.title,
      description: element.description,

    })
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }
  deletedetails(id: any) {

    console.log(id);

    const body = {
      "liveClassId": id
    }

    const dialogref = this.dialog.open(DialogPopupComponent, {
      data: {
        title: "Delete Confirmation",
        message: "Are You Sure You Want To Delete this media ?"
      },
      width: "30%",
      height:"25%"
    })

    dialogref.afterClosed().subscribe(data => {
      if (data) {
        this.services.postdeletemedia(body).subscribe({
          next: (response) => {
            this.openSnackBar(response)
            this.getalldata()
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
