import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs';
import { InputvalidationService } from 'src/app/shared/services/inputvalidation.service';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  selection = new SelectionModel<any>(true, []);

  pageno: number = 1

  courselist!: any
  categorylist!: any
  displayedColumns: string[] = ['classMediaId', 'date', 'typeOfClass', "noOfMediaFiles", "Action"];
  dataSource: any;
  disableSelect = new FormControl(false);
  dataForm!: FormGroup
  dateForm!: FormGroup
  data: any
  coursename!: any
  courses: any
  id: any
  filterData: any;
  categoryerror: boolean = false
  gridData = [];
  selectedmember!: any
  filerror!: boolean

  shortvideolist: any[] = []

  glimpsefile!: any

  glimpseform !: FormGroup
  videoform!: FormGroup
  shortvideoform!: FormGroup

  typecategory!: any
  displaycontent: boolean = false
  iseditable: boolean = false
  // data: any;

  constructor(private formbuilder: FormBuilder, private services: ServicesService, private _snackBar: MatSnackBar
  ) {

    this.dateForm = this.formbuilder.group({


      date: [null, Validators.compose([])],
      courseslist: [null, Validators.compose([])],

    })
    this.filterData = {
      filterColumnNames: this.displayedColumns.map(ele => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    }

    services.getcoursemediacategory().subscribe({
      next: (response) => {

        this.categorylist = response

      },
      error: (error) => {
        console.error(error.message);

      }
    })

    this.videoform = this.formbuilder.group({
      videolink: [null, Validators.compose([Validators.required, Validators.pattern(InputvalidationService.inputvalidation.videolink)])],
      date: [null, Validators.compose([Validators.required])],
      title: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],

    })

    this.shortvideoform = this.formbuilder.group({
      videolink: [null, Validators.compose([Validators.required, Validators.pattern(InputvalidationService.inputvalidation.videolink)])],
      date: [null, Validators.compose([Validators.required])],
      duration: [null, Validators.compose([Validators.required, Validators.pattern(InputvalidationService.inputvalidation.durationvalidation)])],
      category: [null, Validators.compose([Validators.required])],
      title: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],

    })
    this.glimpseform = this.formbuilder.group({

      date: [null, Validators.compose([Validators.required])],
      file: [null, Validators.compose([Validators.required])],


    })


  }

  openSnackBar(data: any) {
    this._snackBar.open(data.message, 'Close', {
      duration: 2 * 1000,
    });
  }
  coursechange() {
    this.displaycontent = true
  }

  gobutton() {

    this.displaycontent = true

  }

  ngOnInit(): void {


    this.getalldata()
    this.getallcourse()
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

  onpaginatechange(event: any) {
    if (event.pageIndex === 0) {
      this.pageno = 1
      return
    }
    this.pageno = (event.pageIndex * event.pageSize) + 1
    return
  }
  getallcourse() {
    this.services.getcoursesdetails().subscribe({
      next: (response) => {

        this.courses = response

      },
      error: (error) => {
        console.error(error.message);
      }
    });

  }

  videoformsubmit() {
    if (this.videoform.invalid)
      return this.videoform.markAllAsTouched()


    const { videolink, date, title, description } = this.videoform.value

    const body = {
      "courseLink": videolink,
      "date": date,
      "title": title,
      "description": description
    }

    console.log(body);


    this.services.postvideo(body).subscribe({
      next: (response) => {

        this.videoform.reset()

        this.openSnackBar(response)


      },
      error: (error) => {
        console.error(error.message);

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

  filechange(event: any) {
    this.filerror = this.glimpseform.value.file === null ? true : false

    this.glimpsefile = event.target.files[0].name

  }

  datefilter() {
    const { date, courseslist } = this.dateForm.value

    let filterData = this.data

    if (courseslist) {

      filterData = filterData.filter((ele: any) => ele.courseId.courseId === courseslist)
    }

    if (date) {
      filterData = filterData.filter((ele: any) => ele.date === date)

    }

    this.dataSource = new MatTableDataSource<any>(filterData)
    this.filterData.gridData = filterData;
    this.filterData.dataSource = this.dataSource;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.filterData.sort = this.sort;
    for (let col of this.filterData.filterColumnNames) {
      col.Value = '';
    }
  }

  updatePagination(col: any) {

    this.filterData.dataSource.paginator = this.paginator;
  }

  viewDetails(element: any) {

  }
  editdetails(element: any) {

  }
  deletedetails(element: any) {

  }



}
