import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EALREADY } from 'constants';
import { VideoGalleryService } from 'src/app/data/services/admin-module/website-management/video-gallery/video-gallery.service';
import { DialogPopupComponent } from 'src/app/shared/components/dialog-popup/dialog-popup.component';

@Component({
  selector: 'app-video-gallery',
  templateUrl: './video-gallery.component.html',
  styleUrls: ['./video-gallery.component.css']
})
export class VideoGalleryComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  filterData: any
  pageno: number = 1
  gridData: any;
  createalbum!: FormGroup
  displaycontent: boolean = false
  issubmit: boolean = true
  iseditable: boolean = false
  filerror!: boolean
  filerror2: boolean = false

  data!: any

  displayedColumns: string[] = ["SNo", "GalaryName", "dateofcreation", "role", "numberofvideosadded", "Actions"];

  dataSource: any;

  constructor(public dialog: MatDialog,
    public router: Router,
    private service: VideoGalleryService,
    private _snackBar: MatSnackBar,
    private formbuilder: FormBuilder) {
    this.createalbum = this.formbuilder.group({
      albumId: [null],
      GalaryName: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],
      dateofcreation: [null, Validators.compose([Validators.required])],
      // duration: [null, Validators.compose([Validators.required])],
      todate: [null, Validators.compose([Validators.required])],

    });
  }

  ngOnInit(): void {
    this.filterData = {
      filterColumnNames: this.displayedColumns.map(ele => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };
    this.getAlbumData()
  }

  renderTableData(data: any) {
    this.dataSource = new MatTableDataSource<any>(data)

    this.filterData.gridData = data;
    this.filterData.dataSource = this.dataSource;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.filterData.sort = this.sort;
    for (let col of this.filterData.filterColumnNames) {
      col.Value = '';
    }
  }



  updatePagination() {

    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort;

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
  album() {
    this.displaycontent = !this.displaycontent
  }

  getAlbumData() {


    this.service.getAlbum().subscribe({
      next: (response) => {
        this.data = response
        this.data = this.data.reverse()
        console.log(this.data);

        this.renderTableData(this.data)
      },
      error: (error) => {
        console.error(error);
        this.data = [
          {
            "GalaryName": "RYT 200 Course photos",
            "dateofcreation": new Date(),
            "role": "Admin",
            "numberofvideosadded": 18,
            "SNo": "1",
            "isvisible": false
          },
          {
            "GalaryName": "RYT 800Course photos",
            "dateofcreation": new Date(),
            "role": "Student",
            "numberofvideosadded": 108,
            "SNo": "2",
            "isvisible": true
          },
          {
            "GalaryName": "RYT 800Course photos",
            "dateofcreation": new Date(),
            "role": "Student",
            "numberofvideosadded": 10,
            "SNo": "3",
            "isvisible": true
          },
          {
            "GalaryName": "RYT 800Course photos",
            "dateofcreation": new Date(),
            "role": "Student",
            "numberofvideosadded": 108,
            "SNo": "4",
            "isvisible": true
          }
        ]
        this.renderTableData(this.data)

      }
    })
  }

  ChangeActive(element: any) {
    const yes = ["Yes", "Y", "yes", "y"]
    const no = ["No", "N", "no", "n"]

    const body = {

    }

    this.service.toggleAlbum(body).subscribe({
      next: (response) => {
        this.openSnackBar(response)
        this.getAlbumData()
      },
      error: (error) => {
        console.error(error);

      }
    })

  }
  IsActiveorNot(element: any) {
    const yes = ["Yes", "Y", "yes", "y"]
    const no = ["No", "N", "no", "n"]


    return yes.includes(element)
  };
  viewdetails(element: any) {
    this.createalbum.patchValue({

      albumId: [null],
      GalaryName: null,
      description: null,
      dateofcreation: null,
      // duration: ,
      todate: null,

    })
    this.issubmit = false
    this.displaycontent = true
  }
  editdetails(element: any) {

    this.createalbum.patchValue({

      albumId: [null],
      GalaryName: null,
      description: null,
      dateofcreation: null,
      // duration: ,
      todate: null,

    })
    this.iseditable = true
    this.displaycontent = true
    this.issubmit = true

  }
  deletedetails(element: any) {
    const body = {

    }
    const dialogref = this.dialog.open(DialogPopupComponent, {
      data: {
        title: "Delete Confirmation",
        message: "Are You Sure You Want To Delete this video album ?"
      },
      width: "35%",
      height: "25%"
    })

    dialogref.afterClosed().subscribe(data => {
      if (data) {
        this.service.deleteAlbum(body).subscribe({
          next: (response) => {
            this.openSnackBar(response)
            this.getAlbumData()
          },
          error: (error) => {
            console.error(error);

          }
        })
        return
      }

    })


    return
  }

  addphoto() {
    this.router.navigate(["admin/uploadVideos"])
  }

  reseteditable() {
    this.createalbum.reset()
    this.iseditable = false
    this.displaycontent = !this.displaycontent
    this.issubmit = true
    this.filerror2 = false
  }

  createAlbumSubmit() {
    if (this.createalbum.invalid)
      return this.createalbum.markAllAsTouched()

    const { GalaryName, description, dateofcreation, todate } = this.createalbum.value

    if (this.iseditable) {
      const body = {
        // :albumId
        "albumName": GalaryName,
        "eventFromDate": dateofcreation,
        "eventToDate": todate,
        "description": description
      }
      this.service.updateAlbum(body).subscribe({
        next: (response) => {
          this.createalbum.reset()
          this.openSnackBar(response)
          this.getAlbumData()
        },
        error: (error) => {
          console.error(error);

        }
      })
      return
    }

    const body = {
      "albumName": GalaryName,
      "eventFromDate": dateofcreation,
      "eventToDate": todate,
      "description": description
    }

    this.service.createAlbum(body).subscribe({
      next: (response) => {
        this.createalbum.reset()
        this.openSnackBar(response)
        this.getAlbumData()
      },
      error: (error) => {
        console.error(error);

      }
    })


  }


}
