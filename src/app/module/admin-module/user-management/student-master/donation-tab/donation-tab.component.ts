import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from 'src/app/data/services/admin-module/user-management/student-master/student.service';

@Component({
  selector: 'app-donation-tab',
  templateUrl: './donation-tab.component.html',
  styleUrls: ['./donation-tab.component.css']
})
export class DonationTabComponent implements OnInit {
  @Input() student: any;
  donationData: any;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  filterData: any;
  donationsColumns: string[] = ['SNo', 'date', 'description', "modeOfPayment", "donationAmount"];

  gridData = [];
  dataSource!: MatTableDataSource<any>;
  pageno: number = 1;

  constructor(
    private service: StudentService

  ) { }

  ngOnInit(): void {
    this.filterData = {
      filterColumnNames: this.donationsColumns.map(ele => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };
  }

  ngOnChanges() {
    this.donationAPI()
  }

  onpaginatechange(event: any) {
    if (event.pageIndex === 0) {
      this.pageno = 1
      return
    }
    this.pageno = (event.pageIndex * event.pageSize) + 1
    return
  }

  renderTableDate(data: any) {
    this.dataSource = new MatTableDataSource<any>(data)
    this.filterData.gridData = data;
    this.filterData.dataSource = this.dataSource;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.filterData.sort = this.sort;
    for (let col of this.filterData.filterColumnNames) {
      col.Value = '';
    }
  }
  updatePagination() {
    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort
  }

  donationAPI() {
    const body = {
      "studentId": this.student.studentId,
      "name": this.student.name
    }
    this.service.getDonationById(body).subscribe({
      next: (response) => {
        this.donationData = response;
        this.donationData = this.donationData.reverse()
        console.log(this.donationData);
        this.renderTableDate(this.donationData)

      },
      error: (error) => {

      }
    });
  }
}
