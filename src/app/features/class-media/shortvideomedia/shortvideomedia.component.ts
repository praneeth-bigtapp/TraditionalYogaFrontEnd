import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  displayedColumns: string[] = ['classMediaId', 'title', 'category', 'videolink', "classdate", "duration", "Action"];
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

  tabledata: any = [{
    "classMediaId": 1,
    "title": "Yoga",
    "category": "student",
    "videolink": "www.google.com",
    "classdate": "23-12-2022",
    "duration": 25
  },
  {
    "classMediaId": 2,
    "title": "Testing",
    "category": "student",
    "videolink": "www.google.com",
    "classdate": "25-12-2022",
    "duration": 30
  },

  {
    "classMediaId": 3,
    "title": "RYO Short Video",
    "category": "resources",
    "videolink": "www.google.com",
    "classdate": "25-12-2022",
    "duration": 30
  },

  {
    "classMediaId": 4,
    "title": "RYO Short Video",
    "category": "pratice library",
    "videolink": "www.google.com",
    "classdate": "28-12-2022",
    "duration": 15
  },
  {
    "classMediaId": 5,
    "title": "Short Meditation Short Video",
    "category": "pratice library",
    "videolink": "www.google.com",
    "classdate": "29-12-2022",
    "duration": 15
  },
  ]

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
      courseMediaId: [null],
      videolink: [null, Validators.compose([Validators.required, Validators.pattern(InputvalidationService.inputvalidation.videolink)])],
      date: [null, Validators.compose([Validators.required])],
      duration: [null, Validators.compose([Validators.required, Validators.pattern(InputvalidationService.inputvalidation.durationvalidation)])],
      category: [null, Validators.compose([Validators.required])],
      title: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],
      // others: [null, Validators.compose([Validators.required])],
      // subcategory: [null, Validators.compose([Validators.required])],
    })
    services.getcoursemediacategory().subscribe({
      next: (response) => {

        this.categorylist = response

      },
      error: (error) => {
        console.error(error.message);

      }
    })
    // this.getalldata()

    this.dataSource = new MatTableDataSource<any>(this.tabledata)
    this.filterData.gridData = this.tabledata;
    this.filterData.dataSource = this.dataSource;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.filterData.sort = this.sort;
    for (let col of this.filterData.filterColumnNames) {
      col.Value = '';
    }
  }

  ngOnInit(): void {
  }

  getalldata() {
    this.services.getMediadetails().subscribe({
      next: (response) => {
        this.data = response;
        console.log(this.data);

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
    });

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
    this.shortvideoform.setValue({
      courseMediaId: null,
      videolink: null,
      date: null,
      duration: null,
      category: null,
      title: null,
      description: null,
    })

    this.issubmit = false
    this.displaycontent = true

  }
  editdetails(element: any) {
    this.shortvideoform.setValue({
      courseMediaId: null,
      videolink: null,
      date: null,
      duration: null,
      category: null,
      title: null,
      description: null,
    })
    this.iseditable = true
    this.issubmit = true
    this.displaycontent = true


  }
  deletedetails(id: any) {

    console.log(id);

    const body = {
      "courseMediaId": 1
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
        this.services.deleteshortvideo(body).subscribe({
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

  convertH2M(timeInHour: string) {
    var timeParts = timeInHour.split(":");
    return Number(timeParts[0]) * 60 + Number(timeParts[1]);
  }

  shortvideoformsubmit() {

    if (this.shortvideoform.invalid)
      return this.shortvideoform.markAllAsTouched()


    const { courseMediaId, videolink, date, duration, category, title, description } = this.shortvideoform.value


    if (this.iseditable) {
      const body = {
        "courseMediaId": courseMediaId,
        "courseLink": videolink,
        "date": date,
        "duration": this.convertH2M(duration),
        "title": title,
        "categoryId": category,
        "description": description
      }
      this.services.updateshortvideo(body).subscribe({
        next: (response) => {

          this.shortvideoform.reset()

          this.openSnackBar(response)
        },
        error: (error) => {
          console.error(error.message);

        }
      })

    }

    const body = {
      "courseLink": videolink,
      "courseId": this.data.course,
      "date": date,
      "duration": this.convertH2M(duration),
      "title": title,
      "catgoryId": category,
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
