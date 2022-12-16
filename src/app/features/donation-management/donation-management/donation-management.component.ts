import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DonationserviceService } from '../service/donationservice.service';

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



  disableSelect = new FormControl(false);
  data: any = [{ 'S_No': '1', 'Date': '12-11-2022', 'DonorName': "ajith", "Country": "India", "Amountdonated": "10500", "currency": "$", "pan": "741APO52" },
  { 'S_No': '1', 'Date': '11-1-2022', 'DonorName': "ajith", "Country": "India", "Amountdonated": "10500", "currency": "#", "pan": "741APO52" },
  { 'S_No': '1', 'Date': '12-10-2022', 'DonorName': "ajith", "Country": "USA", "Amountdonated": "10000", "currency": "%", "pan": "741APO52" },
  { 'S_No': '1', 'Date': '12-12-2022', 'DonorName': "ajith", "Country": "Australia", "Amountdonated": "9000", "currency": "$", "pan": "741APO52" },
  { 'S_No': '1', 'Date': '12-11-2023', 'DonorName': "ajith", "Country": "India", "Amountdonated": "2000", "currency": "$", "pan": "741APO52" },
  { 'S_No': '1', 'Date': '11-11-2022', 'DonorName': "ajith", "Country": "India", "Amountdonated": "1000", "currency": "$", "pan": "741APO52" },
  { 'S_No': '1', 'Date': '12-10-2022', 'DonorName': "ajith", "Country": "USA", "Amountdonated": "1000", "currency": "$", "pan": "741APO52" },
  { 'S_No': '1', 'Date': '10-10-2022', 'DonorName': "ajith", "Country": "Australia", "Amountdonated": "2500", "currency": "$", "pan": "741APO59" }]
  displayedColumns: string[] = ['S_No', 'Date', 'DonorName', "Country", "Amountdonated", "pan", "ViewDetails"];
  total = 0;
  subtotal: number = 0
  countryList = ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas (the)", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia (Plurinational State of)", "Bonaire, Sint Eustatius and Saba", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory (the)", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Cayman Islands (the)", "Central African Republic (the)", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands (the)", "Colombia", "Comoros (the)", "Congo (the Democratic Republic of the)", "Congo (the)", "Cook Islands (the)", "Costa Rica", "Croatia", "Cuba", "Cura\xe7ao", "Cyprus", "Czechia", "C\xf4te d'Ivoire", "Denmark", "Djibouti", "Dominica", "Dominican Republic (the)", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Falkland Islands (the) [Malvinas]", "Faroe Islands (the)", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories (the)", "Gabon", "Gambia (the)", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and McDonald Islands", "Holy See (the)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea (the Democratic People's Republic of)", "Korea (the Republic of)", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic (the)", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands (the)", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia (Federated States of)", "Moldova (the Republic of)", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands (the)", "New Caledonia", "New Zealand", "Nicaragua", "Niger (the)", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands (the)", "Norway", "Oman", "Pakistan", "Palau", "Palestine, State of", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines (the)", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Republic of North Macedonia", "Romania", "Russian Federation (the)", "Rwanda", "R\xe9union", "Saint Barth\xe9lemy", "Saint Helena, Ascension and Tristan da Cunha", "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin (French part)", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten (Dutch part)", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "Sudan (the)", "Suriname", "Svalbard and Jan Mayen", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands (the)", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates (the)", "United Kingdom of Great Britain and Northern Ireland (the)", "United States Minor Outlying Islands (the)", "United States of America (the)", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela (Bolivarian Republic of)", "Viet Nam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe", "\xc5land Islands"];
  dataSource: any;
  region: any;
  constructor(private formbuilder: FormBuilder, private router: Router, private service: DonationserviceService) { }
  countryfilter !: Observable<any>
  ngOnInit(): void {
    this.getallregions()
    // this.getallData()
    this.dateForm = this.formbuilder.group({

      fromdate: [null, Validators.compose([Validators.required])],
      todate: [null, Validators.compose([Validators.required])],
      countrydropdown: [null, Validators.compose([Validators.required])],
      regiondropdown: [null, Validators.compose([Validators.required])],


    })
    this.filterData = {
      filterColumnNames: this.displayedColumns.map(ele => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort,
      total: this.total,
      sub: this.subtotal
    }
    this.total = this.sum(this.data.map((ele: any) => Number(ele.Amountdonated)))
    this.subtotal = this.sum(this.data.map((ele: any) => Number(ele.Amountdonated)))

    this.dataSource = new MatTableDataSource<any>(this.data)
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
    this.countryfilter = this.dateForm.valueChanges.pipe(
      startWith(''),
      map(value => this.countryList.filter(ele => ele.toLowerCase().includes(value.countrydropdown?.toLowerCase()))),
    )



  }
  // ngAfterViewInit() {
  //   this.subtotal = this.sum(this.filterData.dataSource.filteredData.map((ele: any) => Number(ele.Amountdonated)))

  //   this.filterData.dataSource.paginator = this.paginator;


  //   this.filterData.dataSource.sort = this.sort;
  //   this.filterData.dataSource.sub=this.subtotal

  // }
  updatePagination() {


    this.subtotal = this.sum(this.filterData.dataSource.filteredData.map((ele: any) => Number(ele.Amountdonated)))


    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort;
    this.filterData.dataSource.sub = this.subtotal




  }
  editdetails(element: any) {

  }
  deletedetails(element: any) {

  }

  viewDetails(name: any) {
    alert("click");
    this.router.navigateByUrl("viewdonation");
    // this.getallData()
  }
  getallData() {
    this.service.getdonationdetails().subscribe({
      next: (response) => {
        this.data = response;
        this.dataSource = new MatTableDataSource<any>(this.data);



      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  sum(data: any) {
    return data.reduce((previousValue: any, currentValue: any) => Number(previousValue) + Number(currentValue))
  }

  

  manualcompare(event: any) {



    let filterdata = this.filterData.dataSource.filteredData && this.data

    const [symbol, value] = [event.target.value[0], event.target.value.slice(1, event.target.value.length)]

    if (event.target.value.length === 0) {

      this.dataSource = new MatTableDataSource<any>(filterdata)
      this.filterData.gridData = filterdata;
      this.filterData.dataSource = this.dataSource;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.filterData.sort = this.sort;
      this.filterData.total = this.total;
      this.filterData.dataSource.paginator = this.paginator;
      this.filterData.dataSource.sort = this.sort;
      this.filterData.dataSource.sub = this.subtotal
      this.subtotal = this.sum(this.filterData.dataSource.filteredData.map((ele: any) => Number(ele.Amountdonated)))

      return
    }

    if (![">", "<"].includes(symbol)) {


      filterdata = filterdata.filter((ele: any) => Number(ele.Amountdonated) === Number(event.target.value))
      this.dataSource = new MatTableDataSource<any>(filterdata)
      this.filterData.gridData = filterdata;
      this.filterData.dataSource = this.dataSource;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.filterData.sort = this.sort;
      this.filterData.total = this.total;

      this.filterData.dataSource.paginator = this.paginator;
      this.filterData.dataSource.sort = this.sort;
      this.filterData.dataSource.sub = this.subtotal
      this.subtotal = this.sum(this.filterData.dataSource.filteredData.map((ele: any) => Number(ele.Amountdonated)))


      return
    }

    if (symbol === ">") {
      filterdata = filterdata.filter((ele: any) => Number(ele.Amountdonated) >= value)
    }
    else if (symbol === "<") {
      filterdata = filterdata.filter((ele: any) => Number(ele.Amountdonated) <= value)
    }

    this.dataSource = new MatTableDataSource<any>(filterdata)
    this.filterData.gridData = filterdata;
    this.filterData.dataSource = this.dataSource;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.filterData.sort = this.sort;
    this.filterData.total = this.total;
    this.filterData.sub = this.subtotal;
    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort;
    this.filterData.dataSource.sub = this.subtotal
    this.subtotal = this.sum(this.filterData.dataSource.filteredData.map((ele: any) => Number(ele.Amountdonated)))

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

  filterDate() {
    const fromdate = this.dateForm.value.fromdate

    const todate = this.dateForm.value.todate
    console.log(fromdate, todate)
    console.log(this.data)
    let filters = this.data.filter((ele: any) => new Date(ele.Date) >= new Date(fromdate) && new Date(ele.Date) <= new Date(todate))
    console.log(filters)
    if (fromdate !== null && todate !== null) {
      this.dataSource = new MatTableDataSource<any>(filters)
      this.filterData.gridData = filters;
      this.filterData.dataSource = this.dataSource;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.filterData.sort = this.sort;
      this.filterData.total = this.total;
      this.filterData.sub = this.subtotal;
      this.filterData.dataSource.paginator = this.paginator;
      this.filterData.dataSource.sort = this.sort;
      this.filterData.dataSource.sub = this.subtotal
      this.subtotal = this.sum(this.filterData.dataSource.filteredData.map((ele: any) => Number(ele.Amountdonated)))
    }
    this.updatePagination()

  }
}
