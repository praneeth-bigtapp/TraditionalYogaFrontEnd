import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs';
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

  displayedColumns: string[] = ['classMediaId', 'date', 'typeOfClass', "noOfMediaFiles", "Action"];
  dataSource: any;
  disableSelect = new FormControl(false);
  dataForm!: FormGroup
  dateForm!: FormGroup
  data: any
  courses: any

  filterData: any;
  categoryerror: boolean = false
  gridData = [];
  selectedmember!: any
  formtype: string = "Members"
  // data: any;
  displaycontent: boolean = false

  constructor(private formbuilder: FormBuilder, private services: ServicesService) {

    this.dateForm = this.formbuilder.group({


      date: [null, Validators.compose([])],
      checkbox: [null, Validators.compose([])],

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

  ngOnInit(): void {


    this.getalldata()
    this.getallcourse()
  }
  getalldata() {
    this.services.getMediadetails().subscribe({
      next: (response) => {
        this.data = response;
        console.log(this.data);

      },
      error: (error) => {
        console.error(error.message);
      }
    });

  }
  getallcourse() {
    this.services.getcoursesdetails().subscribe({
      next: (response) => {

        this.courses = response
        console.log(this.courses);

      },
      error: (error) => {
        console.error(error.message);
      }
    });

  }
  datefilter() {
    const { date, checkbox } = this.dateForm.value

    let filterData = this.data
    console.log({ date, checkbox });

    if (date)
      filterData = filterData.filter((ele: any) => ele.date === date)

    if (checkbox)
      filterData = filterData.filter((ele: any) => ele.courseId === checkbox)

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

  viewclassmedia(element: any) {
    console.log(element);

  }
  editmedia(element: any) {
    console.log(element);

  }



}
