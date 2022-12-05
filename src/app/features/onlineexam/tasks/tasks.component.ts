import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

  course!: string
  courserror: boolean = false
  courseList!: any

  filterData: any;
  gridData = [];
  dataSource: any;
  displayedColumns: string[] = ['task', "dateofassignment", "type", "duedate", "action"];

  data!: any


  constructor(
    private service: OnlineexamService,
    private formbuilder: FormBuilder,
    private _snackbar: MatSnackBar,

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

  }
  gobutton() {
    if (!this.course) {

      this.courserror = true
      return
    }
    this.courserror = false
    console.log(this.course);

    this.data = [
      {
        task: "Cat-1",
        dateofassignment: "04-05-2022",
        type: "Text",
        duedate: "09-05-2022",
      },
      {
        task: "Cat-2",
        dateofassignment: "05-05-2022",
        type: "Text",
        duedate: "10-05-2022",
      }]

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

  }

  createtask() {

  }

  viewdetails(data: any) {
    console.log(data);

  }
}
