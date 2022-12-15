import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  filterData: any;
  gridData = [];
  dataSource: any;
  displayedColumns: string[] = ['coursesId', 'category', 'coursesName', "courseDuration", "startDate", "endDate", "currentStatus", "Action"];
  data: any;

  category!: string
  notificationform!: any
  timerror!: boolean
  filerror!: boolean
  filerror2!: boolean
  datafile!: any
  filedata!: any
  displaycontent: boolean = false
  iseditable: boolean = false
  notificationtypes: any
  constructor(
    private formbuilder: FormBuilder,
    private service: NotificationService,
    private _snackBar: MatSnackBar
  ) {
    this.notificationform = this.formbuilder.group({
      category: [null, Validators.compose([Validators.required])],
      title: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],
      file: [null, Validators.compose([Validators.required])],
    })
    this.filterData = {
      filterColumnNames: this.displayedColumns.map((ele: any) => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };



    this.service.getnotificationcategory().subscribe({
      next: (response) => {
        console.log(response);
        this.notificationform = response

      },
      error: (error) => {
        console.error(error.message);

      }
    })
  }
  ngOnInit(): void {

  }
  updatePagination(col: any) {
    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort
  }

  getdata() {
    this.service.getnotification().subscribe({
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
  compareselect(obj1: any, obj2: any) {
    return obj1 && obj2 && obj1.categoriesId === obj2
  }
  openSnackBar(data: any) {
    this._snackBar.open(data.message, 'Close');
  }


  onfilechange(event: any) {
    this.filedata = event.target.files[0].name
  }

  addnotification() {
    this.displaycontent = !this.displaycontent
  }
  reseteditable() {
    this.notificationform.reset()
    this.iseditable = false
    this.displaycontent = !this.displaycontent
  }

  viewdetails(element: any) {

  }
  deletedetails(id: any) {

    const body = {
      "coursesId": id,
    }

    this.service.deletenotification(body).subscribe({
      next: (response) => {
        this.openSnackBar(response)
        this.notificationform.reset()
        this.getdata()
      },
      error: (error) => {
        console.error(error.message);
      }
    })

  }
  editdetails(element: any) {
    this.notificationform.setValue({
      // need to add form
    });
    this.iseditable = true
    this.displaycontent = true
  }


  addmedia() {

    this.filerror = this.notificationform.value.file === null ? true : false


    if (this.notificationform.valid) {

      this.notificationform.value.file = this.filedata

      const { category, title, description, file } = this.notificationform.value

      console.log({ category, title, description, file });

      const body = {

      }

      if (this.iseditable) {
        //editable
        this.service.updatenotification(body).subscribe({
          next: (response) => {
            this.openSnackBar(response)
            this.notificationform.reset()
            this.getdata()
          },
          error: (error) => {
            console.error(error.message);

          }
        })
        return

      }

      this.service.postnotification(body).subscribe({
        next: (response) => {
          this.openSnackBar(response)
          this.notificationform.reset()
          this.getdata()
        },
        error: (error) => {
          console.error(error.message);

        }
      })
    }
    else {
      this.notificationform.markAllAsTouched()
    }

  }

}
