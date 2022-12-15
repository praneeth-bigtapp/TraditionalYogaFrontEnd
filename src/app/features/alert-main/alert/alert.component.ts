import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AlertService } from '../service/alertservoce.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  filterData: any;
  gridData = [];
  dataSource: any;
  displayedColumns: string[] = ['coursesId', 'category', 'coursesName', "courseDuration", "startDate", "endDate", "currentStatus", "Action"];
  data: any;
  disableSelect = new FormControl(false);
  alertform !: FormGroup
  category!: any
  filerror!: boolean
  filedata!: any

  displaycontent: boolean = true
  iseditable: boolean = false

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '25rem',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    // enableToolbar: true,
    // showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],


    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

  constructor(
    private formbuilder: FormBuilder,
    private alertservice: AlertService,
    private _snackBar: MatSnackBar
  ) {
    this.alertform = this.formbuilder.group({
      alertid: [null, Validators.compose([Validators.required])],
      paragraph: [null, Validators.compose([Validators.required])],
      startdate: [null, Validators.compose([Validators.required])],
      enddate: [null, Validators.compose([Validators.required])],
      // file: [null, Validators.compose([Validators.required])],
      file: [null, Validators.compose([])],
    })
    this.filterData = {
      filterColumnNames: this.displayedColumns.map((ele: any) => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };
  }

  addalert() {
    this.displaycontent = !this.displaycontent
  }
  updatePagination(col: any) {
    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort
  }

  onfilechange(event: any) {

    this.filerror = this.alertform.value.file === null ? true : false
    this.filedata = event.target.files[0].name
  }

  ngOnInit(): void {


    this.alertservice.getRoles()
      .subscribe({
        next: (response) => {
          this.category = response


        },
        error: (error) => {
          console.error(error.message);

        }
      })
    this.getdata()
  }

  getdata() {
    this.alertservice.getAllAlerts().subscribe({
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

  openSnackBar(message: any) {
    this._snackBar.open(message, 'Close');
  }

  compareselect(obj1: any, obj2: any) {
    return obj1 && obj2 && obj1.categoriesId === obj2
  }

  viewdetails(element: any) {

  }
  deletedetails(id: any) {

    const body = {
      "coursesId": id,
    }

    this.alertservice.deletealert(body).subscribe({
      next: (response) => {
        this.openSnackBar(response)
        this.alertform.reset()
        this.getdata()
      },
      error: (error) => {
        console.error(error.message);
      }
    })

  }
  editdetails(element: any) {
    this.alertform.setValue({

    });
    this.iseditable = true
    this.displaycontent = true
  }

  reseteditable() {
    this.alertform.reset()
    this.iseditable = false
    this.displaycontent = !this.displaycontent
  }

  onalertsubmit() {


    this.filerror = this.alertform.value.file === null ? true : false


    if (this.alertform.valid) {
      this.alertform.value.file = this.filedata


      const body = {

        "categoryId": this.alertform.value.alertid,
        "alertDescription": this.alertform.value.paragraph,
        "startDate": this.alertform.value.startdate,
        "endDate": this.alertform.value.enddate
      }


      console.log(body)

      if (this.iseditable) {
        //editable
        this.alertservice.updatealert(body).subscribe({
          next: (response) => {
            this.alertform.reset()
            this.openSnackBar(response.message)
            this.getdata()

          },
          error: (error) => {
            console.error(error.message);

          }
        })

        return
      }

    }
    else {
      this.alertform.markAllAsTouched()
    }
  }

}
