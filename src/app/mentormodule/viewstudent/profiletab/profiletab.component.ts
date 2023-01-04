import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogPopupComponent } from 'src/app/shared/dialog-popup/dialog-popup.component';
import { ViewstudentService } from '../viewstudent.service';

@Component({
  selector: 'app-profiletab',
  templateUrl: './profiletab.component.html',
  styleUrls: ['./profiletab.component.css']
})
export class ProfiletabComponent implements OnInit {

  @Input() student: any;
  studentProfile: any;
  statusList: any
  constructor(
    private service: ViewstudentService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar

  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.getStudentProfile()
    this.getStatusList()
  }

  openSnackBar(data: any) {
    this._snackBar.open(data.message, 'Close', {
      duration: 2 * 1000,
    });
  }

  getStudentProfile() {
    const body = {
      "studentId": this.student && this.student.studentId,
      "name": this.student && this.student.name
    }
    this.service.getStudentById(body).subscribe({
      next: (response) => {
        this.studentProfile = response;
        console.log(this.studentProfile.statusName);

      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getStatusList() {
    this.service.getALLstudentstatus().subscribe({
      next: (response) => {
        this.statusList = response;
      },
      error: (error) => {
        console.error(error);

      }
    });
  }


  changestatus(element: any, id: any, name: any) {
    const dialogref = this.dialog.open(DialogPopupComponent, {
      data: {
        title: "Status Confirmation",
        message: "Are You Sure You Want To Change the Statust to " + name + " ?"
      },
      width: "30%",
      height: "25%"
    })
    let body = {
      "studentId": element.studentId,
      "statusId": id
    }

    dialogref.afterClosed().subscribe(data => {
      if (data) {
        console.log(body);

        this.service.poststudentstatusById(body).subscribe({
          next: (response) => {
            this.openSnackBar(response)
            this.getStudentProfile()


          },
          error: (error) => {
            console.error(error.message);
          }
        })
        return
      }
      this.getStudentProfile()


    })


  }

}
