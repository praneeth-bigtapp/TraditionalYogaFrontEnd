import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CourseMediaService } from 'src/app/data/services/admin-module/course-management/course-media/course-media.service';
import { DialogPopupComponent } from 'src/app/shared/components/dialog-popup/dialog-popup.component';
import { InputvalidationService } from 'src/app/shared/services/input-validation.service';

@Component({
  selector: 'app-my-course-matrieals',
  templateUrl: './my-course-matrieals.component.html',
  styleUrls: ['./my-course-matrieals.component.css']
})
export class MyCourseMatriealsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  pageno: number = 1

  displayform: boolean = false
  iseditable: boolean = false
  issubmit: boolean = true
  FormDeatils!: FormGroup
  filterData: any
  gridData = [];
  courses: any
  catogeries: any
  othervalue: any
  media: any
  datas: any
  filerror!: boolean
  filedata!: any
  tablevalues: any
  newcatogeries = false
  data!: any
  dataSource: any;
  displayedColumns: string[] = ['courseMaterialId', 'courseMaterialTitle', 'createdDate', "mediaId", "action"];

  constructor(private formbuilder: FormBuilder, private service: CourseMediaService, private _snackBar: MatSnackBar, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getcourseslist()
    this.getmedias()
    this.getcoursecatogery()
    // this.getcoursedetails()
    this.getdata()


    this.FormDeatils = this.formbuilder.group({
      coursematerialID: [null],
      courses: [null, Validators.compose([Validators.required])],
      others: [null],
      catogery: [null, Validators.compose([Validators.required])],
      addMedia: [null, Validators.compose([Validators.required])],
      upload: [null],
      videoLink: [null, Validators.compose([Validators.required, Validators.pattern(InputvalidationService.inputvalidation.videolink)])],
      message: [null, Validators.compose([Validators.required])],
      coursetitle: [null, Validators.compose([Validators.required])],


    })
    this.filterData = {
      filterColumnNames: this.displayedColumns.map(ele => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    }

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
  newOthers(event: any) {
    if (event.value == '-1') {
      this.newcatogeries = true

    }
    else {
      this.newcatogeries = false
    }
  }
  onpaginatechange(event: any) {
    if (event.pageIndex === 0) {
      this.pageno = 1
      return
    }
    this.pageno = (event.pageIndex * event.pageSize) + 1
    return
  }


  getcourseslist() {
    this.service.getCourse().subscribe({
      next: (response) => {
        this.courses = response;


      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  getmedias() {
    this.service.getmediatype().subscribe({
      next: (response) => {
        this.media = response;


      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }
  getcoursecatogery() {
    this.service.getcategorymaterial().subscribe({
      next: (response) => {
        this.catogeries = response;
        const othersData = {
          "materialCategoryId": -1,
          "categoryName": "others"
        };
        this.catogeries.push(othersData);


      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  getdata() {
    this.service.getCourseMaterial().subscribe({
      next: (response) => {
        // this.catogeries = response;
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
    });
  }



  editdetails(element: any) {

    this.FormDeatils.setValue({
      coursematerialID: element.courseMaterialId,
      courses: element.coursesId.coursesId,
      others: null,
      catogery: element.materialCategoryId.materialCategoryId,
      addMedia: element.mediaId.mediaId,
      upload: null,
      videoLink: element.videoLink,
      message: element.message,
      coursetitle: element.courseMaterialTitle,
    });
    this.newcatogeries = false
    this.iseditable = true
    this.displayform = true
    this.issubmit = true

  }

  deletedetails(id: any) {

    const body = {
      "courseMaterialId": id
    }

    const dialogref = this.dialog.open(DialogPopupComponent, {
      data: {
        title: "Delete Confirmation",
        message: "Are You Sure You Want To Delete this material ?"
      },
      width: "30%",
      height: "25%"
    })

    dialogref.afterClosed().subscribe(data => {
      if (data) {
        this.service.deleteCourseMaterial(body).subscribe({
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
  ngAfterViewInit() {
    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort;

  }
  updatePagination() {

    this.dataSource.paginator = this.paginator;
  }
  onsubmit() {
    this.onfilechange(null)



    if (this.FormDeatils.invalid)
      return this.FormDeatils.markAllAsTouched()



    const { coursematerialID, courses, others, catogery, addMedia, upload, videoLink, message, coursetitle } = this.FormDeatils.value

    // console.log({ coursematerialID, courses, others, catogery, addMedia, upload, videoLink, message, coursetitle });

    if (this.iseditable) {
      const body =
      {
        "courseMaterialId": coursematerialID,
        "coursesId": {
          "coursesId": courses
        },
        "materialCategoryId": {
          "materialCategoryId": catogery
        },
        "otherCategoryName": others,
        "mediaId": {
          "mediaId": addMedia
        },
        "courseMaterialTitle": coursetitle,
        "videoLink": videoLink,
        "fileUpload": this.filedata,
        "message": message
      }
      this.service.updateCourseMaterial(body).subscribe({
        next: (response) => {
          this.openSnackBar(response)
          this.FormDeatils.reset()
          this.getdata()
          this.getcoursecatogery()
        },
        error: (error) => {
          console.error(error);

        }
      })

      //editable
      return
    }

    const body = {
      "coursesId": {
        "coursesId": courses

      },
      "materialCategoryId": {
        "materialCategoryId": catogery

      },
      "otherCategoryName": others || "",
      "mediaId": {
        "mediaId": addMedia

      },
      "courseMaterialTitle": coursetitle,
      "videoLink": videoLink,
      "fileUpload": this.filedata,
      "message": message

    }

    this.service.postCourseMaterial(body).subscribe({
      next: (response) => {
        this.openSnackBar(response)
        this.FormDeatils.reset()
        this.getdata()
        this.getcoursecatogery()
      },
      error: (error) => {
        console.error(error);

      }
    })


  }
  onfilechange(event: any) {
    this.filerror = this.FormDeatils.value.upload === null ? true : false
    if (event) {
      this.filedata = event.target.files[0].name
      return
    }
  }
  openSnackBar(data: any) {
    this._snackBar.open(data.message, 'Close', {
      duration: 2 * 1000,
    });
  }
  viewDetails(id: any) {

    this.router.navigate(["ViewMycourseMatrieals", id]);
    // this.getallData()
  }

  addcoursematerial() {
    this.displayform = true
    this.issubmit = true
  }

  reseteditable() {
    this.FormDeatils.reset()
    this.iseditable = false
    this.displayform = !this.displayform
    this.issubmit = true
  }
}
