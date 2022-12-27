import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputvalidationService } from 'src/app/shared/services/inputvalidation.service';
import { RegistrationService } from '../service/registration.service';
import { catchError, map, Observable, startWith } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogPopupComponent } from 'src/app/shared/dialog-popup/dialog-popup.component';
import { HttpClient } from '@angular/common/http';

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
  statefilter !: Observable<any>
  statelist: any
  refferallist!: any
  photoerror: boolean = false
  photo!: any
  photourl: any
  termschecked = false
  eduationallist: any
  martialstatus: any
  isfriendname: boolean = false
  iseduationother: boolean = false
  isIndia: boolean = false
  isemailverified: boolean = false
  isemailsended: boolean = false
  otp: any
  otperror: boolean = false


  constructor(
    private formbuilder: FormBuilder,
    private service: RegistrationService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private http: HttpClient,

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
      houseno: [null, Validators.compose([Validators.pattern(InputvalidationService.inputvalidation.isnumbers)])],
      street: [null, Validators.compose([])],
      town: [null, Validators.compose([])],
      state: [null, Validators.compose([])],
      country: [null, Validators.compose([])],
      pincode: [null, Validators.compose([Validators.pattern(InputvalidationService.inputvalidation.isnumbers)])],
      refferal: [null, Validators.compose([Validators.required])],
      termscondition: [null, Validators.compose([Validators.required])],

    })


    this.detailsinformation = this.formbuilder.group({
      photo: [null, Validators.compose([])],
      job: [null, Validators.compose([])],
      workinghours: [null, Validators.compose([Validators.pattern(InputvalidationService.inputvalidation.isnumbers)])],
      educationdetails: [null, Validators.compose([])],
      othereducationdetails: [null],
      prideinqualification: [null, Validators.compose([])],
      matrialstatus: [null, Validators.compose([])],
      familydetails: [null, Validators.compose([])],
      familymemberconsent: [null, Validators.compose([])],
      familycooperation: [null, Validators.compose([])],
      friendparticipation: [null, Validators.compose([])],
      friendname: [null],
      pastyogapratice: [null, Validators.compose([])],
      hobbies: [null, Validators.compose([])],
      isdedicated: [null, Validators.compose([])],
      familyfullname: [null, Validators.compose([])],
      familyrelationship: [null, Validators.compose([])],
      familycontactno: [null, Validators.compose([, Validators.pattern(InputvalidationService.inputvalidation.mobile)])],
      whythiscourse: [null, Validators.compose([])],
    })
    this.getIPAddress()


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

    this.service.getindiastates().subscribe({
      next: (response) => {
        this.statelist = response
        console.log(this.statelist);

      },
      error: (error) => {
        console.error(error.message);
      }
    })
  }


  ngOnInit(): void {
    this.countryfilter = this.formdetails.valueChanges.pipe(
      startWith(''),
      map(value => this.countryList?.filter((ele: any) => ele.toLowerCase().includes(value.country?.toLowerCase()))),
    )

    this.statefilter = this.formdetails.valueChanges.pipe(
      startWith(''),
      map(value => this.statelist?.filter((ele: any) => ele.toLowerCase().includes(value.state?.toLowerCase()))),
    )

  }

  getIPAddress() {

  }
  openSnackBar(data: any) {
    this._snackBar.open(data.message, 'Close', {
      duration: 2 * 1000,
    });
  }
  compareselect(obj1: any, obj2: any) {
    return obj1 && obj2 && obj1.categoriesId === obj2
  }

  countrychange(event: any) {
    const value = event?.option?.value || event?.target?.value

    this.isIndia = value.toLowerCase() === "india"
    console.log(this.isIndia);

  }
  sendemail() {
    this.otperror = false
    this.isemailsended = true
    this.isemailverified = false
  }

  verifyemail() {

    if (this.otp.length === 0 || !this.otp.test(InputvalidationService.inputvalidation.isnumbers)) {
      this.otperror = true
      return
    }


    console.log(this.otp);
    this.otperror = false

    this.isemailsended = false
    this.isemailverified = true
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
  termsandcondition() {

    const dialogref = this.dialog.open(DialogPopupComponent, {
      data: {
        title: "Terms&Condition",
        message: "Read Terms and condition"
      },
      width: "100%"
    })

    dialogref.afterClosed().subscribe(data => {
      // this.termschecked = data
      // console.log(this.termschecked);

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
