import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { DialogPopupComponent } from 'src/app/shared/dialog-popup/dialog-popup.component';
import { ServicesService } from '../services.service';
import { ShortvideomediaComponent } from '../shortvideomedia/shortvideomedia.component';

@Component({
  selector: 'app-glimpemedia',
  templateUrl: './glimpemedia.component.html',
  styleUrls: ['./glimpemedia.component.css']
})
export class GlimpemediaComponent implements OnInit {

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
  glimpseform: any;
  glimpsefile: any;

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
    this.glimpseform = this.formbuilder.group({

      date: [null, Validators.compose([Validators.required])],
      file: [null, Validators.compose([Validators.required])],


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
  filechange(event: any) {
    this.filerror = this.glimpseform.value.file === null ? true : false
    this.glimpsefile = event.target.files[0].name
  }
  glimpseformsubmit() {
    this.filerror = this.glimpseform.value.file === null ? true : false

    if (this.glimpseform.invalid)
      return this.glimpseform.markAllAsTouched()


    this.glimpseform.value.file = this.glimpsefile

    const { date, file } = this.glimpseform.value

    const body = {
      "date": date,
      "fileName": file
    }

    this.services.postglimpsevideo(body).subscribe({
      next: (response) => {

        this.glimpseform.reset()

        this.openSnackBar(response)


      },
      error: (error) => {
        console.error(error.message);

      }
    })


  }



}
