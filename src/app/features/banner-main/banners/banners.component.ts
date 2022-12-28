import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BannerviewService } from '../service/bannerview.service';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogPopupComponent } from 'src/app/shared/dialog-popup/dialog-popup.component';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {
  displayedColumns: string[] = ['bannerId', 'bannerName', 'categoryId', "dateOfAdd", "Status", "Action"];
  issubmit: boolean = true
  iseditable: boolean = false
  dataSource: any;
  filterData: any;
  gridData: any;
  data!: any;
  checks = false;
  // headerbannerform!: FormGroup
  coursebanner!: FormGroup
  filerror!: boolean
  filerror2: boolean = false
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
    this.coursebanner.reset()
    this.iseditable = false
    this.displaycontent = !this.displaycontent
    this.issubmit = true
    this.filerror2 = false
  }
  onfilechange(event: any) {

    this.filerror2 = this.coursebanner.value.coursebannerimage === null ? true : false
    if (event === null)
      return

    this.coursefile = event.target.files[0].name
  }

  constructor(
    private banner: BannerviewService,
    private router: Router,

    private formBuilder: FormBuilder,
    private dialog: MatDialog,


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



    this.coursebanner = this.formBuilder.group({
      Id:[null],
      categoryId:[null],
      bannername:[null],
      
      
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
      ],
      dateofadd:[null],
      createdby:[null],
      createddate:[null],
      updateby:[null],
      updatedate:[null],
      isactive:[null]
   
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
      }
    });
  }
  // ngAfterViewInit() {
  //   this.filterData.dataSource.paginator = this.paginator;

  // }

  checkAll(e: any) {
    // console.log(status.value);
    // for (let data of this.data) {
    //   data.check = true;
    // }
    // console.log(this.data);
    // this.dataSource = new MatTableDataSource<any>(this.data)
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    if (e.target.checked == true) {
      this.checks = true;
    }
    else {
      this.checks = false;
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

  viewdetails(element: any) {
    this.coursebanner.setValue({
      dateofadd:element.dateOfAdd,
      createdby:element.createdBy,
      createddate:element.createdDate,
      updateby:element.updateBy,
      updatedate:element.updateDate,
      isactive:element.isActive,
      Id:element.bannerId,
      coursetitle: element.courseTitle,
      // coursebannerimage: element.imagePath,
      coursebannerimage:"",
      bannername:element.bannerName,

      fromdate: formatDate(element.fromDate, "yyyy-MM-dd", 'en'),
      todate: formatDate(element.toDate, "yyyy-MM-dd", 'en'),
      description: element.description,
      categoryId:element.categoryId
    });
    this.issubmit = false
    this.displaycontent = true
  }
  editdetails(element: any) {
    console.log(element)
    this.coursebanner.setValue({
      dateofadd:element.dateOfAdd,
      createdby:element.createdBy,
      createddate:element.createdDate,
      updateby:element.updateBy,
      updatedate:element.updateDate,
      isactive:element.isActive,
   
      Id:element.bannerId,
      coursetitle: element.courseTitle,
      // coursebannerimage: element.imagePath,
      coursebannerimage:"",

      bannername:element.bannerName,
      fromdate: formatDate(element.fromDate, "yyyy-MM-dd", 'en'),
      todate: formatDate(element.toDate, "yyyy-MM-dd", 'en'),
      description: element.description,
      categoryId:element.categoryId

      
    });
    this.iseditable = true
    this.displaycontent = true
    this.issubmit = true
  }

  bannersubmit() {
    this.onfilechange(null)

    if (this.coursebanner.invalid)
      return this.coursebanner.markAllAsTouched()
  }


  addbaners() {

    if (this.coursebanner.invalid)
      return this.coursebanner.markAllAsTouched()

    const body = {
    
      "bannerName":"",
      "courseTitle": this.coursebanner.value.coursetitle,
      "imagePath": this.coursebanner.value.coursebannerimage,
      

      "fromDate": formatDate(this.coursebanner.value.fromdate,"yyyy-MM-dd", 'en'),
      "toDate":formatDate (this.coursebanner.value.todate,"yyyy-MM-dd", 'en'),
      "description": this.coursebanner.value.description,
      "categoryId": 1
    }
      if (this.iseditable) {
        //editable
        // const name = this.data.filter((ele: any) => ele.content.content === Content)[0].givenByName.description
  const body={
   
    "bannerId": this.coursebanner.value.Id,
 
    "bannerName":this.coursebanner.value. bannername,
    "courseTitle":  this.coursebanner.value.coursetitle,
    "imagePath":this.coursebanner.value.coursebannerimage,
    "fromDate": formatDate(this.coursebanner.value.fromdate,"yyyy-MM-dd", 'en'),
    "toDate": formatDate (this.coursebanner.value.todate,"yyyy-MM-dd", 'en'),
    "description": this.coursebanner.value.description,
    "categoryId": 1,
    "dateOfAdd": this.coursebanner.value.dateOfadd,
    "createdBy":  this.coursebanner.value.createdby,
    "createdDate": this.coursebanner.value.createddate,
    "updateBy":  this.coursebanner.value.updateby,
    "updateDate":  this.coursebanner.value.updatedate,
    "isActive":  this.coursebanner.value.isactive,

  }
  
        console.log(body);
  
        this.banner. updatebanner(body).subscribe({
          next: (response) => {
            console.log(response)
            this.coursebanner.reset()
            this.getBanner()
          },
          error: (error) => {
            console.error(error.message);
  
          }
        }) 
        return
     
    }
    console.log(this.coursebanner);
    console.log(body)

    this.banner.postbanner(body).subscribe({
      next: (response) => {
        console.log(response)
        this.coursebanner.reset()

        this.getBanner()

      },
      error: (error) => {
        console.error(error.message);

      }
    })

  }
  deletedetails(Id:any){
    console.log(Id);
    const body = {
      "bannerId": Number(Id) 
    
    }
console.log(body);
    const dialogref = this.dialog.open(DialogPopupComponent, {
      data: {
        title: "Delete Confirmation",
        message: "Are You Sure You Want To Banners ?"
      },
      width: "30%"
    })

    dialogref.afterClosed().subscribe((Id: any) => {
      if (Id) {
        this.banner.deletebanners(body).subscribe({
          next: (response) => {
           console.log(response);
            this.coursebanner.reset()
             this.getBanner()
          },
          error: (error) => {
            console.error(error.message);
          }
        })
        return
      }

    })


  }


}