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

    this.dialogRef.close(this.reasonForNotPaying)

  }

  submitVounteer() {

    this.dialogRef.close({
      reason: this.reasonForVolunteer,
      isvolunteer: this.isvolunterring
    })
  }

}
