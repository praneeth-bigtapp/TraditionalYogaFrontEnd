import { Component, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, } from '@angular/material/table';
import { DialogPopupComponent } from 'src/app/shared/dialog-popup/dialog-popup.component';
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
  formdisplay=false
  filterData:any
  gridData:any
currentID:any

  pageno: number = 1
  today: any;

  onpaginatechange(event: any) {
    if (event.pageIndex === 0) {
      this.pageno = 1
      return
    }
    this.pageno = (event.pageIndex * event.pageSize) + 1
    return
  }

  constructor(
    private blacklistUsersService: BlacklistUsersService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar, private dialog: MatDialog
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
  formtoggle(){
    this.formdisplay=!this.formdisplay
  }
  getBlackListUser() {
    this.blacklistUsersService.getBlacklist().subscribe({
      next: (response) => {

        this.blacklistData = response;
        this.blacklistData=this.blacklistData.reverse()
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
    const data =
    {
      "blacklistUserId": blacklist.blacklistuserId
  }
    console.log(data)
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
      this.datevalue()
      const data = {
        "blacklistUserEmail": this.blacklistForm.value.emailId,
        "comments": this.blacklistForm.value.comments,
        "date": this.today,
      }
      this.blacklistUsersService.addBlacklist(data).subscribe({
        next: (response) => {
          this.openSnackBar("Blocked user Sucessfully");
          this.getBlackListUser();
          this.blacklistForm.reset();
        },
        error: (error) => {
          this.openSnackBar(error.error.message);
          // this.openSnackBar("No user Found")
        }
      });
    }
  }
  datevalue(){
    const today=new Date()
    this.today=today.getFullYear()+'-'+today.getMonth()+'-'+today.getDate()
  }

saveList() {
  this.updatebtn=false
  this.blackbtn=true
  
    if (this.blacklistForm.valid) {
      this.datevalue()
      const data = {
        "blacklistUserId": this.currentID,
        "date": this.today,
       
        "blacklistUserEmail": this.blacklistForm.value.emailId,
        "comments": this.blacklistForm.value.comments
      }

      console.log(data);
      
      this.blacklistUsersService.saveBlacklist(data).subscribe({
        next: (response) => {
          this.openSnackBar(" Updated Sucessfully");
          this.getBlackListUser();
          this.blacklistForm.reset();
        },
        error: (error) => {
          this.openSnackBar(error.error.message);
          this.openSnackBar("error Found")
        }
      });
    }
  }


  updatePagination() {
    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort=this.sort

   
  }
  editdetails(element:any){
    this.currentID=element.blacklistuserId
    this.formdisplay=true 
    console.log(element);
    
    console.log(this.currentID);
    
    this.blacklistForm.setValue({emailId:element.blacklistUserEmail,
    comments:element.comments
    })
    this.blackbtn=false
    this.updatebtn=true
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
});

  }
  onupdate(){
    this.blackbtn=true
    this.updatebtn=false
    this.blacklistForm.reset()
    
  }
  oncancel(){
    this.blacklistForm.reset()
    this.blackbtn=true
    this.updatebtn=false
    this.formtoggle()

  }
  
  openSnackBar(data: any) {
    this._snackBar.open(data, 'Close', {
      duration: 2 * 1000,
    });
  }
  
  deletedetails(element: any) {



    const dialogref = this.dialog.open(DialogPopupComponent, {
      data: {
        title: "Delete Confirmation",
        message: "Are You Sure You Want To UnBlack the user ?"
      },
      width: "30%",
      height:"25%"
    })

    dialogref.afterClosed().subscribe(data => {
      if (data) {
       this.unBlockUser(element)
          }
        })
        return
      }

}
