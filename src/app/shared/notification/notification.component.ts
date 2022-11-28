import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
  constructor(
    private formbuilder: FormBuilder
  ) { }
  ngOnInit(): void {
    this.notificationform = this.formbuilder.group({
      category: [null, Validators.compose([Validators.required])],
      title: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],
      file: [null, Validators.compose([Validators.required])],
    })
  }

  notificationtypes = ["Guidance Related to Courses", "Wishes from Guruji", "General Notifications"]

  onfilechange(event: any) {


    console.log(event.target.files[0]);

    this.notificationform.value.file = event.target.files[0]
  }

  addmedia() {

    this.filerror = this.notificationform.value.file === null ? true : false


    if (this.notificationform.valid) {

      const result = this.notificationform.value

      console.log(result);


    }
    else {
      console.log("invalid");

      this.notificationform.markAllAsTouched()
    }

  }

}
