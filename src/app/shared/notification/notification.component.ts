import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogPopupComponent } from '../dialog-popup/dialog-popup.component';
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
  displayedColumns: string[] = ['notificationId', 'title', 'categoryId', "uploadFile", "Action"];
  data: any;
  issubmit = true

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
  pageno: number = 1
  constructor(
    private formbuilder: FormBuilder,
    private service: NotificationService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    this.notificationform = this.formbuilder.group({
      notificationId: [null],
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
        this.notificationtypes = response
      },
      error: (error) => {
        console.error(error.message);

      }
    })
    this.getdata()
  }
  ngOnInit(): void {

  }
  updatePagination(col: any) {
    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort
  }

  onpaginatechange(event: any) {
    if (event.pageIndex === 0) {
      this.pageno = 1
      return
    }
    this.pageno = (event.pageIndex * event.pageSize) + 1
    return
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
    return obj1 && obj2 && obj1 === obj2
  }

  openSnackBar(data: any) {
    this._snackBar.open(data.message, 'Close', {
      duration: 2 * 1000,
    });
  }

  onfilechange(event: any) {
    this.filedata = event.target.files[0].name
  }

  addnotification() {
    this.displaycontent = !this.displaycontent
    this.issubmit = true
  }
  reseteditable() {
    this.notificationform.reset()
    this.iseditable = false
    this.displaycontent = !this.displaycontent
    this.issubmit = true
  }

  viewdetails(element: any) {

    this.notificationform.setValue({
      notificationId: element.notificationId,
      category: element.categoryId.categoryId,
      title: element.title,
      description: element.message,
      file: null,
    });
    this.iseditable = false
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
        message: "Are You Sure You Want To Delete this notification ?"
      },
      width: "30%"
    })

    dialogref.afterClosed().subscribe(data => {
      if (data) {
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
        return
      }

    })

  }
  editdetails(element: any) {
    console.log(element);
    
    this.notificationform.setValue({
      notificationId: element.notificationId,
      category: element.categoryId.categoryId,
      title: element.title,
      description: element.message,
      file: null,
    });
    this.iseditable = true
    this.issubmit = true
    this.displaycontent = true
  }


  addmedia() {

    this.filerror = this.notificationform.value.file === null ? true : false


    if (this.notificationform.valid) {

      this.notificationform.value.file = this.filedata

      const { notificationId, category, title, description, file } = this.notificationform.value

      console.log({ notificationId, category, title, description, file });

      const body = {
        "categoryId": category,
        "title": title,
        "uploadFile": file,
        "message": description
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
