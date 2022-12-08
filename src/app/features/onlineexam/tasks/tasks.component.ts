import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OnlineexamService } from '../service/onlineexam.service';
import { TaskCreateComponent } from '../task-create/task-create.component';

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

  course!: string
  courserror: boolean = false
  courseList!: any

  filterData: any;
  gridData = [];
  dataSource: any;
  displayedColumns: string[] = ['taskName', "createDate", "type", "dueDate", "action"];

  data!: any

  displaycontent: boolean = false


  constructor(
    private service: OnlineexamService,
    private formbuilder: FormBuilder,
    private _snackbar: MatSnackBar,
    private dialog: MatDialog,

  ) {

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


  updatePagination(col: any) {
    this.ngAfterViewInit()
  }


  coursechange() {
    this.data = []
    this.dataSource = new MatTableDataSource<any>(this.data)
    this.filterData.gridData = this.data;
    this.filterData.dataSource = this.dataSource;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.filterData.sort = this.sort;
    for (let col of this.filterData.filterColumnNames) {
      col.Value = '';
    }
    this.displaycontent = false

  }
  gobutton() {
    if (!this.course) {

      this.courserror = true
      return
    }
    this.courserror = false

    this.gettask(this.course)

    this.displaycontent = true


  }

  createtask() {
    const dialogRef = this.dialog.open(TaskCreateComponent, {
      data: { courses: this.course },
      width: "80%"
    })

    dialogRef.afterClosed().subscribe((result) => {

      // console.log('The dialog was closed', result);

      this.gettask(this.course)
    });

  }
  viewdetails(data: any) {
    console.log(data);

  }
}
