import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BannerviewService } from '../service/bannerview.service';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {
  displayedColumns: string[] = ['bannerId', 'bannerName', 'categoryId', "date", "Action"];
  iseditable: boolean = false
  dataSource: any;
  filterData:any;
  gridData:any;
  data!: any;
  checks=false;
  headerbannerform!: FormGroup
  coursebanner!: FormGroup
  filerror!: boolean
  filerror2!: boolean
  coursefile!: any
  headerfile!: any
  displaycontent: boolean = false
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  selection = new SelectionModel<any>(true, []);
  optionscontrol: any;
  
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    updatePagination() {

      this.filterData.dataSource.paginator = this.paginator;
      this.filterData.dataSource.sort = this.sort;
    }
    reseteditable() {
      // this.addCourseForm.reset()
      this.iseditable = false
      this.displaycontent = !this.displaycontent
    }
    onfilechange(event: any, formname: string) {

      // if (formname === 'headerform')
      // {
      //   this.filerror = this.headerbannerform.value.bannerimage === null ? true : false
      // this.headerfile = event.target.files[0].name
      // }
  
      if (formname === 'courseform') {
        this.filerror2 = this.coursebanner.value.coursebannerimage === null ? true : false
        this.coursefile = event.target.files[0].name
      }
  
    }

  constructor(
    private banner: BannerviewService,
    private router: Router,
   
    private formBuilder: FormBuilder,
 
 
  ) { }

  addcourse() {
    this.displaycontent = !this.displaycontent
  }

  ngOnInit(): void {
    this.filterData = {
      filterColumnNames: this.displayedColumns.map(ele => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    }
    this.getBanner();

    this.headerbannerform = this.formBuilder.group({
      bannerimage: [
        null,
        Validators.compose([Validators.required])
      ],
      description: [
        null,
        Validators.compose([Validators.required])
      ],
      others: this.optionscontrol
    })

    this.coursebanner = this.formBuilder.group({
      coursebannerimage: [
        null,
        Validators.compose([Validators.required])
      ],
      coursetitle: [
        null,
        Validators.compose([Validators.required])
      ],
      description: [
        null,
        Validators.compose([Validators.required])
      ],
      fromdate: [
        null,
        Validators.compose([Validators.required])
      ],
      todate: [
        null,
        Validators.compose([Validators.required])
      ]
    })
  }
 

  getBanner() {
    this.banner.getbanner().subscribe({
      next: (response) => {
        this.data = response
        for (let data of this.data) {
          data.check = false;
        }
        console.log(this.data);

        // this.dataSource = new MatTableDataSource<any>(this.data)
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
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
    });
  }
  ngAfterViewInit() {
    this.filterData.dataSource.paginator = this.paginator;

  }

  checkAll(e:any) {
    // console.log(status.value);
    // for (let data of this.data) {
    //   data.check = true;
    // }
    // console.log(this.data);
    // this.dataSource = new MatTableDataSource<any>(this.data)
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    if(e.target.checked==true){
      this.checks=true;
        }
        else{
          this.checks=false;
        }

  }

  onAddBanner() {
    this.router.navigateByUrl("addbanner");
  }
 
  
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach((row: any) => this.selection.select(row));
  }

}
