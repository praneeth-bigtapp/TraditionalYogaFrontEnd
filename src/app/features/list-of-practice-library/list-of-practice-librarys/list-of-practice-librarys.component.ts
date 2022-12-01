import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListpraticelibraryService } from '../service/listpraticelibrary.service';

@Component({
  selector: 'app-list-of-practice-librarys',
  templateUrl: './list-of-practice-librarys.component.html',
  styleUrls: ['./list-of-practice-librarys.component.css']
})
export class ListOfPracticeLibrarysComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  filterData: any;
  gridData = [];
  dataSource: any;
  displayedColumns: string[] = ['praticeLibaryId', 'videoLink', "duration", "title", "message", "metaKeyword"];
  data: any;
  constructor(
    private service: ListpraticelibraryService
  ) {
    this.dataSource = new MatTableDataSource<any>(this.data)
    this.filterData = {
      filterColumnNames: this.displayedColumns.map(ele => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };

    this.service.getpraticelibrary().subscribe({
      next: (response) => {
        this.data = response
        console.log(response);

        this.dataSource = new MatTableDataSource<any>(this.data)
        this.filterData.gridData = this.data;
        this.filterData.dataSource = this.dataSource;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.filterData.sort = this.sort;
        for (let col of this.filterData.filterColumnNames) {
          col.Value = '';
        }


      },
      error: (error) => {
        console.error(error.message);

      }
    })


  }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.filterData.dataSource.paginator = this.paginator;

  }
  updatePagination(col: any) {
    this.filterData.dataSource.paginator = this.paginator;

    this.dataSource.paginator = this.paginator;
  }

}
