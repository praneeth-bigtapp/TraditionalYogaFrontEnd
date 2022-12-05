import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { log } from 'console';

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
  data=[{'SNo':"1", 'Regionname':"india", 'Chiefmentorname':"kumar", "Chiefmentorid":"102"},
  {'SNo':"2", 'Regionname':"USA", 'Chiefmentorname':"kumar", "Chiefmentorid":"102"},
  {'SNo':"3", 'Regionname':"india", 'Chiefmentorname':"arun", "Chiefmentorid":"104"},
  {'SNo':"4", 'Regionname':"india", 'Chiefmentorname':"kumar", "Chiefmentorid":"102"},
  {'SNo':"5", 'Regionname':"india", 'Chiefmentorname':"kumar", "Chiefmentorid":"103"},
  {'SNo':"6", 'Regionname':"india", 'Chiefmentorname':"kumar", "Chiefmentorid":"102"},
  {'SNo':"7", 'Regionname':"india", 'Chiefmentorname':"kumar", "Chiefmentorid":"102"}]

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  gridData = [];
  dataSource: any;
  displayedColumns: string[] = ['SNo', 'Regionname', 'Chiefmentorname', "Chiefmentorid"];
  filterData:any
  displaycontent=true
  constructor(private formbuilder:FormBuilder) { }

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
   
  }
  coursechange(){

  }
  searchby(){
   
    let filters = this.data.filter((ele: any) => ele.Chiefmentorname === this.searchform.value.mentorname && ele.Chiefmentorid === this.searchform.value.mentorid && ele.Regionname === this.searchform.value.regionname)
    
    console.log(filters)
    this.dataSource = new MatTableDataSource<any>(filters);
    
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
