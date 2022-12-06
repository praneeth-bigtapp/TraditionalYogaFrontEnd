import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { log } from 'console';
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
 data:any

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  gridData = [];
  dataSource: any;
  displayedColumns: string[] = ['SNo', 'Regionname', 'Chiefmentorname', "Chiefmentorid"];
  filterData:any
  displaycontent=true
  constructor(private formbuilder:FormBuilder,private service:MappingRegionsToChiefMentorService) { }

  ngOnInit(): void {
    this.searchform = this.formbuilder.group({


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
   this. getallData() 
  }
  getallData() {
    this.service.getcoursesdetails().subscribe({
      next: (response) => {
        this.courses = response;
        
        console.log(this.courses);
        

      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }
  coursechange(){

  }
  searchby(){
    this.data=[{'SNo':"1", 'Regionname':"india", 'Chiefmentorname':"kumar", "Chiefmentorid":"102"},
    {'SNo':"2", 'Regionname':"USA", 'Chiefmentorname':"kumar", "Chiefmentorid":"102"},
    {'SNo':"3", 'Regionname':"india", 'Chiefmentorname':"arun", "Chiefmentorid":"104"},
    {'SNo':"4", 'Regionname':"india", 'Chiefmentorname':"kumar", "Chiefmentorid":"102"},
    {'SNo':"5", 'Regionname':"india", 'Chiefmentorname':"kumar", "Chiefmentorid":"103"},
    {'SNo':"6", 'Regionname':"india", 'Chiefmentorname':"kumar", "Chiefmentorid":"102"},
    {'SNo':"7", 'Regionname':"india", 'Chiefmentorname':"kumar", "Chiefmentorid":"102"}]
  
    // let filters = this.data.filter((ele: any) => ele.Chiefmentorname === this.searchform.value.mentorname && ele.Chiefmentorid === this.searchform.value.mentorid && ele.Regionname === this.searchform.value.regionname)
    let filterdata = this.data

    

    if (this.searchform.value.regionname)
      filterdata = filterdata.filter((ele: any) => ele.Regionname.toLowerCase() === this.searchform.value.regionname.toLowerCase())

    if (this.searchform.value.mentorname)
    filterdata = filterdata.filter((ele: any) => ele.Chiefmentorname.toLowerCase() === this.searchform.value.mentorname.toLowerCase())
      

    if (this.searchform.value.mentorid)
      filterdata = filterdata.filter((ele: any) => ele.Chiefmentorid.toLowerCase() === this.searchform.value.mentorid.toLowerCase())

    console.log(filterdata);

    this.dataSource = new MatTableDataSource<any>(filterdata)
    this.filterData.gridData = filterdata;
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
  updatePagination(){
    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort;
  }

}
