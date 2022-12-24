import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputvalidationService } from 'src/app/shared/services/inputvalidation.service';
import { RegistrationService } from '../service/registration.service';
import { map, Observable, startWith } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-enrollmentform',
  templateUrl: './enrollmentform.component.html',
  styleUrls: ['./enrollmentform.component.css']
})
export class EnrollmentformComponent implements OnInit {

  iseditable: boolean = false
  formdetails!: FormGroup
  countryList: any
  genderlist: any
  countryfilter !: Observable<any>
  refferallist!: any
  photoerror: boolean = false
  photo!: any
  photourl: any
  constructor(
    private formbuilder: FormBuilder,
    private service: RegistrationService,
    private _snackBar: MatSnackBar

  ) {
    this.formdetails = this.formbuilder.group({
      name: [null, Validators.compose([Validators.required])],
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
      photo: [null, Validators.compose([Validators.required])],
      job: [null, Validators.compose([Validators.required])],
      workinghours: [null, Validators.compose([Validators.required])],
      educationdetails: [null, Validators.compose([Validators.required])],
      prideinqualification: [null, Validators.compose([Validators.required])],
      matrialstatus: [null, Validators.compose([Validators.required])],
      familydetails: [null, Validators.compose([Validators.required])],
      familymemberconsent: [null, Validators.compose([Validators.required])],
      familycooperation: [null, Validators.compose([Validators.required])],
      friendparticipation: [null, Validators.compose([Validators.required])],
      pastyogapratice: [null, Validators.compose([Validators.required])],
      hobbies: [null, Validators.compose([Validators.required])],
      isdedicated: [null, Validators.compose([Validators.required])],
      familyfullname: [null, Validators.compose([Validators.required])],
      familyrelationship: [null, Validators.compose([Validators.required])],
      familycontactno: [null, Validators.compose([Validators.required, Validators.pattern(InputvalidationService.inputvalidation.isnumbers)])],
      whythiscourse: [null, Validators.compose([Validators.required])],
    })

    this.refferallist = ["I am old student", "Friends and family", "Facebook", "Instagram", "Youtube", "TV Media", "Others"]

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
        console.log(response);

        this.refferallist = response
      },
      error: (error) => {
        console.error(error.message);
        // this.genderlist = ["Male", "Female", "Transgender"]


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

    this.photoerror = this.formdetails.value.photo === null ? true : false


    this.photo = event.target.files[0]
    const reader = new FileReader();
    reader.readAsDataURL(this.photo);
    reader.onload = (_event) => {
      this.photourl = reader.result
    }
  }
  enrollmentsubmit() {
    if (this.formdetails.invalid)
      return this.formdetails.markAllAsTouched()

    const { name, email, mobile, mothertounge, isenglishspoken, dateofbirth, gender, houseno, street, town, state, country, pincode } = this.formdetails.value
    console.log({ name, email, mobile, mothertounge, isenglishspoken, dateofbirth, gender, houseno, street, town, state, country, pincode });


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
