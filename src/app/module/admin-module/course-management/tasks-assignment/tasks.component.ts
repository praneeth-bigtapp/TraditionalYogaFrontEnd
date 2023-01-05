import { SelectionModel } from '@angular/cdk/collections';
import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OnlineexamService } from 'src/app/data/services/admin-module/course-management/online-exam/online-exam.service';
import { DialogPopupComponent } from 'src/app/shared/components/dialog-popup/dialog-popup.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  pageno: number = 1

  selection = new SelectionModel<any>(true, []);
  selectedmember!: any
  taskform!: FormGroup
  filerror: boolean = false
  filedata!: any
  course!: string
  courserror: boolean = false
  courseList!: any
  issubmit: boolean = true
  filterData: any;
  gridData = [];
  dataSource: any;
  displayedColumns: string[] = ['sno', 'taskName', "dateOfAssigement", "type", "dueDate", "action"];

  isedit: boolean = false
  data!: any
  displayform: boolean = false

  displaycontent: boolean = false

  constructor(
    private service: OnlineexamService,
    private formbuilder: FormBuilder,
    private _snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) {

    this.taskform = this.formbuilder.group({
      taskid: [null],
      name: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],
      mediafile: [null, Validators.compose([Validators.required])],
      duedate: [null, Validators.compose([Validators.required])],
      assignmentdate: [null, Validators.compose([Validators.required])]
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

    this.service.getallcourses().subscribe({
      next: (response) => {
        this.courseList = response

      },

      error: (error) => {
        console.error(error.message);

      }
    })

  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort;
  }

  openSnackBar(data: any) {
    this._snackbar.open(data.message, 'Close', {
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

  gettask(course: string) {
    this.service.gettask().subscribe({
      next: (value) => {
        console.log(value);
        this.data = value

        this.data = this.data.filter((ele: any) => ele?.coursesId.coursesId === course)

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

        this.updatePagination('')

      },
      error: (error) => {
        console.error(error.message);

      }
    })
  }

  fileupload(event: any) {

    this.filerror = this.taskform.value.mediafile === null ? true : false

    this.filedata = event.target.files[0].name
  }

  updatePagination(col: any) {
    this.ngAfterViewInit()
  }


  coursechange() {

    if (!this.course) {
      this.courserror = true
      return
    }
    this.gettask(this.course)

    this.displaycontent = true

    this.courserror = false



  }
  createtask() {
    this.displayform = !this.displayform

  }
  viewdetails(element: any) {


    this.taskform.setValue({
      taskid: element.taskId,
      name: element.taskName,
      description: element.description,
      mediafile: null,
      duedate: formatDate(element.dueDate, "yyyy-MM-dd", "en"),
      assignmentdate: formatDate(element.dateOfAssigement, "yyyy-MM-dd", "en")

    });
    this.displayform = true
    this.issubmit = false
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  deletedetails(id: any) {

    const body = {
      "taskId": id,
    }

    const dialogref = this.dialog.open(DialogPopupComponent, {
      data: {
        title: "Delete Confirmation",
        message: "Are You Sure You Want To Delete this Task ?"
      },
      width: "30%",
      height:"25%"
    })

    dialogref.afterClosed().subscribe(data => {
      if (data) {
        this.service.deletetask(body).subscribe({
          next: (response) => {
            this.openSnackBar(response)
            this.taskform.reset()
            this.gettask(this.course)
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

    this.taskform.setValue({
      taskid: element.taskId,
      name: element.taskName,
      description: element.description,
      mediafile: null,
      duedate: formatDate(element.dueDate, "yyyy-MM-dd", "en"),
      assignmentdate: formatDate(element.dateOfAssigement, "yyyy-MM-dd", "en")


    });
    this.isedit = true
    this.displayform = true
    this.issubmit = true
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  reseteditable() {
    this.taskform.reset()
    this.isedit = false
    this.displayform = !this.displayform
    this.issubmit = true
  }


  tasksubmit() {
    this.filerror = this.taskform.value.mediafile === null ? true : false

    if (this.taskform.invalid)
      return this.taskform.markAllAsTouched()

    this.taskform.value.mediafile = this.filedata || ""


    const { taskid, assignmentdate, name, description, mediafile, duedate } = this.taskform.value
    console.log({ taskid, name, description, mediafile, duedate });


    const body = {
      "taskName": name,
      "coursesId": {
        "coursesId": this.course
      },
      "description": description,
      "mediafile": mediafile,
      "dueDate": duedate,
      "dateOfAssigement": assignmentdate,
      "createdBy": null,
      "createDate": null,
      "updateBy": null,
      "updateDate": null,
      "isActive": "Y",
    }

    if (this.isedit) {
      //editable
      const body = {
        "taskId": taskid,
        "taskName": name,
        "coursesId": {
          "coursesId": this.course
        },
        "description": description,
        "mediafile": mediafile,
        "dueDate": duedate,
        "dateOfAssigement": assignmentdate,
        "createdBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "isActive": "Y",
      }


      this.service.updatetask(body).subscribe({
        next: (response) => {
          this.openSnackBar(response)
          this.taskform.reset()
          this.gettask(this.course)
        },
        error: (error) => {
          console.error(error.message);

        }
      })

      return
    }


    this.service.posttask(body).subscribe({
      next: (response) => {
        this.openSnackBar(response)
        this.taskform.reset()
        this.gettask(this.course)
      },
      error: (error) => {
        console.error(error.message);

      }
    })

  }
}
