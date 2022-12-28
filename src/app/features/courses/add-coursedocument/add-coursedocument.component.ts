import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DialogPopupComponent } from 'src/app/shared/dialog-popup/dialog-popup.component';
import { InputvalidationService } from 'src/app/shared/services/inputvalidation.service';
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
  selector: 'app-add-coursedocument',
  templateUrl: './add-coursedocument.component.html',
  styleUrls: ['./add-coursedocument.component.css']
})
export class AddCoursedocumentComponent implements OnInit {


  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  pageno: number = 1
  updatebtn: boolean = false
  submitbtn = true
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
  courseList: any

  onpaginatechange(event: any) {
    if (event.pageIndex === 0) {
      this.pageno = 1
      return
    }
    this.pageno = (event.pageIndex * event.pageSize) + 1
    return
  }


  displayedColumns = ['id', 'documentTitle', 'description', 'buttons']
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

    this.getdata()
  }

  getdata() {
    this.service.getcoursedoc().subscribe({
      next: (response) => {
        console.log(response);
        this.data = response
        this.data = this.data.reverse()

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

  ngOnInit(): void {
    this.getcourseslist()
    this.courseform = this.formbuilder.group({ courses: [null, Validators.compose([Validators.required])], })
    this.addmediaform = this.formbuilder.group({
      documentId: [null],

      courses1: [null, Validators.compose([Validators.required])],

      mediatitle: [null, Validators.compose([Validators.required])],
      docfile: [null],
      mediadescription: [null, Validators.compose([Validators.required])],
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
  cancelbt() {
    this.displaycontent = false
    this.addmediaform.reset()
    this.updatebtn = false
    this.submitbtn = true

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

      this.addmediaform.value.docfile = this.filedata || ""
      this.addmediaform.value.videofile = this.filedata1 || ""

      this.addmediaform.value.socfile = this.filedata2 || ""

      if (this.updatebtn) {
        console.log("editing");

        this.saveData()
        return
      }
      console.log("added");

      const body = {
        "courseId": {
          "coursesId": this.addmediaform.value.courses1
        },
        "documentTitle": this.addmediaform.value.mediatitle,
        "uploadFile": this.addmediaform.value.docfile,
        "description": this.addmediaform.value.mediadescription,
        "createdBy": null,
        "createdDate": null,
        "updateBy": null,

        "updateDate": null,
        "isActive": "Y",
      }

      console.log(body);

      this.service.postcoursedocAdd(body).subscribe({
        next: (response) => {
          this.addmediaform.reset()
          this.openSnackBar(response)
          this.getdata()

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
    this.submitbtn = false
    this.updatebtn = false
    this.displaycontent = true
    console.log(element);


    this.addmediaform.setValue({
      documentId: element.documentId,
      courses1: element.courseId.coursesId,
      mediatitle: element.documentTitle,
      docfile: null,
      mediadescription: element.description,
    })
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
});

  }
  editdetails(element: any) {

    this.addmediaform.setValue({
      documentId: element.documentId,
      courses1: element.courseId.coursesId,
      mediatitle: element.documentTitle,
      docfile: null,
      mediadescription: element.description,
    })
    this.submitbtn = true
    this.updatebtn = true
    this.displaycontent = true
    console.log(this.updatebtn);
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
  saveData() {
    console.log(this.addmediaform.value.docfile);

    const body = {
      "documentId": this.addmediaform.value.documentId,
      "courseId": {
        "coursesId": this.addmediaform.value.courses1
      },
      "documentTitle": this.addmediaform.value.mediatitle,
      "uploadFile": this.addmediaform.value.docfile,
      "description": this.addmediaform.value.mediadescription,
      "createdBy": null,
      "createdDate": null,
      "updateBy": null,
      "updateDate": null,
      "isActive": "Y",
    }
    console.log(body);

    this.service.postcoursedocsave(body).subscribe({
      next: (response) => {
        this.addmediaform.reset()
        this.openSnackBar(response)
        this.getdata()
        this.updatebtn = false
        this.submitbtn = true

      },
      error: (error) => {
        console.error(error.message);
      }
    })
    return

  }
  deletedetails(id: any) {

    const body = {
      "documentId": id
    }

    const dialogref = this.dialog.open(DialogPopupComponent, {
      data: {
        title: "Delete Confirmation",
        message: "Are You Sure You Want To Delete this document ?"
      },
      width: "30%"
    })

    dialogref.afterClosed().subscribe(data => {
      if (data) {
        this.service.postcoursedocdelete(body).subscribe({
          next: (response) => {
            this.openSnackBar(response)
            this.getdata()
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
