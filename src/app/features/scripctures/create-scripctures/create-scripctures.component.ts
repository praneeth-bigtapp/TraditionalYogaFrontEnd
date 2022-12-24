import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogPopupComponent } from 'src/app/shared/dialog-popup/dialog-popup.component';
import { InputvalidationService } from 'src/app/shared/services/inputvalidation.service';
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

  issubmit: boolean = true
  pageno: number = 1
  category!: string
  addmediaform!: any
  timerror!: boolean
  filerror!: boolean
  filerror2!: boolean
  backcoverdata!: any
  filedata!: any
  displaycontent: boolean = false
  iseditable: boolean = false
  displayedColumns: string[] = ['sno', 'title', 'description', "metaKeyWords", "Action"];

  data: any
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
      Id: [null],

      coverimage: [null, Validators.compose([Validators.required])],
      covertitle: [null, Validators.compose([Validators.required])],
      coverdescription: [null, Validators.compose([Validators.required])],
      coverfile: [null, Validators.compose([Validators.required])],
      coverkeywords: [null, Validators.compose([Validators.required, Validators.pattern(InputvalidationService.inputvalidation.keywordsvalidation)])]
    })
  }

  gobutton() {
    const classtype = this.category

  }
  openSnackBar(data: any) {
    this._snackBar.open(data.message, 'Close', {
      duration: 2 * 1000,
    });
  }

  getdata() {

    this.service.getscripctures().subscribe({
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
  add() {
    this.displaycontent = !this.displaycontent
  }
  ngAfterViewInit() {
    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort
  }
  updatePagination(col: any) {
    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort
  }
  onfilechange(formname: string, event: any) {

    if (formname === 'backcover') {
      this.filerror = this.addmediaform.value.coverimage === null ? true : false

      this.backcoverdata = event && event.target.files[0].name
    }
    if (formname === 'file') {
      this.filerror2 = this.addmediaform.value.coverfile === null ? true : false
      this.filedata = event && event.target.files[0].name
    }

  }
  ontimechange() {
    this.timerror = this.addmediaform.value.videoduration === null ? true : false

  }
  reseteditable() {
    this.addmediaform.reset()
    this.iseditable = false
    this.issubmit = true
    this.displaycontent = !this.displaycontent
    this.filerror = false
    this.filerror2 = false
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
    this.addmediaform.setValue({
      Id: element.scripcturesId,
      coverimage: null,
      covertitle: element.title,
      coverdescription: element.description,
      coverfile: null,
      coverkeywords: element.metaKeyWords

    })
    this.iseditable = false
    this.displaycontent = true
    this.issubmit = false
  }

  editdetails(element: any) {
    this.iseditable = true
    this.displaycontent = true
    this.issubmit = true


    this.addmediaform.setValue({
      Id: element.scripcturesId,
      coverimage: null,
      covertitle: element.title,
      coverdescription: element.description,
      coverfile: null,
      coverkeywords: element.metaKeyWords
    })
  }

  deletedetails(id: any) {

    const body = {
      "scripcturesId": id
    }
    const dialogref = this.dialog.open(DialogPopupComponent, {
      data: {
        title: "Delete Confirmation",
        message: "Are You Sure You Want To Delete this scripctures ?"
      },
      width: "30%"
    })

    dialogref.afterClosed().subscribe(data => {
      if (data) {
        //delete API 
        this.service.deletescripctures(body).subscribe({
          next: (response) => {
            this.openSnackBar(response)
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

  addmedia() {

    this.filerror = this.addmediaform.value.coverimage === null ? true : false
    this.filerror2 = this.addmediaform.value.coverfile === null ? true : false


    if (this.addmediaform.valid) {
      this.addmediaform.value.coverimage = this.backcoverdata
      this.addmediaform.value.coverfile = this.filedata


      const { Id, coverimage, covertitle, coverdescription, coverfile, coverkeywords } = this.addmediaform.value


      if (this.iseditable) {
        const body = {
          "scripcturesId": Id,
          "coverImage": coverimage,
          "uploadFile": coverfile,
          "title": covertitle,
          "description": coverdescription,
          "metaKeyWords": coverkeywords
        }
        this.service.updatescripctures(body).subscribe({
          next: (response) => {
            this.openSnackBar(response)
            this.getdata()
          },
          error: (error) => {
            console.error(error.message);

          }
        })
        return
      }

      const body = {
        "coverImage": coverimage,
        "uploadFile": coverfile,
        "title": covertitle,
        "description": coverdescription,
        "metaKeyWords": coverkeywords
      }

      this.service.postscripctures(body).subscribe({
        next: (response) => {
          this.openSnackBar(response)
          this.getdata()
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
