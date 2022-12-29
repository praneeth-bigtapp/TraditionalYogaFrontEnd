import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InputvalidationService } from 'src/app/shared/services/inputvalidation.service';
import { RegistrationService } from '../service/registration.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details-student-information',
  templateUrl: './details-student-information.component.html',
  styleUrls: ['./details-student-information.component.css']
})
export class DetailsStudentInformationComponent implements OnInit {
  detailsinformation: any;
  photoerror: boolean = false;
  photo: any;
  photosizeerror: boolean = false;
  photourl: any;
  iseduationother: boolean = false;
  isfriendname: any;
  martialstatus: string[];
  eduationallist: any


  constructor(
    private formbuilder: FormBuilder,
    private service: RegistrationService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private http: HttpClient,
    private zone: NgZone
  ) {

    this.martialstatus = ["Single", "Married"]

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
  }
  openSnackBar(data: any) {
    this._snackBar.open(data.message, 'Close', {
      duration: 2 * 1000,
    });
  }
  photoupload(event: any) {

    this.photoerror = this.detailsinformation.value.photo === null ? true : false
    this.photo = event.target.files[0]
    const mm = 0.2645833333
    const reader = new FileReader();
    let self = this
    reader.readAsDataURL(this.photo);
    reader.onload = (_event) => {
      const image = new Image()
      image.src = reader.result as string
      image.onload = function (e) {
        const { path } = Object(e)
        const [img] = path
        // in px
        const width = Math.round(img.width * mm)
        const height = Math.round(img.height * mm)
        console.log({ width, height })
        self.checksizeconstranit(width, height, reader.result)



      };

    }
  }

  checksizeconstranit(width: any, height: any, url: any) {
    const [prefferedwidth, preferredheight] = [51, 51]

    if (width <= prefferedwidth && height <= preferredheight) {
      console.log("it fits");
      this.photosizeerror = false
      this.photourl = url

    }
    else {
      console.log("it not fits");
      this.photosizeerror = true
      this.detailsinformation.get('photo')?.reset();


    }
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
  detailedsubmit() {
    this.photoerror = this.detailsinformation.value.photo === null ? true : false
    this.photosizeerror = false


    if (this.detailsinformation.invalid)
      return this.detailsinformation.markAllAsTouched()


    const { job, workinghours, educationdetails, prideinqualification, martialstatus, familydetails, familymemberconsent, familycooperation, friendparticipation, friendname, pastyogapratice, hobbies, isdedicated, familyfullname, familyrelationship, familycontactno, whythiscourse } = this.detailsinformation.value

    const body = {
      "registrationId": 1,
      "passportPhoto": this.photo.name,
      "professionId": {
        "professionId": 1
        // need correction on this property
      },
      "professionWorkingHours": workinghours,
      "educationalId": {
        "qualificationId": educationdetails
      },
      "prideQualification": prideinqualification,
      "martialStatus": martialstatus,
      "familyDetails": familydetails,
      "consentFamily": familymemberconsent ? "Y" : "N",
      "resistanceFamily": familycooperation,
      "participatingFamily": familyrelationship ? "Y" : "N",
      // friend name is missing
      "pastPractice": pastyogapratice,
      "hobbies": hobbies,
      "hobbiesAside": isdedicated,
      "referenceName": familyfullname,
      "referenceRelationship": familyrelationship,
      "referenceMobile": familycontactno,
      "courseBriefly": whythiscourse
    }


    this.service.postenrollment(body).subscribe({
      next: (response) => {
        this.openSnackBar(response)
        this.detailsinformation.reset()

      },
      error: (error) => {
        console.error(error.message);

      }
    })

  }

}
