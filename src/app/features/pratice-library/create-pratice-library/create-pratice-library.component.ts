import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreatepraticelibraryService } from '../service/createpraticelibrary.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-create-pratice-library',
  templateUrl: './create-pratice-library.component.html',
  styleUrls: ['./create-pratice-library.component.css']
})
export class CreatePraticeLibraryComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  category!: string
  addmediaform!: any
  timerror!: boolean
  categoryerror: boolean = false
  displaycontent: boolean = false

  filterData: any;
  gridData = [];
  dataSource: any;
  displayedColumns: string[] = ['praticeLibaryId', 'videoLink', "duration", "title", "message", "metaKeyword", "Action"];
  data: any;
  iseditable: boolean = false

  categoryList!: any
  constructor(
    private formbuilder: FormBuilder,
    private service: CreatepraticelibraryService,
    private _snackBar: MatSnackBar
  ) {

    this.filterData = {
      filterColumnNames: this.displayedColumns.map(ele => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };

    this.service.getcategory().subscribe({
      next: (response) => {
        this.categoryList = response
      },
      error: (error) => {
        console.error(error.message);

      }
    })
    this.getdata()
  }

  getdata() {
    this.service.getpraticelibrary().subscribe({
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

  ngOnInit(): void {
    this.addmediaform = this.formbuilder.group({
      praticelibraryId: [null],

      category: [null, Validators.compose([Validators.required])],
      videolink: [null, Validators.compose([Validators.required])],
      videotitle: [null, Validators.compose([Validators.required])],
      videodescription: [null, Validators.compose([Validators.required])],
      videoduration: [null, Validators.compose([Validators.required])],
      vidoemetakeywords: [null, Validators.compose([Validators.required])]
    })
  }

  ngAfterViewInit() {
    this.filterData.dataSource.paginator = this.paginator;

  }
  updatePagination(col: any) {
    this.filterData.dataSource.paginator = this.paginator;
  }

  opensnackBar(data: any) {
    this._snackBar.open(data.message, 'Close')
  }

  coursechange() {
    this.displaycontent = false

    if (this.category)
      this.categoryerror = false
  }

  addlibrary() {
    this.displaycontent = !this.displaycontent
  }

  compareselect(obj1: any, obj2: any) {
    return obj1 && obj2 && obj1.categoriesId === obj2
  }

  viewdetails(element: any) {

  }
  deletedetails(id: any) {

    const body = {
      "praticeLibaryId": id,
    }

    this.service.deletelibrary(body).subscribe({
      next: (response) => {
        this.opensnackBar(response)
        this.addmediaform.reset()
        this.getdata()
      },
      error: (error) => {
        console.error(error.message);
      }
    })

  }
  editdetails(element: any) {
    console.log(element);

    this.addmediaform.setValue({
      praticelibraryId: element.praticeLibaryId,
      category: element.categoryId,
      videolink: element.videoLink,
      videotitle: element.title,
      videodescription: element.message,
      videoduration: element.duration,
      vidoemetakeywords: element.metaKeyword,
    });
    this.iseditable = true
    this.displaycontent = true
  }

  reseteditable() {
    this.addmediaform.reset()
    this.iseditable = false
    this.displaycontent = !this.displaycontent
  }

  addmedia() {


    if (this.addmediaform.valid) {

      const { praticelibraryId, category, videolink, videotitle, videodescription, videoduration, vidoemetakeywords } = this.addmediaform.value


      const body = {
        "videoLink": videolink,
        "duration": videoduration,
        "title": videotitle,
        "message": videodescription,
        "metaKeyword": vidoemetakeywords
      }


      if (this.iseditable) {
        //editable
        const body = {
          "praticeLibaryId": praticelibraryId,
          "videoLink": videolink,
          "duration": videoduration,
          "title": videotitle,
          "message": videodescription,
          "metaKeyword": vidoemetakeywords
        }
        console.log(body);

        this.service.updatelibrary(body).subscribe({
          next: (response) => {
            this.addmediaform.reset()
            // this.opensnackBar(response)
            this.opensnackBar({ message: "Library Created" })
            this.getdata()

          },
          error: (error) => {
            console.error(error.message);

          }
        })
        return
      }



      this.service.postpraticelibrary(body, category)?.subscribe({
        next: (response) => {

          this.addmediaform.reset()
          // this.opensnackBar(response)
          this.opensnackBar({ message: "Library Created" })
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
