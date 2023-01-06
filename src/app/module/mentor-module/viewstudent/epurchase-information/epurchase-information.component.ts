import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from 'src/app/data/services/admin-module/user-management/student-master/student.service';

@Component({
  selector: 'app-epurchase-information',
  templateUrl: './epurchase-information.component.html',
  styleUrls: ['./epurchase-information.component.css']
})
export class EpurchaseInformationComponent implements OnInit {
  @Input() student: any;
  donationData: any;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  filterData: any;
  ePurchasesColumns: string[] = ['SNo', 'date', 'purchaseAmount', 'productPurchase'];

  gridData = [];
  dataSource!: MatTableDataSource<any>;
  pageno: number = 1;
  ePurchasesdata: any;

  constructor(
    private service: StudentService

  ) { }

  ngOnInit(): void {
    this.filterData = {
      filterColumnNames: this.ePurchasesColumns.map(ele => ({ "Key": ele, "Value": "" })),
      gridData2: this.gridData,
      dataSource2: this.dataSource,
      paginator2: this.paginator,
      sort2: this.sort
    };
  }

  ngOnChanges() {
    this.getPurchase()
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

  getPurchase() {
    const data = {
      "studentId": this.student.studentId,
      "name": this.student.name
    }
    this.service.getPurchaseById(data).subscribe({
      next: (response) => {

        this.ePurchasesdata = response;
        this.ePurchasesdata = this.ePurchasesdata.reverse()
        this.renderTableDate(this.ePurchasesdata)

      },
      error: (error) => {
        console.error(error);

      }
    });
  }


}
