import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AddCourseService } from './../add-course.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogPopupComponent } from 'src/app/shared/dialog-popup/dialog-popup.component';


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  gridData = [];
  filterData: any;

  pageno: number = 1

  dataSource: any;
  displayedColumns: string[] = ['coursesId', 'category', 'coursesName', "courseDuration", "startDate", "endDate", "currentStatus", "Action"];
  data: any;
  displaycontent: boolean = false
  iseditable: boolean = false
  filerror!: boolean
  categorySelect!: any
  addCourseForm!: FormGroup
  paragrapherror: boolean = false
  categoryList!: any
  issubmit: boolean = true
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '7rem',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    // enableToolbar: true,
    // showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

  constructor(private AddCourseService: AddCourseService, private formbuilder: FormBuilder, private _snackBar: MatSnackBar, private dialog: MatDialog) {
    this.addCourseForm = this.formbuilder.group({
      courseId: [null],
      courseName: [null, Validators.compose([Validators.required])],
      coursecategory: [null, Validators.compose([Validators.required])],
      applicationclosuredate: [null, Validators.compose([Validators.required])],
      // duration: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],
      startDate: [null, Validators.compose([Validators.required])],
      endDate: [null, Validators.compose([Validators.required])],
    });
    this.filterData = {
      filterColumnNames: this.displayedColumns.map((ele: any) => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };

    this.AddCourseService.getCategory().subscribe({
      next: (value) => {
        console.log(value);
        this.categoryList = value
      },
      error: (error) => {
        console.warn(error.message);
      }
    })

  }
  addcourse() {
    this.displaycontent = !this.displaycontent
  }
  updatePagination(col: any) {
    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort
  }
  ngOnInit(): void {
    this.getdata()
  }


  getdata() {
    this.AddCourseService.getCourse().subscribe({
      next: (response) => {
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
  paragraphchange() {
    this.paragrapherror = this.addCourseForm.value.description === null ? true : false
  }
  compareselect(obj1: any, obj2: any) {
    return obj1 && obj2 && obj1.categoriesId === obj2
  }

  viewdetails(element: any) {



    this.addCourseForm.setValue({
      courseId: element.coursesId,
      courseName: element.coursesName,
      coursecategory: element.categorieId.categoriesId,
      applicationclosuredate: formatDate(element.applicationClouserDate, "yyyy-MM-dd", 'en'),
      startDate: formatDate(element.startDate, "yyyy-MM-dd", 'en'),
      endDate: formatDate(element.endDate, "yyyy-MM-dd", 'en'),
      description: element.description,
    });
    this.issubmit = false
    this.displaycontent = true

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

  deletedetails(id: any) {

    const body = {
      "coursesId": id
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
        this.AddCourseService.deletecourse(body).subscribe({
          next: (response) => {
            this.openSnackBar(response)
            this.addCourseForm.reset()
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
  editdetails(element: any) {
    this.addCourseForm.setValue({
      courseId: element.coursesId,
      courseName: element.coursesName,
      coursecategory: element.categorieId.categoriesId,
      applicationclosuredate: formatDate(element.applicationClouserDate, "yyyy-MM-dd", 'en'),
      startDate: formatDate(element.startDate, "yyyy-MM-dd", 'en'),
      endDate: formatDate(element.endDate, "yyyy-MM-dd", 'en'),
      description: element.description,
    });
    this.iseditable = true
    this.displaycontent = true
    this.issubmit = true
  }

  reseteditable() {
    this.addCourseForm.reset()
    this.iseditable = false
    this.displaycontent = !this.displaycontent
    this.issubmit = true
  }

  getnoofdays(startdate: any, enddate: any) {
    const Difference_In_Time = new Date(enddate).getTime() - new Date(startdate).getTime();
    return Difference_In_Time / (1000 * 3600 * 24);
  }
  onAddCourse() {
    this.paragraphchange()
    if (this.addCourseForm.invalid)
      return this.addCourseForm.markAllAsTouched()

    const body = {
      // "coursesId": 1,
      "categorieId": {
        "categoriesId": this.addCourseForm.value.coursecategory.categoriesId,
        "categoriesName": this.addCourseForm.value.coursecategory.categoriesName,
      },
      "coursesName": this.addCourseForm.value.courseName,
      "description": this.addCourseForm.value.description,
      "startDate": this.addCourseForm.value.startDate,
      "endDate": this.addCourseForm.value.endDate,
      "applicationClouserDate": this.addCourseForm.value.applicationclosuredate
    }


    if (this.iseditable) {


      const body = {
        "applicationClouserDate": this.addCourseForm.value.applicationclosuredate,
        "categorieId": {
          "categoriesId": this.addCourseForm.value.coursecategory,
          "categoriesName": this.categoryList.filter((ele: any) => ele.categoriesId === this.addCourseForm.value.coursecategory)[0].categoriesName
        },
        "coursesId": this.addCourseForm.value.courseId,
        "coursesName": this.addCourseForm.value.courseName,
        "description": this.addCourseForm.value.description,
        "endDate": this.addCourseForm.value.endDate,
        "startDate": this.addCourseForm.value.startDate
      }

      console.log(body);

      this.AddCourseService.updatecourse(body).subscribe({
        next: (response) => {
          this.openSnackBar(response)
          this.addCourseForm.reset()
          this.getdata()
        },
        error: (error) => {
          console.error(error.message);

        }
      })
      return
    }
    this.AddCourseService.postadcourse(body).subscribe({
      next: (response) => {
        this.openSnackBar(response)
        this.addCourseForm.reset()
        this.getdata()
      },
      error: (error) => {
        console.error(error.message);
      }
    })
  }
}