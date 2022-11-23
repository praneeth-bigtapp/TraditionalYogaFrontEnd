import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AddbannerService } from '../service/addbanner.service';
@Component({
  selector: 'app-banner-add',
  templateUrl: './banner-add.component.html',
  styleUrls: ['./banner-add.component.css']
})
export class BannerAddComponent implements OnInit {

  headerbannerform!: FormGroup
  coursebanner!: FormGroup
  filerror!: boolean
  filerror2!: boolean

  optionscontrol = new FormControl('', [Validators.required])
  errorflag: boolean = false
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private bannerservice: AddbannerService,
    private _snackBar: MatSnackBar


  ) {

  }

  ngOnInit(): void {

    this.headerbannerform = this.formBuilder.group({
      bannerimage: [
        null,
        Validators.compose([Validators.required])
      ],
      description: [
        null,
        Validators.compose([Validators.required])
      ],
      others: this.optionscontrol
    })

    this.coursebanner = this.formBuilder.group({
      coursebannerimage: [
        null,
        Validators.compose([Validators.required])
      ],
      coursetitle: [
        null,
        Validators.compose([Validators.required])
      ],
      description: [
        null,
        Validators.compose([Validators.required])
      ],
      fromdate: [
        null,
        Validators.compose([Validators.required])
      ],
      todate: [
        null,
        Validators.compose([Validators.required])
      ]
    })
  }

  openSnackBar(message: any) {
    // this._snackBar.openFromComponent(AlertComponent, {
    //   duration: this.durationInSeconds * 1000,

    // });
    this._snackBar.open(message, 'Close', {
      // horizontalPosition: this.horizontalPosition,
      // verticalPosition: this.verticalPosition,
    });
  }

  onfilechange(formname: string) {

    if (formname === 'headerform')
      this.filerror = this.headerbannerform.value.bannerimage === null ? true : false

    if (formname === 'courseform')
      this.filerror2 = this.coursebanner.value.coursebannerimage === null ? true : false

  }


  submitheaderbanner() {

    this.filerror = this.headerbannerform.value.bannerimage === null ? true : false

    if (this.headerbannerform.valid) {
      this.filerror = false

      const formvalue = this.headerbannerform.value
      // console.log(formvalue);

      this.bannerservice.postheaderbanner(formvalue).subscribe({
        next: (response) => {
          console.log(response);

          // this.openSnackBar(response.message)

        },
        error: (error) => {
          console.error(error.message);

        }
      })



      // this.headerbannerform.reset()
    }
    else {
      console.log("invalid");
      this.headerbannerform.markAllAsTouched()

    }

  }

  submitcourserbanner() {

    this.filerror2 = this.coursebanner.value.coursebannerimage === null ? true : false

    if (this.coursebanner.valid) {
      // console.log("valid");

      const formvalue = this.coursebanner.value
      // console.log(formvalue);
      this.bannerservice.postcoursebanner(formvalue).subscribe({
        next: (response) => {
          console.log(response);

          // this.openSnackBar(response.message)

        },
        error: (error) => {
          console.error(error.message);

        }
      })

      this.coursebanner.reset()


    }
    else {
      console.log("invalid");
      this.coursebanner.markAllAsTouched()
    }

  }
}
