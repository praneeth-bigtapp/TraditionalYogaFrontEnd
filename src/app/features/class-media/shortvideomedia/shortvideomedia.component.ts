import { formatDate } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogPopupComponent } from 'src/app/shared/dialog-popup/dialog-popup.component';
import { InputvalidationService } from 'src/app/shared/services/inputvalidation.service';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-shortvideomedia',
  templateUrl: './shortvideomedia.component.html',
  styleUrls: ['./shortvideomedia.component.css']
})
export class ShortvideomediaComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  displaycontent: boolean = false
  pageno: number = 1
  submitbtn = true
  isothers: boolean = false
  displayedColumns: string[] = ['shortVideoId', 'title', 'coursesId', "classDate", 'praticeLibaryId', 'videolink', "duration", "Action"];
  shortvideoform!: any
  filterData: any;
  categoryerror: boolean = false
  gridData = [];
  selectedmember!: any
  filerror!: boolean
  iseditable: boolean = false
  dataSource!: any
  categorylist: any;
  issubmit: boolean = true
  courses: any
  subcategorylist!: any
  praticecategory!: any
  issubcategory: boolean = false

  tabledata: any

  constructor(
    private formbuilder: FormBuilder,
    private services: ServicesService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ShortvideomediaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log({ data });

    this.filterData = {
      filterColumnNames: this.displayedColumns.map(ele => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    }
    this.shortvideoform = this.formbuilder.group({
      courseMediaId: [null],
      subcategory: [null],

      course: [null, Validators.compose([Validators.required])],
      videolink: [null, Validators.compose([Validators.required, Validators.pattern(InputvalidationService.inputvalidation.videolink)])],
      date: [null, Validators.compose([Validators.required])],
      duration: [null, Validators.compose([Validators.required, Validators.pattern(InputvalidationService.inputvalidation.durationvalidation)])],
      category: [null, Validators.compose([Validators.required])],
      title: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],
      // others: [null, Validators.compose([Validators.required])],
      // subcategory: [null, Validators.compose([Validators.required])],
    })
    services.getcoursemediacategory().subscribe({
      next: (response) => {

        this.categorylist = response

      },
      error: (error) => {
        console.error(error.message);

      }
    })

    this.services.getcategory().subscribe({
      next: (response) => {

        this.praticecategory = response

      },
      error: (error) => {
        console.error(error.message);
      }
    });
    this.services.getsubcategory().subscribe({
      next: (response) => {

        this.subcategorylist = response

      },
      error: (error) => {
        console.error(error.message);
      }
    });
    this.getalldata()

    this.dataSource = new MatTableDataSource<any>(this.tabledata)
    this.filterData.gridData = this.tabledata;
    this.filterData.dataSource = this.dataSource;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.filterData.sort = this.sort;
    for (let col of this.filterData.filterColumnNames) {
      col.Value = '';
    }
    this.getallcourse()
  }

  ngOnInit(): void {
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

  categorychange(event: any) {


    if (event.value === 12) {
      this.issubcategory = true
      this.shortvideoform.get('subcategory').addValidators(Validators.required);
      this.shortvideoform.controls.subcategory.status = "INVALID"
      return
    }
    this.shortvideoform.get('subcategory').removeValidators(Validators.required);
    this.shortvideoform.controls.subcategory.status = "VALID"
    this.shortvideoform.controls['subcategory'].setErrors({ 'required': false });
    this.shortvideoform.get('subcategory').reset();


    this.issubcategory = false

  }


  getalldata() {
    this.services.getALLshortvideos().subscribe({
      next: (response) => {
        this.data = response;
        console.log(this.data);
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
    });

  }
  updatePagination(col: any) {

    this.filterData.dataSource.paginator = this.paginator;
  }


  openSnackBar(data: any) {
    this._snackBar.open(data.message, 'Close', {
      duration: 2 * 1000,
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
  gobutton() {
    this.displaycontent = true
    this.submitbtn = true
  }

  reseteditable() {
    this.shortvideoform.reset()
    this.iseditable = false
    this.displaycontent = !this.displaycontent
    this.issubmit = true
  }


  viewDetails(element: any) {
    this.iseditable = false
    this.submitbtn = false
    this.displaycontent = true
    this.shortvideoform.setValue({
      courseMediaId: element.shortVideoId,
      videolink: element.videoLink,
      date: formatDate(element.classDate, "yyyy-MM-dd", "en"),
      duration: element.duration,
      category: element.praticeLibaryId.categoryId,
      subcategory: element.subCategoryId !== null ? element.subCategoryId.subCategoryId : null,
      title: element.title,
      description: element.description,
      course: element.coursesId.coursesId
    })
    if (element.subCategoryId) {
      this.issubcategory = true
      this.shortvideoform.get('subcategory').removeValidators(Validators.required);
      this.shortvideoform.controls.subcategory.status = "VALID"
      this.shortvideoform.controls['subcategory'].setErrors({ 'required': false });
    }


    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

  }
  editdetails(element: any) {
    this.iseditable = true
    this.submitbtn = false
    this.displaycontent = true

    this.shortvideoform.setValue({
      courseMediaId: element.shortVideoId,
      videolink: element.videoLink,
      date: formatDate(element.classDate, "yyyy-MM-dd", "en"),
      duration: element.duration,
      category: element.praticeLibaryId.categoryId,
      subcategory: element.subCategoryId !== null ? element.subCategoryId.subCategoryId : null,
      title: element.title,
      description: element.description,
      course: element.coursesId.coursesId
    })

    if (element.subCategoryId) {
      this.issubcategory = true
      this.shortvideoform.get('subcategory').removeValidators(Validators.required);
      this.shortvideoform.controls.subcategory.status = "VALID"
      this.shortvideoform.controls['subcategory'].setErrors({ 'required': false });
    }

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  deletedetails(id: any) {
    const body =
    {
      "shortVideoId": id
    }


    const dialogref = this.dialog.open(DialogPopupComponent, {
      data: {
        title: "Delete Confirmation",
        message: "Are You Sure You Want To Delete this media ?"
      },
      width: "30%",
      // height: "25%"
    })

    dialogref.afterClosed().subscribe(data => {
      if (data) {
        this.services.postdeleteshortvideo(body).subscribe({
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

  convertH2M(timeInHour: string) {
    var timeParts = timeInHour.split(":");
    return Number(timeParts[0]) * 60 + Number(timeParts[1]);
  }

  shortvideoformsubmit() {

    if (this.shortvideoform.invalid)
      return this.shortvideoform.markAllAsTouched()


    const { course, courseMediaId, videolink, date, duration, category, subcategory, title, description } = this.shortvideoform.value


    if (this.iseditable) {
      const body = {
        "shortVideoId": courseMediaId,
        "coursesId": {
          "coursesId": course
        },
        "praticeLibaryId": {
          "categoryId": category
        },
        "subCategoryId": subcategory,
        "videoLink": videolink,
        "title": title,
        "description": description,
        "classDate": date,
        "duration": duration
      }
      this.services.postupdateshortvideo(body).subscribe({
        next: (response) => {

          this.shortvideoform.reset()

          this.openSnackBar(response)
          this.getalldata()
          this.shortvideoform.get('subcategory').removeValidators(Validators.required);
          this.shortvideoform.controls.subcategory.status = "VALID"
          this.shortvideoform.controls['subcategory'].setErrors({ 'required': false });
        },
        error: (error) => {
          console.error(error.message);

        }
      })
      return

    }

    const body = {
      "coursesId": {
        "coursesId": course
      },
      "praticeLibaryId": {
        "categoryId": category
      },
      "subCategoryId": subcategory,
      "videoLink": videolink,
      "title": title,
      "description": description,
      "classDate": date,
      "duration": duration
    }


    console.log(body);



    this.services.postaddshortvideo(body).subscribe({
      next: (response) => {

        this.shortvideoform.reset()

        this.openSnackBar(response)
        this.getalldata()
        this.shortvideoform.get('subcategory').removeValidators(Validators.required);
        this.shortvideoform.controls.subcategory.status = "VALID"
        this.shortvideoform.controls['subcategory'].setErrors({ 'required': false });

      },
      error: (error) => {
        console.error(error.message);

      }
    })

  }

}
