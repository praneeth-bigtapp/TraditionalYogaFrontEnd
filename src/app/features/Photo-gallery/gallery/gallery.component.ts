import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, Validators, FormGroup, FormBuilder, } from '@angular/forms';
import { CreateGalleryComponent } from '../create-gallery/create-gallery.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  filterData: any
  gridData: any;
  createalbum!: FormGroup
  displaycontent: boolean = false
  issubmit: boolean = true
  iseditable: boolean = false
  filerror!: boolean
  filerror2: boolean = false

  data = [
    {
      "GalaryName": "RYT 200 Course photos",
      "dateofcreation": "21-07-2022",
      "role": "Admin",
      "numberofphotosadded": 18,
      "isvisible": false
    },
    {
      "GalaryName": "RYT 800Course photos",
      "dateofcreation": "22-07-2022",
      "role": "Student",
      "numberofphotosadded": 108,
      "isvisible": true
    },
    {
      "GalaryName": "RYT 800Course photos",
      "dateofcreation": "22-07-2022",
      "role": "Student",
      "numberofphotosadded": 10,
      "isvisible": true
    },
    {
      "GalaryName": "RYT 800Course photos",
      "dateofcreation": "22-07-2022",
      "role": "Student",
      "numberofphotosadded": 108,
      "isvisible": true
    }



  ]
  displayedColumns: string[] = ["GalaryName", "dateofcreation", "role", "numberofphotosadded", "Actions"];

  dataSource: any;

  // displayedColumns: string[] = ["image","Galleryname","dateofcreationOfCreation",'numOfPhotos','status', 'view'];

  constructor(
    public dialog: MatDialog,
    public router: Router,
    private formbuilder: FormBuilder
  ) {

    this.createalbum = this.formbuilder.group({

      albumname: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],
      fromdate: [null, Validators.compose([Validators.required])],
      // duration: [null, Validators.compose([Validators.required])],
      todate: [null, Validators.compose([Validators.required])],

    });
  }

  ngOnInit(): void {

    this.dataSource = new MatTableDataSource<any>(this.data)
    this.filterData = {
      filterColumnNames: this.displayedColumns.map(ele => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };


    this.filterData.gridData = this.data;
    this.filterData.dataSource = this.dataSource;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.filterData.sort = this.sort;
    for (let col of this.filterData.filterColumnNames) {
      col.Value = '';
    }

  }
  createGallery() {
    this.dialog.open(CreateGalleryComponent);
  }
  ngAfterViewInit() {
    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort;

  }

  updatePagination() {

    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort;

  }

  addphoto() {
    this.router.navigate(["uploadGallery"])
  }

  ChangeActive(element: any) {

  }
  IsActiveorNot(element: any) {
    return true
  }
  viewdetails(element: any) {

  }
  editdetails(element: any) {

  }
  deletedetails(element: any) {

  }
  album() {
    this.displaycontent = !this.displaycontent
  }
  reseteditable() {
    this.createalbum.reset()
    this.iseditable = false
    this.displaycontent = !this.displaycontent
    this.issubmit = true
    this.filerror2 = false
  }


}