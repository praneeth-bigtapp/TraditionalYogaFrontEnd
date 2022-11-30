import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MemberService } from '../services/member.service';

@Component({
  selector: 'app-memberspage',
  templateUrl: './memberspage.component.html',
  styleUrls: ['./memberspage.component.css']
})
export class MemberspageComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  selection = new SelectionModel<any>(true, []);


  filterData: any;
  categoryerror: boolean = false
  gridData = [];
  dataSource: any;
  displayedColumns: string[] = ['SNo', 'Image', 'Name', "Email_id", "Country", "Gender", "Mentor", "Senior_Mentor", "View_Profile", "View_Course_Activity", "Manage_Exemptions", "Checkbox"];
  selectedmember!: any
  formtype: string = "Members"
  // data: any;
  displaycontent: boolean = false

  data: any = [
    {
      'SNo': "1",
      'Image': "Image",
      "Name": "Karthik",
      "Email_id": "karthik@gmail.com",
      "Country": "India",
      "Gender": "Male",
      "Mentor": "Suresh",
      "Senior_Mentor": "Ramesh",

    }, {
      'SNo': "2",
      'Image': "Image",
      "Name": "Ajay",
      "Email_id": "ajay@gmail.com",
      "Country": "India",
      "Gender": "Male",
      "Mentor": "Suresh",
      "Senior_Mentor": "Ramesh",

    },
  ]


  category!: string
  courselist!: any
  memberform!: FormGroup

  agelist = Array.from({ length: 10 }, (_, i) => i + 18)

  countryList = ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas (the)", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia (Plurinational State of)", "Bonaire, Sint Eustatius and Saba", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory (the)", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Cayman Islands (the)", "Central African Republic (the)", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands (the)", "Colombia", "Comoros (the)", "Congo (the Democratic Republic of the)", "Congo (the)", "Cook Islands (the)", "Costa Rica", "Croatia", "Cuba", "Cura\xe7ao", "Cyprus", "Czechia", "C\xf4te d'Ivoire", "Denmark", "Djibouti", "Dominica", "Dominican Republic (the)", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Falkland Islands (the) [Malvinas]", "Faroe Islands (the)", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories (the)", "Gabon", "Gambia (the)", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and McDonald Islands", "Holy See (the)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea (the Democratic People's Republic of)", "Korea (the Republic of)", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic (the)", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands (the)", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia (Federated States of)", "Moldova (the Republic of)", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands (the)", "New Caledonia", "New Zealand", "Nicaragua", "Niger (the)", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands (the)", "Norway", "Oman", "Pakistan", "Palau", "Palestine, State of", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines (the)", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Republic of North Macedonia", "Romania", "Russian Federation (the)", "Rwanda", "R\xe9union", "Saint Barth\xe9lemy", "Saint Helena, Ascension and Tristan da Cunha", "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin (French part)", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten (Dutch part)", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "Sudan (the)", "Suriname", "Svalbard and Jan Mayen", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands (the)", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates (the)", "United Kingdom of Great Britain and Northern Ireland (the)", "United States Minor Outlying Islands (the)", "United States of America (the)", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela (Bolivarian Republic of)", "Viet Nam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe", "\xc5land Islands"];
  constructor(
    private memberservice: MemberService,
    private _formbuilder: FormBuilder,
  ) {

    this.memberform = this._formbuilder.group({
      name: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      country: [null, Validators.compose([Validators.required])],
      mobile: [null, Validators.compose([Validators.required,])],
      region: [null, Validators.compose([Validators.required])],
      agefrom: [null, Validators.compose([Validators.required])],
      ageto: [null, Validators.compose([Validators.required])],
      gender: [null, Validators.compose([Validators.required])],
      status: [null, Validators.compose([Validators.required])],
      usertype: [null, Validators.compose([Validators.required])],
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
  updatePagination(col: any) {

    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {

    this.memberservice.getallcourses().subscribe({
      next: (response) => {
        this.courselist = response

      },
      error: (error) => {
        console.error(error.message);

      }
    })
  }
  ngAfterViewInit() {
    this.filterData.dataSource.paginator = this.paginator;
  }

  gobutton(): void {
    this.coursechange()

    if (this.category) {
      this.displaycontent = true

    }

  }

  formswich(name: string) {
    this.formtype = name
    console.log(this.selection.selected);

  }

  coursechange() {
    this.displaycontent = false
    this.categoryerror = false
    if (this.category == undefined || this.category == null) {
      this.categoryerror = true

    }

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

  viewprofile(data: any) {
    console.log(data);

  }

  viewcourseactivity(data: any) {
    console.log(data);

  }

  viewexemption(data: any) {
    console.log(data);

  }

  selectmember(event: any, data: any) {


    console.log(data);

  }

  downloadexcel() {

  }

  memberformsubmit() {

    if (this.memberform.invalid)
      return this.memberform.markAllAsTouched()

    const formvalue = this.memberform.value

    console.log(formvalue);


    if (this.formtype == "Members") {
      // memberform
      console.log("memberform");

      return
    }

    if (this.formtype == "Mentor Mapping") {
      // member mapping form
      console.log("mentor mapping form");

      return
    }


    if (this.formtype == "Chief Mentor Mapping") {
      console.log("Chief mentor mapping form");

      // Chief mapping form
      return
    }





  }
}
