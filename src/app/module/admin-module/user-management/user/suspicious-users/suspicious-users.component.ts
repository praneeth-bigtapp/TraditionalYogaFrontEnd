import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserFilterService } from 'src/app/data/services/admin-module/user-management/user/user-filter/user-filter.service';
import { RegistrationService } from 'src/app/data/services/student-module/registration/registration.service';

@Component({
  selector: 'app-suspicious-users',
  templateUrl: './suspicious-users.component.html',
  styleUrls: ['./suspicious-users.component.css']
})
export class SuspiciousUsersComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  dataSource: any;
  filterData: any
  gridData: any;
  pageno: number = 1;
  displayedColumns: string[] = ['sno', 'image', 'name', "emailId", "country", "Gender", "usersince", "status",];
  data !: any
  filterOption!: FormGroup




  constructor(
    private service: UserFilterService,
    private regService: RegistrationService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.filterOption = this.formBuilder.group({
      isSameIpAddress: [false],
      isSameName: [false],
      isSameSurName: [false],
      isSameZipcode: [false],
      isSameHouseno: [false]
    })

    this.filterData = {
      filterColumnNames: this.displayedColumns.map(ele => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    }
    this.getSuspiscousUser()
  }

  onpaginatechange(event: any) {
    if (event.pageIndex === 0) {
      this.pageno = 1
      return
    }
    this.pageno = (event.pageIndex * event.pageSize) + 1
    return
  }
  updatePagination() {

    this.dataSource.paginator = this.paginator;
  }
  openSnackBar(data: any) {
    this._snackBar.open(data.message, 'Close', {
      duration: 2 * 1000,
    });
  }
  getSuspiscousUser() {
    this.service.getSuspiscous().subscribe({
      next: (response) => {

      },
      error: (error) => {
        console.error(error);
        this.data = [{ "sno": "1", "name": "Anji", "emailId": "anji@gmail", "country": "india", "Gender": "male", "usersince": "2020", "status": "" },
        { "sno": "2", "name": "Praneeth", "emailId": "praneeth@gmail", "country": "Austrilia", "Gender": "male", "usersince": "2020", "status": "" },
        { "sno": "3", "name": "Sumukesh", "emailId": "sumukesh@gmail", "country": "india", "Gender": "male", "usersince": "2020", "status": "" },
        { "sno": "4", "name": "Shekar", "emailId": "shekar@gmail", "country": "india", "Gender": "male", "usersince": "2020", "status": "" },
        { "sno": "5", "name": "Nikhil", "emailId": "nikhil@gmail", "country": "india", "Gender": "male", "usersince": "2020", "status": "" },
        ]
        this.renderTableDate(this.data)

      }
    })
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

  viewdetails(element: any) {

  }
  IsActiveorNot(element: any) {
    const yes = ["Yes", "Y", "yes", "y"]
    const no = ["No", "N", "no", "n"]


    return yes.includes(element)
  };

  toggleSuspisciousUsers(element: any) {
    console.log(element);

    const body = {}

    this.service.toggleSuspisciousUser(body).subscribe({
      next: (response) => {
        this.openSnackBar(response)
        this.getSuspiscousUser()
      },
      error: (error) => {
        console.error(error);

      }
    })

  }
  searchSuspiscousUser() {
    console.log(this.filterOption.value);
    const body = {

    }

    this.service.searchSuspiscoursUser(body).subscribe({
      next: (response) => {
        this.openSnackBar(response)
      },
      error: (error) => {
        console.error(error);

      }
    })

  }
}
