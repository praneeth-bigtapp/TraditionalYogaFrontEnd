import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, } from '@angular/material/table';
import { BlacklistUsersService } from '../blacklist-users.service';


@Component({
  selector: 'app-blacklist-users',
  templateUrl: './blacklist-users.component.html',
  styleUrls: ['./blacklist-users.component.css']
})
export class BlacklistUsersComponent implements OnInit {
  blacklistForm!: FormGroup
  displayedColumns: string[] = ['SNo', 'date', 'blacklistUserEmail', "comments", "action"];
  dataSource: any;
  blacklistData: any;

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

    this.getBlackListUser();
  }

  getBlackListUser() {
    this.blacklistUsersService.getBlacklist().subscribe({
      next: (response) => {
        this.blacklistData = response;
        this.dataSource = new MatTableDataSource<any>(this.blacklistData);
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

}
