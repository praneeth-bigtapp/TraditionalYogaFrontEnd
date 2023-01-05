import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EALREADY } from 'constants';

@Component({
  selector: 'app-video-gallery',
  templateUrl: './video-gallery.component.html',
  styleUrls: ['./video-gallery.component.css']
})
export class VideoGalleryComponent implements OnInit {
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
      "numberofvideosadded": 18,
      "SNo": "1",
      "isvisible": false
    },
    {
      "GalaryName": "RYT 800Course photos",
      "dateofcreation": "22-07-2022",
      "role": "Student",
      "numberofvideosadded": 108,
      "SNo": "2",
      "isvisible": true
    },
    {
      "GalaryName": "RYT 800Course photos",
      "dateofcreation": "22-07-2022",
      "role": "Student",
      "numberofvideosadded": 10,
      "SNo": "3",
      "isvisible": true
    },
    {
      "GalaryName": "RYT 800Course photos",
      "dateofcreation": "22-07-2022",
      "role": "Student",
      "numberofvideosadded": 108,
      "SNo": "4",
      "isvisible": true
    }



  ]
  displayedColumns: string[] = ["SNo","GalaryName", "dateofcreation", "role", "numberofvideosadded", "Actions"];

  dataSource: any;

  constructor(public dialog: MatDialog,
    public router: Router,
    private formbuilder: FormBuilder) { 
      this.createalbum = this.formbuilder.group({

        GalaryName: [null, Validators.compose([Validators.required])],
        description: [null, Validators.compose([Validators.required])],
        dateofcreation: [null, Validators.compose([Validators.required])],
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

  ngAfterViewInit() {
    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort;

  }

  updatePagination() {

    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort;

  }

  album() {
    this.displaycontent = !this.displaycontent
  }

  ChangeActive(element: any) {

  }
  IsActiveorNot(element: any) {
    return true
  }
  viewdetails(element: any) {
    this.createalbum.patchValue({

      GalaryName: element.GalaryName,
      dateofcreation:element.dateofcreation,

    })
    this.issubmit = false
    this.displaycontent = true
  }
  editdetails(element: any) {

    this.createalbum.patchValue({

      GalaryName: element.GalaryName,
      dateofcreation:element.dateofcreation,

    })
    this.iseditable = true
    this.displaycontent = true
    this.issubmit = true

  }
  deletedetails(element: any) {
    this.createalbum.patchValue({

      GalaryName: element.GalaryName,

    })
  }

  addphoto() {
    this.router.navigate(["uploadVideos"])
  }

  reseteditable() {
    this.createalbum.reset()
    this.iseditable = false
    this.displaycontent = !this.displaycontent
    this.issubmit = true
    this.filerror2 = false
  }


}
