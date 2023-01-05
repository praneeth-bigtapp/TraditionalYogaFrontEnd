import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  detailsEnrollForm!: FormGroup;
  photoError: boolean = false;
  photo: any;
  photoSizeError: boolean = false;
  photoUrl: any;
  isEduationOther: boolean = false;
  isFriendName: any;
  maritalStatus: any;
  eduationalList: any;
  professionsList: any;


  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private http: HttpClient,
    private zone: NgZone
  ) { }

  ngOnInit(): void {
    this.detailsEnrollForm = this.formBuilder.group({
      photo: [null, Validators.compose([])],
      job: [null, Validators.compose([])],
      workinghours: [null, Validators.compose([Validators.pattern(InputvalidationService.inputvalidation.isnumbers)])],
      educationdetails: [null, Validators.compose([])],
      othereducationdetails: [null],
      prideinqualification: [null, Validators.compose([])],
      maritalStatus: [null, Validators.compose([])],
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
      familycontactno: [null, Validators.compose([Validators.pattern(InputvalidationService.inputvalidation.mobile)])],
      whythiscourse: [null, Validators.compose([])],
    });

    this.getQualification();
    this.getProfession();
    this.getMaritalStatus();
    // this.maritalStatus = ["Single", "Married"];
  }

  getQualification() {
    this.registrationService.getQualification().subscribe({
      next: (response) => {
        this.eduationalList = response;
        const othersData = {
          "qualificationId": -1,
          "qualificationName": "others"
        };
        this.eduationalList.push(othersData);
      },
      error: (error) => {
        let data = error.error;
        console.error(data);
        const othersData = {
          "qualificationId": -1,
          "qualificationName": "others"
        };
        this.eduationalList = [];
        this.eduationalList.push(othersData);

      }
    });
  }

  getProfession() {
    this.registrationService.getProfessions().subscribe({
      next: (response) => {
        this.professionsList = response;
      },
      error: (error) => {
        let data = error.error;
        console.error(data);
      }
    });
  }

  getMaritalStatus() {
    this.registrationService.getMaritalStatus().subscribe({
      next: (response) => {
        this.maritalStatus = response;
        console.log(this.maritalStatus);
      },
      error: (error) => {
        let data = error.error;
        console.error(data);
      }
    });
  }

  openSnackBar(data: any) {
    this._snackBar.open(data.message, 'Close', {
      duration: 2 * 1000,
    });
  }
  photoupload(event: any) {

    this.photoError = this.detailsEnrollForm.value.photo === null ? true : false
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
      this.photoSizeError = false
      this.photoUrl = url

    }
    else {
      console.log("it not fits");
      this.photoSizeError = true
      this.detailsEnrollForm.get('photo')?.reset();
    }
  }

  educationChange(event: any) {
    console.log(event.value);
    this.isEduationOther = false
    if (event.value === -1) {
      this.isEduationOther = true
      return
    }
  }
  isfriendjoin(event: any) {
    this.isFriendName = event.value
  }
  detailedsubmit() {
    // this.photoerror = this.detailsinformation.value.photo === null ? true : false
    this.photoSizeError = false

    if (this.detailsEnrollForm.invalid) {
      return this.detailsEnrollForm.markAllAsTouched();
    } else {
      // console.log(this.detailsEnrollForm.value);
      const body = {
        "registrationId": 2,
        "passportPhoto": this.detailsEnrollForm.value.photo,
        "professionId": {
          "professionId": this.detailsEnrollForm.value.job
        },
        "professionWorkingHours": this.detailsEnrollForm.value.workinghours,
        "educationalId": {
          "qualificationId": this.detailsEnrollForm.value.educationdetails
        },
        "otherEducationalName": this.detailsEnrollForm.value.othereducationdetails,
        "prideQualification": this.detailsEnrollForm.value.prideinqualification,
        "maritalStatus": {
          "maritalStatusId": this.detailsEnrollForm.value.maritalStatus
        },
        "familyDetails": this.detailsEnrollForm.value.familydetails,
        "consentFamily": this.detailsEnrollForm.value.familymemberconsent ? "Y" : "N",
        "resistanceFamily": this.detailsEnrollForm.value.familycooperation ? "Y" : "N",
        "participatingFamily": this.detailsEnrollForm.value.friendparticipation ? "Y" : "N",
        "participateName": this.detailsEnrollForm.value.friendparticipation ? this.detailsEnrollForm.value.friendname : null,
        "pastPractice": this.detailsEnrollForm.value.pastyogapratice,
        "hobbies": this.detailsEnrollForm.value.hobbies,
        "hobbiesAside": this.detailsEnrollForm.value.isdedicated ? "Y" : "N",
        "referenceName": this.detailsEnrollForm.value.familyfullname,
        "referenceRelationship": this.detailsEnrollForm.value.familyrelationship,
        "referenceMobile": this.detailsEnrollForm.value.familycontactno,
        "courseBriefly": this.detailsEnrollForm.value.whythiscourse
      };
      // console.log(body);

      this.registrationService.postDetailsEnrollment(body).subscribe({
        next: (response) => {
          this.openSnackBar(response)
          this.detailsEnrollForm.reset()
        },
        error: (error) => {
          console.error(error.error);
        }
      });
    }
  }

}
