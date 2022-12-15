import { SelectionModel } from '@angular/cdk/collections';
import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OnlineexamService } from '../service/onlineexam.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

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
  displayedColumns: string[] = ['taskName', "createDate", "type", "dueDate", "action"];

  isedit: boolean = false
  data!: any
  displayform: boolean = false

  displaycontent: boolean = false

  constructor(
    private service: OnlineexamService,
    private formbuilder: FormBuilder,
    private _snackbar: MatSnackBar,
  ) {

    this.taskform = this.formbuilder.group({
      taskid: [null],
      name: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],
      mediafile: [null, Validators.compose([Validators.required])],
      duedate: [null, Validators.compose([Validators.required])],
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

  opensnackBar(data: any) {
    this._snackbar.open(data.message, "Close")
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
    console.log(element);


    this.taskform.setValue({
      taskid: element.taskId,
      name: element.taskName,
      description: element.description,
      mediafile: null,
      duedate: formatDate(element.dueDate, "yyyy-MM-dd", "en"),

    });
    this.displayform = true
    this.issubmit = false
  }

  deletedetails(id: any) {

    const body = {
      "taskId": id,
    }

    this.service.deletetask(body).subscribe({
      next: (response) => {
        this.opensnackBar(response)
        this.taskform.reset()
        this.gettask(this.course)
      },
      error: (error) => {
        console.error(error.message);
      }
    })

  }
  editdetails(element: any) {
    console.log(element.dueDate);

    this.taskform.setValue({
      taskid: element.taskId,
      name: element.taskName,
      description: element.description,
      mediafile: null,
      duedate: formatDate(element.dueDate, "yyyy-MM-dd", "en"),

    });
    this.isedit = true
    this.displayform = true
    this.issubmit = true
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

    this.taskform.value.mediafile = this.filedata


    const { taskid, name, description, mediafile, duedate } = this.taskform.value
    console.log({ taskid, name, description, mediafile, duedate });


    const body = {
      "taskName": name,
      "coursesId": {
        "coursesId": this.course
      },
      "description": description,
      "mediafile": mediafile,
      "dueDate": duedate
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
        "dueDate": duedate
      }

      console.log(body);

      this.service.updatetask(body).subscribe({
        next: (response) => {
          this.opensnackBar(response)
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
        this.opensnackBar(response)
        this.taskform.reset()
        this.gettask(this.course)
      },
      error: (error) => {
        console.error(error.message);

      }
    })

  }
}
