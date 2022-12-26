import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputvalidationService } from 'src/app/shared/services/inputvalidation.service';
import { RegistrationService } from '../service/registration.service';
import { map, Observable, startWith } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogPopupComponent } from 'src/app/shared/dialog-popup/dialog-popup.component';

@Component({
  selector: 'app-enrollmentform',
  templateUrl: './enrollmentform.component.html',
  styleUrls: ['./enrollmentform.component.css']
})
export class EnrollmentformComponent implements OnInit {

  iseditable: boolean = false
  formdetails!: FormGroup
  detailsinformation!: FormGroup
  countryList: any
  genderlist: any
  countryfilter !: Observable<any>
  refferallist!: any
  photoerror: boolean = false
  photo!: any
  photourl: any
  termschecked = false
  eduationallist: any
  martialstatus: any
  isfriendname: boolean = false
  iseduationother: boolean = false

  constructor(
    private formbuilder: FormBuilder,
    private service: RegistrationService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog

  ) {
    this.formdetails = this.formbuilder.group({
      firstname: [null, Validators.compose([Validators.required])],
      middlename: [null],
      lastname: [null, Validators.compose([Validators.required])],
      // name: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      mobile: [null, Validators.compose([Validators.required, Validators.pattern(InputvalidationService.inputvalidation.mobile)])],
      mothertounge: [null, Validators.compose([Validators.required])],
      isenglishspoken: [null, Validators.compose([Validators.required])],
      dateofbirth: [null, Validators.compose([Validators.required])],
      gender: [null, Validators.compose([Validators.required])],
      houseno: [null, Validators.compose([Validators.required, Validators.pattern(InputvalidationService.inputvalidation.isnumbers)])],
      street: [null, Validators.compose([Validators.required])],
      town: [null, Validators.compose([Validators.required])],
      state: [null, Validators.compose([Validators.required])],
      country: [null, Validators.compose([Validators.required])],
      pincode: [null, Validators.compose([Validators.required, Validators.pattern(InputvalidationService.inputvalidation.isnumbers)])],
      refferal: [null, Validators.compose([Validators.required])],
      termscondition: [null, Validators.compose([Validators.required])],

    })


    this.detailsinformation = this.formbuilder.group({
      photo: [null, Validators.compose([Validators.required])],
      job: [null, Validators.compose([Validators.required])],
      workinghours: [null, Validators.compose([Validators.required, Validators.pattern(InputvalidationService.inputvalidation.isnumbers)])],
      educationdetails: [null, Validators.compose([Validators.required])],
      othereducationdetails: [null],
      prideinqualification: [null, Validators.compose([Validators.required])],
      matrialstatus: [null, Validators.compose([Validators.required])],
      familydetails: [null, Validators.compose([Validators.required])],
      familymemberconsent: [null, Validators.compose([Validators.required])],
      familycooperation: [null, Validators.compose([Validators.required])],
      friendparticipation: [null, Validators.compose([Validators.required])],
      friendname: [null],
      pastyogapratice: [null, Validators.compose([Validators.required])],
      hobbies: [null, Validators.compose([Validators.required])],
      isdedicated: [null, Validators.compose([Validators.required])],
      familyfullname: [null, Validators.compose([Validators.required])],
      familyrelationship: [null, Validators.compose([Validators.required])],
      familycontactno: [null, Validators.compose([Validators.required, Validators.pattern(InputvalidationService.inputvalidation.mobile)])],
      whythiscourse: [null, Validators.compose([Validators.required])],
    })

    // this.refferallist = ["I am old student", "Friends and family", "Facebook", "Instagram", "Youtube", "TV Media", "Others"]
    this.martialstatus = ["Single", "Married"]
    this.service.getcountry().subscribe({
      next: (response) => {

        this.countryList = response
        this.countryList = this.countryList.map((ele: any) => ele.countryName)

      },
      error: (error) => {
        console.error(error.message);

      }
    })
    this.service.getgender().subscribe({
      next: (response) => {

        this.genderlist = response
      },
      error: (error) => {
        console.error(error.message);


      }
    })
    this.service.getaboutus().subscribe({
      next: (response) => {
        this.refferallist = response
      },
      error: (error) => {
        console.error(error.message);
      }
    })
    this.service.getqualification().subscribe({
      next: (response) => {
        this.eduationallist = response
      },
      error: (error) => {
        console.error(error.message);
        this.eduationallist = ["dummy", "other"]

      }
    })
  }


  ngOnInit(): void {
    this.countryfilter = this.formdetails.valueChanges.pipe(
      startWith(''),
      map(value => this.countryList?.filter((ele: any) => ele.toLowerCase().includes(value.country?.toLowerCase()))),
    )

  }
  openSnackBar(data: any) {
    this._snackBar.open(data.message, 'Close', {
      duration: 2 * 1000,
    });
  }
  compareselect(obj1: any, obj2: any) {
    return obj1 && obj2 && obj1.categoriesId === obj2
  }


  photoupload(event: any) {
    this.photoerror = this.detailsinformation.value.photo === null ? true : false
    this.photo = event.target.files[0].name
    // const reader = new FileReader();
    // reader.readAsDataURL(this.photo);
    // reader.onload = (_event) => {
    //   this.photourl = reader.result
    // }
  }
  termsandcondition(event: any) {

    const dialogref = this.dialog.open(DialogPopupComponent, {
      data: {
        title: "Terms&Condition",
        message: "Read Terms and condition"
      },
      width: "100%"
    })

    dialogref.afterClosed().subscribe(data => {
      this.termschecked = data
      console.log(this.termschecked);

      return
    })


  }

  educationchange(event: any) {
    if (event.value === "other") {
      this.iseduationother = true
      return
    }
    this.iseduationother = false
  }
  isfriendjoin(event: any) {
    this.isfriendname = event.value
  }
  enrollmentsubmit() {

    if (this.formdetails.invalid)
      return this.formdetails.markAllAsTouched()

    const { name, email, mobile, mothertounge, isenglishspoken, dateofbirth, gender, houseno, street, town, state, country, pincode } = this.formdetails.value
    // console.log({ name, email, mobile, mothertounge, isenglishspoken, dateofbirth, gender, houseno, street, town, state, country, pincode });


    const body = {}


    this.service.postenrollment(body).subscribe({
      next: (response) => {
        this.openSnackBar(response)
      },
      error: (error) => {
        console.error(error.message);

      }
    })
  }


  detailedsubmit() {
    this.photoerror = this.detailsinformation.value.photo === null ? true : false
    this.formdetails.value.photo = this.photo

    console.log(this.detailsinformation.value);

    if (this.detailsinformation.invalid)
      return this.detailsinformation.markAllAsTouched()


    const body = {}


    this.service.postenrollment(body).subscribe({
      next: (response) => {
        this.openSnackBar(response)
      },
      error: (error) => {
        console.error(error.message);

      }
    })

  }

}
