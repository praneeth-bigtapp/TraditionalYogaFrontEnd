import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-my-course-matrieals',
  templateUrl: './my-course-matrieals.component.html',
  styleUrls: ['./my-course-matrieals.component.css']
})
export class MyCourseMatriealsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

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
  data = [{ 'S_No': '1', 'title': 'Traditional Yoga', 'date': '2022-22-12', "mtype": "images" },
  { 'S_No': '2', 'title': 'Traditional Yoga1', 'date': '2022-22-10', "mtype": "images2" },
  { 'S_No': '3', 'title': 'Traditional Yoga2', 'date': '2022-22-12', "mtype": "images3" },
  { 'S_No': '4', 'title': 'Traditional Yoga3', 'date': '2022-22-2', "mtype": "images4" },
  { 'S_No': '5', 'title': 'Traditional Yoga4', 'date': '2022-22-1', "mtype": "images" }]
  dataSource: any;
  displayedColumns: string[] = ['S_No', 'title', 'date', "mtype", "Details"];

  constructor(private formbuilder: FormBuilder, private service: CoursesService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.getcourseslist()
    this.getmedias()
    this.getcoursecatogery()
    this.getcoursedetails()



    this.FormDeatils = this.formbuilder.group({
      courses: [null, Validators.compose([Validators.required])],
      others: [null, Validators.compose([Validators.required])],
      catogery: [null, Validators.compose([Validators.required])],
      addMedia: [null, Validators.compose([Validators.required])],
      upload: [null],
      videoLink: [null, Validators.compose([Validators.required])],
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
    this.data.map(ele => ele.date).sort()
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
  newOthers() {
    if (this.othervalue == '4') {
      this.newcatogeries = true

    }
    else {
      this.newcatogeries = false
    }
  }
  getcoursedetails() {
    this.service.getcoursematerials().subscribe({
      next: (response) => {
        this.tablevalues = response;

        console.log(this.tablevalues);


      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }
  getcourseslist() {
    this.service.getCourse().subscribe({
      next: (response) => {
        this.courses = response;

        console.log(this.courses);


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

        console.log(this.media);


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

        console.log(this.catogeries);


      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }



  editdetails(element: any) {

    console.log(element);

    // this.FormDeatils.setValue({
    //   courses: ,
    //   others:,
    //   catogery: ,
    //   addMedia: ,
    //   upload: ,
    //   videoLink:,
    //   message: ,
    //   coursetitle:,
    // });
    this.iseditable = true
    this.displayform = true
    this.issubmit = true
  }
  deletedetails(element: any) {

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
    console.log(this.FormDeatils.value);


    if (this.FormDeatils.invalid)
      return this.FormDeatils.markAllAsTouched()

    this.FormDeatils.value.addMedia = this.filedata

    const { courses, others, category, addMedia, upload, videoLink, message, coursetitle } = this.FormDeatils.value

    console.log({ courses, others, category, addMedia, upload, videoLink, message, coursetitle });

    if (this.iseditable) {

      //editable
      return
    }

    const body = {
      "coursesId": {
        "coursesId": 3,
        "categorieId": {
          "categoriesId": 3
        }

      },
      "addCategory": "Testing purpose-2",
      "addDescription": "testing ",
      "materialCategoryId": {
        "materialCategoryId": 2

      },
      "mediaId": {
        "mediaId": 2
      },
      "videoLink": "https://www.youtube.com/watch?v=18PCf6aq5wI&list=RDMM18PCf6aq5wI&start_radio=1",
      "fileUpload": "",
      "message": "Tetsing-2"


    }

    if (this.filerror == false) {
      this.openSnackBar('Data Added Successfully')
      this.FormDeatils.reset()
    }
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
