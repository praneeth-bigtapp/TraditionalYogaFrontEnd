import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogPopupComponent } from 'src/app/shared/dialog-popup/dialog-popup.component';
import { ScripcturesService } from '../service/scripctures.service';

@Component({
  selector: 'app-create-scripctures',
  templateUrl: './create-scripctures.component.html',
  styleUrls: ['./create-scripctures.component.css']
})
export class CreateScripcturesComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  gridData = [];
  filterData: any;
  dataSource: any;


  pageno: number = 1
  category!: string
  addmediaform!: any
  timerror!: boolean
  filerror!: boolean
  filerror2!: boolean
  backcoverdata!: any
  filedata!: any
  displaycontent: boolean = true
  iseditable: boolean = false
  displayedColumns: string[] = ['sno', 'title', 'description', "metakeyword", "Action"];

  data: any = [{
    "title": "Title",
    "description": "Description",
    "metakeyword": "metakeyword"
  }]
  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private service: ScripcturesService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    this.filterData = {
      filterColumnNames: this.displayedColumns.map((ele: any) => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };

    this.getdata()

  }

  ngOnInit(): void {
    this.addmediaform = this.formbuilder.group({
      coverimage: [null, Validators.compose([Validators.required])],
      covertitle: [null, Validators.compose([Validators.required])],
      coverdescription: [null, Validators.compose([Validators.required])],
      coverfile: [null, Validators.compose([Validators.required])],
      coverkeywords: [null, Validators.compose([Validators.required])]
    })
  }

  gobutton() {
    const classtype = this.category
    console.log(classtype);

  }
  openSnackBar(data: any) {
    this._snackBar.open(data.message, 'Close', {
      duration: 2 * 1000,
    });
  }

  getdata() {
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
  add() {
    this.displaycontent = !this.displaycontent
  }
  updatePagination(col: any) {
    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort
  }
  onfilechange(formname: string, event: any) {

    if (formname === 'backcover') {
      this.filerror = this.addmediaform.value.coverimage === null ? true : false

      this.backcoverdata = event && event.target.files[0].name
      console.log(this.backcoverdata);
    }
    if (formname === 'file') {
      this.filerror2 = this.addmediaform.value.coverfile === null ? true : false
      this.filedata = event && event.target.files[0].name
      console.log(this.filedata);
    }

  }
  ontimechange() {
    this.timerror = this.addmediaform.value.videoduration === null ? true : false

  }
  reseteditable() {
    this.addmediaform.reset()
    this.iseditable = false
    this.displaycontent = !this.displaycontent
  }
  onpaginatechange(event: any) {
    if (event.pageIndex === 0) {
      this.pageno = 1
      return
    }
    this.pageno = (event.pageIndex * event.pageSize) + 1

    return
  }

  viewdetails(element: any) {

  }

  editdetails(element: any) {

  }

  deletedetails(id: any) {
    const dialogref = this.dialog.open(DialogPopupComponent, {
      data: {
        title: "Delete Confirmation",
        message: "Are You Sure You Want To Delete this scripctures ?"
      },
      width: "25%"
    })

    dialogref.afterClosed().subscribe(data => {
      if (data) {
        //delete API 
        return
      }

    })
  }

  addmedia() {

    this.filerror = this.addmediaform.value.coverimage === null ? true : false
    this.filerror2 = this.addmediaform.value.coverfile === null ? true : false


    if (this.addmediaform.valid) {
      this.addmediaform.value.coverimage = this.backcoverdata
      this.addmediaform.value.coverfile = this.filedata


      const { coverimage, covertitle, coverdescription, coverfile, coverkeywords } = this.addmediaform.value
      console.log({ coverimage, covertitle, coverdescription, coverfile, coverkeywords })


      const body = {

      }

      this.service.postscripctures(body).subscribe({
        next: (response) => {
          console.log(response);
          this.openSnackBar(response)
        },
        error: (error) => {
          console.error(error.message);

        }
      })


    }
    else {
      this.addmediaform.markAllAsTouched()
    }

  }
}
