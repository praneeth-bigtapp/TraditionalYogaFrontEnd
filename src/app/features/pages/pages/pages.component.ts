import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  selection = new SelectionModel<any>(true, []);
  data = [{ "Pagename": "About US", "Author": 'admin', 'Dateofpublish': '02,Aug,2022, 12:30:37',"lastmodified":'02,Aug,2022, 12:30:37', "link": "https://tradiationalyoga.co.in/aboutus", "status": "published" },
  { "Pagename": "About US1", "Author": 'admin', 'Dateofpublish': '02,Aug,2022, 12:30:37',"lastmodified":'02,Aug,2022, 12:30:37', "link": "https://tradiationalyoga.co.in/about", "status1": "published1" },
  { "Pagename": "About US", "Author1": 'admin1', 'Dateofpublish': '02,Aug,2022, 12:30:37',"lastmodified":'03,Aug,2022, 12:30:37', "links": "https://tradiationalyoga.co.in/about", "status": "published" },
  { "Pagename": "About US3", "Author": 'admin', 'Dateofpublish1': '04,Aug,2022, 12:30:37',"lastmodified":'02,Aug,2022, 12:30:37', "link": "https://tradiationalyoga.co.in/about", "status": "published3" },
  { "Pagename": "About US", "Author3": 'admin', 'Dateofpublish': '02,Aug,2022, 12:30:37',"lastmodified":'02,Aug,2022, 12:30:37', "link": "https://tradiationalyoga.co.in/about", "status3": "published" },
  { "Pagename": "About US", "Author": 'admin3', 'Dateofpublish3': '02,Aug,2022, 12:30:37',"lastmodified":'04,Aug,2022, 12:30:37', "linked": "https://tradiationalyoga.co.in/about", "status": "published" },
  { "Pagename": "About US", "Author": 'admin', 'Dateofpublish': '03,Aug,2022, 12:30:37',"lastmodified":'02,Aug,2022, 12:30:37', "link": "https://tradiationalyoga.co.in/about", "status": "published" },
  { "Pagename": "About US", "Author": 'bdmin', 'Dateofpublish': '02,Aug,2022, 12:30:37',"lastmodified":'02,Aug,2022, 12:30:37', "link": "https://tradiationalyoga.co.in/about", "status": "published" }]
  filterData: any
  gridData: any;

  elementvalue={}
  dataSource: any;
  displayedColumns: string[] = ["Checkbox", "Pagename", "Author", 'Dateofpublish','lastmodified', 'link', 'status', 'Action'];

  constructor(private formbuilder: FormBuilder, private router: Router) { }

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
  viewDetails(element: any) {

  }
  updatePagination() {

    this.filterData.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit() {
    this.filterData.dataSource.paginator = this.paginator;

  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.filterData.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.filterData.dataSource.data.forEach((row: any) => this.selection.select(row));
  }
  onEditRole(element:any){
    this.router.navigateByUrl("addpages");
  }
  onRoleDelete(element:any){

  }
  onRoleDraft(element:any){
    this.router.navigateByUrl("addpages");
  }
  onaddpage(){
   this.router.navigateByUrl("addpages");
  }
  onManage(){
    // this.router.navigateByUrl("pages");
  }
}
