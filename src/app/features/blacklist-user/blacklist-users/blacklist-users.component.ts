import { Component, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, } from '@angular/material/table';
import { BlacklistUsersService } from '../blacklist-users.service';


@Component({
  selector: 'app-blacklist-users',
  templateUrl: './blacklist-users.component.html',
  styleUrls: ['./blacklist-users.component.css']
})
export class BlacklistUsersComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  blacklistForm!: FormGroup
  displayedColumns: string[] = ['SNo', 'date', 'blacklistUserEmail', "comments", "action"];
  dataSource: any;
  blacklistData: any;
  updatebtn=false
  blackbtn=true
  
  filterData:any
  gridData:any
  constructor(
    private blacklistUsersService: BlacklistUsersService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.blacklistForm = this.formBuilder.group({
      emailId: [null, Validators.compose([Validators.required])],
      comments: [null, Validators.compose([Validators.required])],
    });
    this.filterData = {
      filterColumnNames: this.displayedColumns.map((ele: any) => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };

    this.getBlackListUser();
    
  }

  getBlackListUser() {
    this.blacklistUsersService.getBlacklist().subscribe({
      next: (response) => {

        this.blacklistData = response;
        console.log(this.blacklistData)
        this.dataSource = new MatTableDataSource<any>(this.blacklistData);
       
        this.filterData.gridData = this.blacklistData;
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
    });
  }

  unBlockUser(blacklist: any) {
    const data = {
      "blacklistuserId": blacklist.blacklistuserId,
      "blacklistUserEmail": blacklist.blacklistUserEmail,
      "date": blacklist.date,
      "comments": blacklist.comments
    }
    this.blacklistUsersService.removeBlacklist(data).subscribe({
      next: (response) => {
        this.openSnackBar("Unblocked user Sucessfully");
        this.getBlackListUser();
        this.blacklistForm.reset();
      },
      error: (error) => {
        this.openSnackBar(error.error.message);
      }
    });
  }

  onBlockUser() {
    if (this.blacklistForm.valid) {
      const data = {
        "blacklistUserEmail": this.blacklistForm.value.emailId,
        "comments": this.blacklistForm.value.comments
      }
      this.blacklistUsersService.addBlacklist(data).subscribe({
        next: (response) => {
          this.openSnackBar("Blocked user Sucessfully");
          this.getBlackListUser();
          this.blacklistForm.reset();
        },
        error: (error) => {
          this.openSnackBar(error.error.message);
        }
      });
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message);
    setTimeout(() => {this._snackBar.dismiss()},3000);
  }
  updatePagination() {
    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort=this.sort

   
  }
  editdetails(element:any){
    
    this.blacklistForm.setValue({emailId:element.blacklistUserEmail,
    comments:element.comments
    })
    this.blackbtn=false
    this.updatebtn=true


  }
  onupdate(){
    this.blackbtn=true
    this.updatebtn=false
  }
  oncancel(){
    this.blacklistForm.reset()
    this.blackbtn=true
    this.updatebtn=false

  }
}
