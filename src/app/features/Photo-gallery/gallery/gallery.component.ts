import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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

    data = [
    {
      "courseName": "RYT 200 Course photos",
      "date": "21-07-2022",
      "role": "Admin",
      "count": 18,
      "isvisible": false
    },
    {
      "courseName": "RYT 800Course photos",
      "date": "22-07-2022",
      "role": "Student",
      "count": 108,
      "isvisible": true
    },
    {
      "courseName": "RYT 800Course photos",
      "date": "22-07-2022",
      "role": "Student",
      "count": 10,
      "isvisible": true
    },
    {
      "courseName": "RYT 800Course photos",
      "date": "22-07-2022",
      "role": "Student",
      "count": 108,
      "isvisible": true
    }



  ]
  displayedColumns: string[] = ["courseName", "date", "role", "count", "isvisible"];

  dataSource: any;

  // displayedColumns: string[] = ["image","Galleryname","DateOfCreation",'numOfPhotos','status', 'view'];

  constructor(
    public dialog: MatDialog,
    public router: Router,
  ) { }

  ngOnInit(): void {
     
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
  createGallery() {
    this.dialog.open(CreateGalleryComponent);
  }
  updatePagination() {

    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort;

  }

  onEditRole(element:any){

  }
  onDeleteRole(element:any){

  }
  onVisibleRole(element:any){

  }



}
