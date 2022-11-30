import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  category!: string
  notificationform!: any
  timerror!: boolean
  filerror!: boolean
  filerror2!: boolean
  datafile!: any
  filedata!: any
  constructor(
    private formbuilder: FormBuilder,
    private service: NotificationService,
    private _snackBar: MatSnackBar
  ) {
    this.notificationform = this.formbuilder.group({
      category: [null, Validators.compose([Validators.required])],
      title: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],
      file: [null, Validators.compose([Validators.required])],
    })
  }
  ngOnInit(): void {

  }

  openSnackBar(data: any) {
    this._snackBar.open(data.message, 'Close');
  }

  notificationtypes = ["Guidance Related to Courses", "Wishes from Guruji", "General Notifications"]

  onfilechange(event: any) {
    this.filedata = event.target.files[0].name
  }

  addmedia() {

    this.filerror = this.notificationform.value.file === null ? true : false


    if (this.notificationform.valid) {

      this.notificationform.value.file = this.filedata

      const { category, title, description, file } = this.notificationform.value

      console.log({ category, title, description, file });

      const body = {

      }

      this.service.postnotification(body).subscribe({
        next: (response) => {
          this.openSnackBar(response)
        },
        error: (error) => {
          console.error(error.message);

        }
      })
    }
    else {
      this.notificationform.markAllAsTouched()
    }

  }

}
