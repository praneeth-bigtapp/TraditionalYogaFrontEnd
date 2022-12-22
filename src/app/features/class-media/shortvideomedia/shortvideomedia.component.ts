import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
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
  isothers: boolean = false
  displayedColumns: string[] = ['classMediaId', 'date', 'typeOfClass', "noOfMediaFiles", "Action"];
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
      videolink: [null, Validators.compose([Validators.required, Validators.pattern(InputvalidationService.inputvalidation.videolink)])],
      date: [null, Validators.compose([Validators.required])],
      duration: [null, Validators.compose([Validators.required, Validators.pattern(InputvalidationService.inputvalidation.durationvalidation)])],
      category: [null, Validators.compose([Validators.required])],
      title: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],
      others: [null, Validators.compose([Validators.required])],
      subcategory: [null, Validators.compose([Validators.required])],
    })
    services.getcoursemediacategory().subscribe({
      next: (response) => {

        this.categorylist = response

      },
      error: (error) => {
        console.error(error.message);

      }
    })
  }

  ngOnInit(): void {
  }

  getalldata() {

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
  }

  reseteditable() {
    this.shortvideoform.reset()
    this.iseditable = false
    this.displaycontent = !this.displaycontent
    this.issubmit = true
  }


  viewDetails(element: any) {

  }
  editdetails(element: any) {

  }
  deletedetails(id: any) {

    console.log(id);

    const body = {
      "classMediaId": id
    }

    const dialogref = this.dialog.open(DialogPopupComponent, {
      data: {
        title: "Delete Confirmation",
        message: "Are You Sure You Want To Delete this media ?"
      },
      width: "30%"
    })

    dialogref.afterClosed().subscribe(data => {
      if (data) {
        this.services.deleteclassmedia(body).subscribe({
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

  shortvideoformsubmit() {

    if (this.shortvideoform.invalid)
      return this.shortvideoform.markAllAsTouched()


    const { videolink, date, duration, category, title, description } = this.shortvideoform.value

    const body = {
      "courseLink": videolink,
      "date": date,
      "duration": duration,
      "title": title,
      "categoryId": category,
      "description": description

    }


    this.services.postshortvideo(body).subscribe({
      next: (response) => {

        this.shortvideoform.reset()

        this.openSnackBar(response)


      },
      error: (error) => {
        console.error(error.message);

      }
    })

  }

}
