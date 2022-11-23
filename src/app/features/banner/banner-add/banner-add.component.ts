import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BanneraddService } from '../service/banneradd.service';
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
    private banner: BanneraddService,
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
    this._snackBar.open(message, 'Close');
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
      console.log(formvalue);

      this.banner.postheaderbanner(formvalue).subscribe({
        next: (response) => {
          this.headerbannerform.reset()
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
      console.log("valid");

      const formvalue = this.coursebanner.value
      console.log(formvalue);


      this.banner.postheaderbanner(formvalue).subscribe({
        next: (response) => {
          this.coursebanner.reset()
          // this.openSnackBar(response.message)

        },
        error: (error) => {
          console.error(error.message);

        }
      })


    }
    else {
      console.log("invalid");
      this.coursebanner.markAllAsTouched()
    }

  }
}
