import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DialogPopupComponent } from 'src/app/shared/dialog-popup/dialog-popup.component';
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
  displayedColumns: string[] = ['alertId', 'alertDescription', 'categoryId', 'startDate', "endDate", "Action"];
  data: any;
  disableSelect = new FormControl(false);
  alertform !: FormGroup
  category!: any
  filerror!: boolean
  filedata!: any
  issubmit: boolean = true
  displaycontent: boolean = false
  iseditable: boolean = false
  pageno: number = 1
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
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    this.alertform = this.formbuilder.group({
      alertsno: [null],
      alertid: [null, Validators.compose([Validators.required])],
      paragraph: [null, Validators.compose([Validators.required])],
      startdate: [null, Validators.compose([Validators.required])],
      enddate: [null, Validators.compose([Validators.required])],

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
  onpaginatechange(event: any) {
    if (event.pageIndex === 0) {
      this.pageno = 1
      return
    }
    this.pageno = (event.pageIndex * event.pageSize) + 1
    return
  }
  openSnackBar(data: any) {
    this._snackBar.open(data.message, 'Close', {
      duration: 2 * 1000,
    });
  }

  compareselect(obj1: any, obj2: any) {
    return obj1 && obj2 && obj1 === obj2
  }

  viewdetails(element: any) {
    this.displaycontent = true
    this.issubmit = false
    this.alertform.setValue({
      alertsno: element.alertId,
      alertid: Number(element.categoryId),
      paragraph: element.alertDescription,
      startdate: element.startDate,
      enddate: element.endDate,
    });

  }
  deletedetails(id: any) {

    const body = {
      "alertId": id,
    }

    const dialogref = this.dialog.open(DialogPopupComponent, {
      data: {
        title: "Delete Confirmation",
        message: "Are You Sure You Want To Delete this Alert ?"
      },
      width: "30%",
      height:"25%"
    })

    dialogref.afterClosed().subscribe(data => {
      if (data) {
        this.alertservice.deletealert(body).subscribe({
          next: (response) => {
            this.openSnackBar({ message: "Alert Deleted" })
            this.alertform.reset()
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
    this.iseditable = true
    this.displaycontent = true
    this.issubmit = true
    this.alertform.setValue({
      alertsno: element.alertId,
      alertid: Number(element.categoryId),
      paragraph: element.alertDescription,
      startdate: element.startDate,
      enddate: element.endDate,
    });

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


      if (this.iseditable) {
        //editable

        const body = {
          "alertId": this.alertform.value.alertsno,
          "categoryId": this.alertform.value.alertid + "",
          "alertDescription": this.alertform.value.paragraph,
          "startDate": this.alertform.value.startdate,
          "endDate": this.alertform.value.enddate
        }

        console.log(body);

        this.alertservice.updatealert(body).subscribe({
          next: (response) => {
            this.alertform.reset()
            this.openSnackBar({ message: "Alert Updated" })
            this.getdata()

          },
          error: (error) => {
            console.error(error.message);

          }
        })

        return
      }


      const body = {

        "categoryId": this.alertform.value.alertid + "",
        "alertDescription": this.alertform.value.paragraph,
        "startDate": this.alertform.value.startdate,
        "endDate": this.alertform.value.enddate
      }

      this.alertservice.setalert(body).subscribe({
        next: (response) => {
          this.alertform.reset()
          this.openSnackBar({ message: "Alert Added" })
          this.getdata()

        },
        error: (error) => {
          console.error(error.message);

        }
      })

    }
    else {
      this.alertform.markAllAsTouched()
    }
  }

}
