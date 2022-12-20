import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { log } from 'console';

import { startWith,map, Observable } from 'rxjs';
import { MappingRegionsToChiefMentorService } from '../services/mapping-regions-to-chief-mentor.service';

@Component({
  selector: 'app-mapping-regions-to-chief-mentor',
  templateUrl: './mapping-regions-to-chief-mentor.component.html',
  styleUrls: ['./mapping-regions-to-chief-mentor.component.css']
})
export class MappingRegionsToChiefMentorComponent implements OnInit {
  courses:any
  courseList:any
  regions:any
  regionList:any
 
  searchform!: FormGroup
//  data:any

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  gridData = [];
  dataSource: any;
  displayedColumns: string[] = ['SNo', 'Regionname', 'Chiefmentorname', "Chiefmentorid",'Action'];
  filterData:any
  displaycontent=false
  // countryList = ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas (the)", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia (Plurinational State of)", "Bonaire, Sint Eustatius and Saba", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory (the)", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Cayman Islands (the)", "Central African Republic (the)", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands (the)", "Colombia", "Comoros (the)", "Congo (the Democratic Republic of the)", "Congo (the)", "Cook Islands (the)", "Costa Rica", "Croatia", "Cuba", "Cura\xe7ao", "Cyprus", "Czechia", "C\xf4te d'Ivoire", "Denmark", "Djibouti", "Dominica", "Dominican Republic (the)", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Falkland Islands (the) [Malvinas]", "Faroe Islands (the)", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories (the)", "Gabon", "Gambia (the)", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and McDonald Islands", "Holy See (the)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea (the Democratic People's Republic of)", "Korea (the Republic of)", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic (the)", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands (the)", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia (Federated States of)", "Moldova (the Republic of)", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands (the)", "New Caledonia", "New Zealand", "Nicaragua", "Niger (the)", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands (the)", "Norway", "Oman", "Pakistan", "Palau", "Palestine, State of", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines (the)", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Republic of North Macedonia", "Romania", "Russian Federation (the)", "Rwanda", "R\xe9union", "Saint Barth\xe9lemy", "Saint Helena, Ascension and Tristan da Cunha", "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin (French part)", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten (Dutch part)", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "Sudan (the)", "Suriname", "Svalbard and Jan Mayen", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands (the)", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates (the)", "United Kingdom of Great Britain and Northern Ireland (the)", "United States Minor Outlying Islands (the)", "United States of America (the)", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela (Bolivarian Republic of)", "Viet Nam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe", "\xc5land Islands"];
  countryfilter !: Observable<any>
  data=[{'SNo':"1", 'Regionname':"india", 'Chiefmentorname':"kumar", "Chiefmentorid":"102"},
  {'SNo':"2", 'Regionname':"USA", 'Chiefmentorname':"kumar", "Chiefmentorid":"102"},
  {'SNo':"3", 'Regionname':"india", 'Chiefmentorname':"arun", "Chiefmentorid":"104"},
  {'SNo':"4", 'Regionname':"india", 'Chiefmentorname':"kumar", "Chiefmentorid":"102"},
  {'SNo':"5", 'Regionname':"india", 'Chiefmentorname':"kumar", "Chiefmentorid":"103"},
  {'SNo':"6", 'Regionname':"india", 'Chiefmentorname':"kumar", "Chiefmentorid":"102"},
  {'SNo':"7", 'Regionname':"india", 'Chiefmentorname':"kumar", "Chiefmentorid":"102"}]

  constructor(private formbuilder:FormBuilder,private service:MappingRegionsToChiefMentorService) { }

  ngOnInit(): void {
  
    this.searchform = this.formbuilder.group({

      courses: [null, Validators.compose([Validators.required])],
      mentorname: [null, Validators.compose([Validators.required])],
      mentorid: [null, Validators.compose([Validators.required])],
      regionname:[null, Validators.compose([Validators.required])],
     
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
 this.getCoursesList()
   this. getallData() 
   this.getRegionList()
  }
  getallData() {
    this.service.getCheifmentorAll().subscribe({
      next: (response) => {
        this.courses = response;
        
        console.log(this.courses);
        

      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }
  // getCheifmentors() {
  //   this.service.getCheifmentorAll().subscribe({
  //     next: (response) => {
  //       this.courses = response;
        
  //       console.log(this.courses);
        

  //     },
  //     error: (error) => {
  //       console.error(error.message);
  //     }
  //   });
  // }
  getCoursesList(){
    this.service.getcoursesdetails().subscribe({
      next: (response) => {
        this.courseList = response;
        
        console.log(this.courseList);
        

      },
      error: (error) => {
        console.error(error.message);
      }
    });

  }
  getRegionList(){
    this.service.getregion().subscribe({
      next: (response) => {
        this.regionList = response;
        
        console.log(this.regionList);
        

      },
      error: (error) => {
        console.error(error.message);
      }
    });

  }
  searchby(){
   
  
    // let filters = this.data.filter((ele: any) => ele.Chiefmentorname === this.searchform.value.mentorname && ele.Chiefmentorid === this.searchform.value.mentorid && ele.Regionname === this.searchform.value.regionname)
    // let filterdata = this.data

    

    // if (this.searchform.value.regionname)
    //   filterdata = filterdata.filter((ele: any) => ele.Regionname.toLowerCase() === this.searchform.value.regionname.toLowerCase())

    // if (this.searchform.value.mentorname)
    // filterdata = filterdata.filter((ele: any) => ele.Chiefmentorname.toLowerCase() === this.searchform.value.mentorname.toLowerCase())
      

    // if (this.searchform.value.mentorid)
    //   filterdata = filterdata.filter((ele: any) => ele.Chiefmentorid.toLowerCase() === this.searchform.value.mentorid.toLowerCase())

    

    // this.dataSource = new MatTableDataSource<any>(filterdata)
    // this.filterData.gridData = filterdata;
    // this.filterData.dataSource = this.dataSource;
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    // this.filterData.sort = this.sort;
    // for (let col of this.filterData.filterColumnNames) {
    //   col.Value = '';
    // }
   
  }
  updatePagination() {

    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort=this.sort
  }
  add(){
    this.displaycontent=!this.displaycontent

  }
  revert(){
    this.displaycontent=false
  }

  viewDetails(element:any){

  }
  editdetails(element:any){
    this.displaycontent=true
    this.searchform.setValue({

      courses: '',
      mentorname: 'Chiefmentorname',
      mentorid: 'Chiefmentorid',
      regionname:'Regionname',
     
    })

  }
  deletedetails(element:any){
    
  }
}
