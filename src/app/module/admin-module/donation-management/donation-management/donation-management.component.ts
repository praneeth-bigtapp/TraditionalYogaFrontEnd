import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DonationserviceService } from 'src/app/data/services/admin-module/donation-management/donation-management.service';

@Component({
  selector: 'app-donation-management',
  templateUrl: './donation-management.component.html',
  styleUrls: ['./donation-management.component.css']
})
export class DonationManagementComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  dateForm!: FormGroup
  filterData: any
  gridData: any
  date: any
  DonorName = 'Donar1'
  pan = "ABCD2574"

  pageno: number = 1

  onpaginatechange(event: any) {
    if (event.pageIndex === 0) {
      this.pageno = 1
      return
    }
    this.pageno = (event.pageIndex * event.pageSize) + 1
    return
  }
  disableSelect = new FormControl(false);
  data: any
  // data: any = [{ 'S_No': '1', 'Date': '12-11-2022', 'DonorName': "ajith", "Country": "India", "Amountdonated": "10500", "currency": "$", "pan": "741APO52" },
  // { 'S_No': '1', 'Date': '11-1-2022', 'DonorName': "ajith", "Country": "India", "Amountdonated": "10500", "currency": "#", "pan": "741APO52" },
  // { 'S_No': '1', 'Date': '12-10-2022', 'DonorName': "ajith", "Country": "USA", "Amountdonated": "10000", "currency": "%", "pan": "741APO52" },
  // { 'S_No': '1', 'Date': '12-12-2022', 'DonorName': "ajith", "Country": "Australia", "Amountdonated": "9000", "currency": "$", "pan": "741APO52" },
  // { 'S_No': '1', 'Date': '12-11-2023', 'DonorName': "ajith", "Country": "India", "Amountdonated": "2000", "currency": "$", "pan": "741APO52" },
  // { 'S_No': '1', 'Date': '11-11-2022', 'DonorName': "ajith", "Country": "India", "Amountdonated": "1000", "currency": "$", "pan": "741APO52" },
  // { 'S_No': '1', 'Date': '12-10-2022', 'DonorName': "ajith", "Country": "USA", "Amountdonated": "1000", "currency": "$", "pan": "741APO52" },
  // { 'S_No': '1', 'Date': '10-10-2022', 'DonorName': "ajith", "Country": "Australia", "Amountdonated": "2500", "currency": "$", "pan": "741APO59" }]



  displayedColumns: string[] = ['S_No', 'date', 'DonorName', "country", "amountDonated", "panNumber", "ViewDetails"];

  total = 0;
  subtotal: number = 0
  countryList: any
  dataSource: any;
  region: any;
  constructor(private formbuilder: FormBuilder, private router: Router, private service: DonationserviceService, private _snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.getallregions()
    this.getallData('')
    this.getallcountry()
    this.dateForm = this.formbuilder.group({

      fromdate: [null, Validators.compose([])],
      todate: [null, Validators.compose([])],
      countrydropdown: null,
      regiondropdown: null,


    })

    // this.dataSource = new MatTableDataSource<any>(this.data)


    this.filterData = {
      filterColumnNames: this.displayedColumns.map(ele => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort,
      total: this.total,
      sub: this.subtotal
    }





  }

  updatePagination() {


    this.subtotal = this.sum(this.filterData.dataSource.filteredData.map((ele: any) => Number(ele.donarId.donationAmount)))


    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort;
    this.filterData.dataSource.sub = this.subtotal




  }
  editdetails(element: any) {

  }


  viewDetails(id: any) {

    this.router.navigate(["viewdonation", id]);
    // this.getallData()
  }
  getdate() {
    let today = new Date()

    this.date = today.getDate() + '-' + today.getMonth() + '-' + today.getFullYear()
    console.log(this.date);

  }
  getallData(variable: any) {

    if (variable != 'full') {
      this.getdate()
    }
    this.service.getdonationdetails().subscribe({
      next: (response) => {
        this.data = response;
        this.data = this.data.reverse()
        this.dataSource = new MatTableDataSource<any>(this.data);
        console.log(this.data)
        this.total = this.sum(this.data.map((ele: any) => Number(ele.donarId.donationAmount)))
        this.subtotal = this.sum(this.data.map((ele: any) => Number(ele.donarId.donationAmount)))
        this.filterData.gridData = this.data;
        this.filterData.dataSource = this.dataSource;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.filterData.sort = this.sort;
        this.filterData.total = this.total;
        this.filterData.sub = this.subtotal;

        for (let col of this.filterData.filterColumnNames) {
          col.Value = '';
        }



      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  sum(data: any) {
    return data.reduce((previousValue: any, currentValue: any) => Number(previousValue) + Number(currentValue), 0)
  }

  basicfilter(filtervalues: any) {
    this.filterData.gridData = filtervalues;
    this.filterData.dataSource = this.dataSource;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.filterData.sort = this.sort;
    this.filterData.total = this.total;
    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort;
    this.filterData.dataSource.sub = this.subtotal
  }



  manualcompare(event: any) {
    let filterdata = this.filterData.dataSource.filteredData && this.data
    let [symbol, value] = [event.target.value[0], event.target.value.slice(1, event.target.value.length)]



    if (event.target.value[1] == '=') {
      [symbol, value] = [event.target.value.slice(0, 2), event.target.value.slice(2, event.target.value.length)]
    }

    console.log(symbol);
    console.log(value);




    if (event.target.value.length === 0) {

      this.dataSource = new MatTableDataSource<any>(filterdata)
      this.basicfilter(filterdata)
      this.subtotal = this.sum(this.filterData.dataSource.filteredData.map((ele: any) => Number(ele.donarId.donationAmount)))

      return
    }

    if (![">", "<", "=", '<=', ">=", "=="].includes(symbol)) {


      filterdata = filterdata.filter((ele: any) => Number(ele.donarId.donationAmount) === Number(event.target.value))
      this.dataSource = new MatTableDataSource<any>(filterdata)
      this.basicfilter(filterdata)
      this.subtotal = this.sum(this.filterData.dataSource.filteredData.map((ele: any) => Number(ele.donarId.donationAmount)))


      return
    }

    if (symbol === "==") {


      filterdata = filterdata.filter((ele: any) => Number(ele.donarId.donationAmount) == value)
    }
    else if (symbol === "=") {
      filterdata = filterdata.filter((ele: any) => Number(ele.donarId.donationAmount) == value)
    }
    else if (symbol === ">=") {
      filterdata = filterdata.filter((ele: any) => Number(ele.donarId.donationAmount) >= value)
    }

    else if (symbol === "<=") {
      filterdata = filterdata.filter((ele: any) => Number(ele.donarId.donationAmount) <= value)
    }
    else if (symbol === "<") {
      filterdata = filterdata.filter((ele: any) => Number(ele.donarId.donationAmount) < value)
    }
    else if (symbol === ">") {

      filterdata = filterdata.filter((ele: any) => Number(ele.donarId.donationAmount) > value)
    }

    console.log(filterdata);

    this.dataSource = new MatTableDataSource<any>(filterdata)
    this.basicfilter(filterdata)
    this.subtotal = this.sum(this.filterData.dataSource.filteredData.map((ele: any) => Number(ele.donarId.donationAmount)))

  }

  getallregions() {
    this.service.getregions().subscribe({
      next: (response) => {
        this.region = response;
        // this.dataSource = new MatTableDataSource<any>(this.data);
        console.log(this.region);


      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }
  getallcountry() {
    this.service.getcountrys().subscribe({
      next: (response) => {
        this.countryList = response;
        // this.dataSource = new MatTableDataSource<any>(this.data);
        if (this.dateForm.value.regiondropdown != null) {
          this.countryList = this.countryList.filter((ele: any) => ele.regionId.regionId === this.dateForm.value.regiondropdown)
        }
        console.log(this.countryList);


      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  filterDate() {
    // this.getallData('full')

    const fromdate = this.dateForm.value.fromdate
    const region = this.dateForm.value.regiondropdown
    const country = this.dateForm.value.countrydropdown

    const todate = this.dateForm.value.todate
    console.log(fromdate, todate)
    console.log(this.data)
    console.log(region);
    let filters = this.data
    if (fromdate !== null && todate !== null) {
      filters = this.data.filter((ele: any) => new Date(ele.date) >= new Date(fromdate) && new Date(ele.date) <= new Date(todate))
    }
    console.log(filters)
    // if (fromdate !== null && todate !== null) {
    if (region !== null) {
      filters = this.regionfilter(filters)
    }
    if (country !== null) {
      filters = this.countryfilter(filters)
    }
    this.dataSource = new MatTableDataSource<any>(filters)
    this.basicfilter(filters)
    this.filterData.dataSource.sort = this.sort;
    this.filterData.dataSource.sub = this.subtotal
    this.subtotal = this.sum(this.filterData.dataSource.filteredData.map((ele: any) => Number(ele.donarId.donationAmount)))
    // }
    this.updatePagination()

  }
  regionfilter(element: any) {
    let reg = element.filter((ele: any) => ele.donarId.countryId.regionId.regionId === this.dateForm.value.regiondropdown)
    return reg
  }
  countryfilter(element: any) {
    let reg = element.filter((ele: any) => ele.donarId.countryId.countryName === this.dateForm.value.countrydropdown)
    return reg
  }

  openSnackBar(data: any) {
    this._snackBar.open(data.message, 'Close', {
      duration: 2 * 1000,
    });
  }

  deletedetails(id: any) {

    // const body = {
    //   "coursesId": id
    // }

    // const dialogref = this.dialog.open(DialogPopupComponent, {
    //   data: {
    //     title: "Delete Confirmation",
    //     message: "Are You Sure You Want To Delete this Course ?"
    //   },
    //   width: "30%",
    // height:"25%"
    // })

    // dialogref.afterClosed().subscribe(data => {
    //   if (data) {
    //     this.AddCourseService.deletecourse(body).subscribe({
    //       next: (response) => {
    //         this.openSnackBar(response)
    //         this.addCourseForm.reset()
    //         this.getdata()
    //       },
    //       error: (error) => {
    //         console.error(error.message);
    //       }
    //     })
    //     return
    //   }

    // })



  }
}
