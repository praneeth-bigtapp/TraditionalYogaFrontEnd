import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogPopupComponent } from 'src/app/shared/dialog-popup/dialog-popup.component';
import { OnlineexamService } from '../service/onlineexam.service';

@Component({
  selector: 'app-onlineexam',
  templateUrl: './onlineexam.component.html',
  styleUrls: ['./onlineexam.component.css']
})
export class OnlineexamComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  filterData: any;
  gridData = [];
  dataSource: any;
  displayedColumns: string[] = ['examsId', 'nameofTest', 'courseId', "levelId", "testId", "Action"];
  data: any;
  issubmit: boolean = true
  onlineexamform!: FormGroup
  courselist!: any
  filerror!: any

  filedata !: any
  displaycontent: boolean = false

  iseditable: boolean = false

  typetestlist!: any
  testlevel!: any
  constructor(
    private formbuilder: FormBuilder,
    private service: OnlineexamService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {

    this.service.getallcourses().subscribe({
      next: (response) => {
        this.courselist = response

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


    this.service.getleveloftest().subscribe({
      next: (response) => {
        this.testlevel = response

      },
      error: (error) => {
        console.error(error.message);

      }
    })
    this.service.gettypeoftest().subscribe({
      next: (response) => {
        this.typetestlist = response

      },
      error: (error) => {
        console.error(error.message);

      }
    })
    this.onlineexamform = this.formbuilder.group({
      examsId: [null],
      course: [null, Validators.compose([Validators.required])],
      testtype: [null, Validators.compose([Validators.required])],
      testname: [null, Validators.compose([Validators.required])],
      leveltest: [null, Validators.compose([Validators.required])],
      file: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],
    })
    this.getonlinexam()
  }

  ngOnInit(): void {
  }

  updatePagination(col: any) {
    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort
  }

  compareselect(obj1: any, obj2: any) {
    return obj1 && obj2 && obj1 === obj2
  }

  getonlinexam() {
    this.service.getonlineexam().subscribe({
      next: (value) => {
        this.data = value
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
    })
  }

  openSnackBar(data: any) {
    this._snackBar.open(data.message, 'Close', {
      duration: 2 * 1000,
    });
  }

  reseteditable() {
    this.onlineexamform.reset()
    this.iseditable = false
    this.displaycontent = !this.displaycontent
    this.issubmit = true
  }

  onfilechange(event: any) {

    this.filerror = this.onlineexamform.value.file === null ? true : false

    this.filedata = event.target.files[0].name
  }

  viewdetails(element: any) {
    this.onlineexamform.setValue({
      examsId: element.examsId,
      course: element.courseId.coursesId,
      testtype: element.testId.testId,
      testname: element.nameofTest,
      leveltest: element.levelId.testId,
      file: null,
      description: element.description,

    });
    this.issubmit = false
    this.displaycontent = true

  }
  deletedetails(id: any) {

    const body = {
      "coursesId": id,
    }

    const dialogref = this.dialog.open(DialogPopupComponent, {
      data: {
        title: "Delete Confirmation",
        message: "Are You Sure You Want To Delete this Exam ?"
      },
      width: "30%"
    })

    dialogref.afterClosed().subscribe(data => {
      if (data) {
        this.service.deleteonlineexam(body).subscribe({
          next: (response) => {
            this.openSnackBar(response)
            this.onlineexamform.reset()
            this.getonlinexam()
          },
          error: (error) => {
            console.error(error.message);
          }
        })
      }
    })




  }
  editdetails(element: any) {
    this.onlineexamform.setValue({
      examsId: element.examsId,
      course: element.courseId.coursesId,
      testtype: element.testId.testId,
      testname: element.nameofTest,
      leveltest: element.levelId.testId,
      file: null,
      description: element.description,

    });
    this.iseditable = true
    this.displaycontent = true
    this.issubmit = true
  }

  addexam() {
    this.displaycontent = !this.displaycontent
  }


  onlineexamsubmit() {

    this.filerror = this.onlineexamform.value.file === null ? true : false

    if (this.onlineexamform.invalid)
      return this.onlineexamform.markAllAsTouched()

    this.onlineexamform.value.file = this.filedata

    const { examsId, course, testtype, testname, leveltest, file, description } = this.onlineexamform.value


    console.log({ examsId, course, testtype, testname, leveltest, file, description });

    const body = {
      "courseId": {
        "coursesId": Number(course)
      },
      "testId": {
        "testId": Number(testtype)
      },
      "nameofTest": testname,
      "levelId": {
        "testId": Number(leveltest)
      },
      "fileUpload": file,
      "description": description
    }

    console.log(body);


    if (this.iseditable) {
      //editable
      this.service.updateonlineexam(body).subscribe({
        next: (response) => {
          this.openSnackBar(response)
          this.onlineexamform.reset()
          this.getonlinexam()
        },
        error: (error) => {
          console.error(error.message);

        }
      })

      return

    }

    this.service.postonlineexam(body).subscribe({
      next: (response) => {

        this.openSnackBar(response)
        this.onlineexamform.reset()
        this.getonlinexam()

      },
      error: (error) => {
        console.error(error.message);

      }
    })


  }

}
