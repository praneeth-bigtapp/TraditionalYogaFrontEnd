import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard-notification',
  templateUrl: './dashboard-notification.component.html',
  styleUrls: ['./dashboard-notification.component.css']
})
export class DashboardNotificationComponent implements OnInit {

  reasonForNotPaying!: string
  reasonError: boolean = false
  isvolunterring: boolean = true
  reasonForVolunteer: string = ""
  islater: boolean = false

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DashboardNotificationComponent>
  ) {

  }

  ngOnInit(): void {
  }

  paymentNow() {

  }

  expressInability() {

  }

  submitReasonNotAbleToPay() {
    this.reasonError = false
    if (!this.reasonForNotPaying) {
      this.reasonError = true
      return
    }

    this.dialogRef.close({
      reason: this.reasonForNotPaying, islater: this.islater
    })

  }
  submitLater() {
    this.islater = true
    this.dialogRef.close({
      islater: this.islater
    })
  }

  submitVounteer() {

    this.dialogRef.close({
      reason: this.reasonForVolunteer,
      isvolunteer: this.isvolunterring,
      islater: this.islater

    })
  }

}
