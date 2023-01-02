import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { DialogPopupComponent } from 'src/app/shared/dialog-popup/dialog-popup.component';
import { ServicesService } from '../services.service';
import { ShortvideomediaComponent } from '../shortvideomedia/shortvideomedia.component';
import { elementAt, map, Observable, startWith } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { table } from 'console';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-glimpemedia',
  templateUrl: './glimpemedia.component.html',
  styleUrls: ['./glimpemedia.component.css']
})
export class GlimpemediaComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  displayContent: boolean = true;
  pageNo: number = 1;
  // isOthers: boolean = false;
  displayedColumns: string[] = ['classMediaId', 'coursesId', 'date', "languageName", "Action"];
  // shortVideoForm!: any;
  filterData: any;
  // categoryError: boolean = false;
  gridData = [];
  // selectedMember!: any;
  fileError!: boolean;
  isEditable: boolean = false;
  dataSource!: any;
  // categoryList: any;
  isSubmit: boolean = true;
  glimpseForm: any;
  glimpseFile: any;
  courses: any;
  languageList: any;
  languageFilter !: Observable<any>;
  othersLang = false;
  tableData: any;

  constructor(
    private formbuilder: FormBuilder,
    private services: ServicesService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ShortvideomediaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data);

    this.filterData = {
      filterColumnNames: this.displayedColumns.map(ele => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };

    this.glimpseForm = this.formbuilder.group({
      courseMediaId: [null],
      course: [null, Validators.compose([Validators.required])],
      date: [null, Validators.compose([Validators.required])],
      file: [null],
      language: [null, Validators.compose([Validators.required])],
      Others: [null],
    });

    this.getAllCourse();
    this.AllLanguages();
    this.getAllData();

  }

  swapothers(event: any) {
    if (event.value === -1) {
      this.othersLang = true;
      return;
    }
    this.othersLang = false;
  }

  getAllCourse() {
    this.services.getcoursesdetails().subscribe({
      next: (response) => {
        this.courses = response;
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  AllLanguages() {
    this.services.getlanguages().subscribe({
      next: (response) => {
        this.languageList = response;
        const othersData = {
          "languageId": -1,
          "languageName": "others"
        };
        console.log("Lanuages");
        this.languageList.push(othersData);
        console.log(this.languageList);
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  getAllData() {

    this.services.getALLGlimps().subscribe({
      next: (response) => {

        this.tableData = response
        this.tableData = this.tableData.reverse()
        console.log('ALLdata');

        console.log(response);
        this.dataSource = new MatTableDataSource<any>(this.tableData)
        this.filterData.gridData = this.tableData;
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

  Addlanguages() {
    let body = {
      "languageName": "Others"
    };

    this.services.postaddlanguages(body).subscribe({
      next: (response) => {
        this.openSnackBar(response);
        this.getAllData();
      },
      error: (error) => {
        console.error(error.message);
      }
    });
    return;
  }

  onpaginatechange(event: any) {
    if (event.pageIndex === 0) {
      this.pageNo = 1;
      return;
    }
    this.pageNo = (event.pageIndex * event.pageSize) + 1;
    return;
  }

  gobutton() {
    this.displayContent = true;
  }

  reseteditable() {
    this.glimpseForm.reset();
    this.isEditable = false;
    this.displayContent = !this.displayContent;
    this.isSubmit = true;
  }


  viewDetails(element: any) {
    this.isEditable = false;
    this.isSubmit = false;
    this.displayContent = true;

    this.glimpseForm.setValue({
      courseMediaId: element.glimpsesId,
      course: element.coursesId.coursesId,
      date: formatDate(element.date, "yyyy-MM-dd", 'en'),
      file: '',
      language: element.language.languageId,
      Others: null
    });
  }

  editdetails(element: any) {
    this.isEditable = true;
    this.isSubmit = false;
    this.displayContent = true;

    this.glimpseForm.setValue({
      courseMediaId: element.glimpsesId,
      course: element.coursesId.coursesId,
      date: formatDate(element.date, "yyyy-MM-dd", 'en'),
      file: '',
      language: element.language.languageId,
      Others: null
    });
  }

  deletedetails(id: any) {
    console.log(id);
    const body = {
      "glimpsesId": id
    };

    const dialogref = this.dialog.open(DialogPopupComponent, {
      data: {
        title: "Delete Confirmation",
        message: "Are You Sure You Want To Delete this media ?"
      },
      width: "30%",
      height: "25%"
    });

    dialogref.afterClosed().subscribe(data => {
      if (data) {
        console.log(body);

        this.services.postdeleteGlimps(body).subscribe({
          next: (response) => {
            this.openSnackBar(response);
            this.getAllData();
          },
          error: (error) => {
            console.error(error.message);
          }
        });
        return;
      }
    });
  }

  filechange(event: any) {
    this.fileError = this.glimpseForm.value.file === null ? true : false;
    this.glimpseFile = event.target.files[0].name;
  }

  glimpseformsubmit() {
    if (this.glimpseForm.invalid) { return this.glimpseForm.markAllAsTouched() }

    this.glimpseForm.value.file = this.glimpseFile || '';
    let body;

    if (this.glimpseForm.value.language === -1) {
      body = {
        "coursesId": {
          "coursesId": this.glimpseForm.value.course
        },
        "date": this.glimpseForm.value.date,
        "fileUpload": this.glimpseForm.value.file,
        "language": {
          "languageId": this.glimpseForm.value.Others
        }
      };
      console.log(body);

      let newbody = {
        "languageName": this.glimpseForm.value.Others
      }

      this.services.postaddlanguages(newbody).subscribe({
        next: (response) => {
          this.openSnackBar(response)
        },
        error: (error) => {
          console.error(error.message);
        }
      });

    } else {
      body = {
        "coursesId": {
          "coursesId": this.glimpseForm.value.course
        },
        "date": this.glimpseForm.value.date,
        "fileUpload": this.glimpseForm.value.file,
        "language": {
          "languageId": this.glimpseForm.value.language
        }
      };
    }

    this.services.postaddGlimps(body).subscribe({
      next: (response) => {
        this.glimpseForm.reset();
        this.openSnackBar(response);
        this.getAllData();
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  onsave() {
    let body;
    if (this.glimpseForm.value.language === -1) {
      body = {
        "glimpsesId": this.glimpseForm.value.courseMediaId,
        "coursesId": {
          "coursesId": this.glimpseForm.value.course
        },
        "date": this.glimpseForm.value.date,
        "fileUpload": this.glimpseForm.value.file,
        "language": {
          "languageId": this.glimpseForm.value.others
        }
      };
      let newbody = {
        "languageName": this.glimpseForm.value.others
      };
      this.services.postaddlanguages(newbody).subscribe({
        next: (response) => {
          this.openSnackBar(response);
        },
        error: (error) => {
          console.error(error.message);
        }
      });
    } else {
      body = {
        "glimpsesId": this.glimpseForm.value.courseMediaId,
        "coursesId": {
          "coursesId": this.glimpseForm.value.course
        },
        "date": this.glimpseForm.value.date,
        "fileUpload": this.glimpseForm.value.file,
        "language": {
          "languageId": this.glimpseForm.value.language
        }
      };
    }
    console.log('update');
    console.log(body);

    this.services.postupdateGlimps(body).subscribe({
      next: (response) => {
        this.glimpseForm.reset();
        this.openSnackBar(response);
        this.getAllData();
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

}
