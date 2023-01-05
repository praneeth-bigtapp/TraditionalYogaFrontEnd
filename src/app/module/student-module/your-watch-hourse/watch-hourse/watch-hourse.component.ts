import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-watch-hourse',
  templateUrl: './watch-hourse.component.html',
  styleUrls: ['./watch-hourse.component.css']
})
export class WatchHourseComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator1!: MatPaginator;
  @ViewChild(MatPaginator, { static: false }) paginator2!: MatPaginator;
  @ViewChild(MatPaginator, { static: false }) paginator3!: MatPaginator;
  
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatSort, { static: false }) sort2!: MatSort;
  @ViewChild(MatSort, { static: false }) sort3!: MatSort;
  gridData: any;
  filterData: any

  gridData2: any;
  filterData2: any

  tableData:any;
  tablefilterData:any;


  tabledata = [
    {
      "sno": "1",
      "dateandtime": "21-07-2022 15:34:20",
      "discriptionofpractice": "Video Name",
      "section": "Satara",
      "attendedscreentime": "1Hour",     
    },
    {
      "sno": "2",
      "dateandtime": "22-07-2022 15:34:20",
      "discriptionofpractice": "Video Name",
      "section": "Asana",
      "attendedscreentime": "1Hour",     
    },
    {
      "sno": "3",
      "dateandtime": "23-07-2022 15:34:20",
      "discriptionofpractice": "Video Name",
      "section": "Satara",
      "attendedscreentime": "1Hour",     
    },
    {
      "sno": "4",
      "dateandtime": "24-07-2022 15:34:20",
      "discriptionofpractice": "Video Name",
      "section": "Asana",
      "attendedscreentime": "1Hour",     
    }
  ]



  data = [
    {     
      "sno": "1",
      "dateofclass": "21-07-2022",
      "type": "Live Class",
      "totalscreentime": "1Hour",
      "attendedscreentime": "1Hour",
      "percentage": "80%"
    },
    {
      "sno": "2",
      "dateofclass": "22-07-2022",
      "type": "Practice Session",
      "totalscreentime": "2Hours",
      "attendedscreentime": "2Hours",
      "percentage": "90%"
    },
    {
      "sno": "3",
      "dateofclass": "23-07-2022",
      "type": "Live Class",
      "totalscreentime": "3Hours",
      "attendedscreentime": "3Hours",
      "percentage": "70%"
    },
    {
      "sno": "4",
      "dateofclass": "24-07-2022",
      "type": "Practice Session",
      "totalscreentime": "4Hours",
      "attendedscreentime": "4Hours",
      "percentage": "60%"
    }



  ]

  data2 = [
    {     
      "sno": "1",
      "dateofclass": "21-07-2022",
      "type": "Short Videos",
      "totalscreentime": "1Hour",
      "attendedscreentime": "1Hour",
      "percentage": "80%"
    },
    {
      "sno": "2",
      "dateofclass": "22-07-2022",
      "type": "Short Videos",
      "totalscreentime": "2Hours",
      "attendedscreentime": "2Hours",
      "percentage": "90%"
    },
    {
      "sno": "3",
      "dateofclass": "23-07-2022",
      "type": "Short Videos",
      "totalscreentime": "3Hours",
      "attendedscreentime": "3Hours",
      "percentage": "70%"
    },
    {
      "sno": "4",
      "dateofclass": "24-07-2022",
      "type": "Short Videos",
      "totalscreentime": "4Hours",
      "attendedscreentime": "4Hours",
      "percentage": "60%"
    }



  ]
  displayedColumns: string[] = ["sno","dateofclass", "type", "totalscreentime", "attendedscreentime", "percentage"];
  displayedColumns2: string[] = ["sno","dateofclass", "type", "totalscreentime", "attendedscreentime", "percentage"];
  displayedFilter: string[] = ["sno","dateandtime","discriptionofpractice","section","attendedscreentime"];

  dataSource: any;
  dataSource2: any;
  datafilter:any;


  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>(this.data)
    this.filterData = {
      filterColumnNames: this.displayedColumns.map(ele => ({ "Key": "", "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator1,
      sort: this.sort
    };


    // this.filterData.gridData = this.data;
    // this.filterData.dataSource = this.dataSource;
    // this.dataSource.paginator = this.paginator1;
    // this.dataSource.sort = this.sort;
    // this.filterData.sort = this.sort;
    for (let col of this.filterData.filterColumnNames) {
      col.Value = '';
    }

    
    this.datafilter = new MatTableDataSource<any>(this.tabledata)
    this.tablefilterData = {
      filterColumnNames: this.displayedColumns.map(ele => ({ "Key": "", "Value": "" })),
      tableData: this.tableData,
      datafilter: this.datafilter,
      paginator: this.paginator3,
      sort: this.sort3
    };


    // this.tablefilterData.tableData = this.tableData;
    // this.tablefilterData.datafilter = this.datafilter;
    // this.datafilter.paginator = this.paginator3;
    // this.datafilter.sort = this.sort;
    // this.tablefilterData.sort = this.sort;
    for (let col of this.tablefilterData.filterColumnNames) {
      col.Value = '';
    }
    
  }

  ngAfterViewInit() {
    this.filterData.dataSource.paginator = this.paginator1;
    this.filterData.dataSource.sort = this.sort;

   

  }

  updatePagination() {

    this.filterData.dataSource.paginator = this.paginator1;
    this.filterData.dataSource.sort = this.sort;

  }

  updatePage(){
    this.tablefilterData.datafilter.paginator = this.paginator3;
    this.tablefilterData.datafilter.sort = this.sort;
  }

}
