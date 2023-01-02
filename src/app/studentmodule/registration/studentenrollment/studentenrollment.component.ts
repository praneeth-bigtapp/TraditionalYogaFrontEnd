import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, startWith, map } from 'rxjs';
import { DialogPopupComponent } from 'src/app/shared/dialog-popup/dialog-popup.component';
import { InputvalidationService } from 'src/app/shared/services/inputvalidation.service';
import { RegistrationService } from '../service/registration.service';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { OtpComponent } from 'src/app/shared/otp/otp.component';


@Component({
  selector: 'app-studentenrollment',
  templateUrl: './studentenrollment.component.html',
  styleUrls: ['./studentenrollment.component.css']
})
export class StudentenrollmentComponent implements OnInit {

  enrollForm!: FormGroup;
  countryFilter !: Observable<any>;
  stateFilter !: Observable<any>;
  isEditable: boolean = false;
  countryList: any;
  genderList: any;
  stateList: any
  refferalList!: any;
  termsChecked = false;
  isIndia: boolean = false;
  isEmailVerified: boolean = false;
  isEmailSended: boolean = false;
  isEmailValid: boolean = false;
  otpData: any;
  otp: any;
  otpError: boolean = false;

  constructor(
    private formbuilder: FormBuilder,
    private regService: RegistrationService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private http: HttpClient,
    private zone: NgZone,
    private router: Router,
  ) { }


  ngOnInit(): void {

    this.enrollForm = this.formbuilder.group({
      firstName: [null, Validators.compose([Validators.required])],
      middleName: [null],
      lastName: [null, Validators.compose([Validators.required])],
      // name: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      mobile: [null, Validators.compose([Validators.required, Validators.pattern(InputvalidationService.inputvalidation.phonenumber)])],
      motherTounge: [null, Validators.compose([Validators.required])],
      isEnglishSpoken: [null, Validators.compose([Validators.required])],
      dateOfBirth: [null, Validators.compose([Validators.required])],
      gender: [null, Validators.compose([Validators.required])],
      houseNo: [null, Validators.compose([Validators.pattern(InputvalidationService.inputvalidation.isnumbers)])],
      street: [null, Validators.compose([])],
      town: [null, Validators.compose([])],
      state: [null],
      country: [null, Validators.compose([])],
      pincode: [null, Validators.compose([Validators.pattern(InputvalidationService.inputvalidation.isnumbers)])],
      refferal: [{ value: null, disabled: this.isEditable}, Validators.compose([Validators.required])],
      termsCondition: [null, Validators.compose([Validators.required])],
    });

    // this.getIPAddress();
    // this.refferallist = ["I am old student", "Friends and family", "Facebook", "Instagram", "Youtube", "TV Media", "Others"]
    // this.martialStatus = ["Single", "Married"]

    // 1. Country
    this.regService.getCountry().subscribe({
      next: (response) => {
        this.countryList = response;
        this.countryList = this.countryList.map((ele: any) => ele.countryName);
      },
      error: (error) => {
        // console.error(error);
      }
    });

    // 2. Gender
    this.regService.getGender().subscribe({
      next: (response) => {
        this.genderList = response;
      },
      error: (error) => {
        // console.error(error);
      }
    });

    // 3. About Us
    this.regService.getAboutUs().subscribe({
      next: (response) => {
        this.refferalList = response;
        console.log(this.refferalList);
      },
      error: (error) => {
        // console.error(error);
      }
    });

    // this.regService.getindiastates().subscribe({
    //   next: (response) => {
    //     this.statelist = response
    //     console.log(this.statelist);

    //   },
    // error: (error) => {
    //   console.error(error);
    //   }
    // });

    this.countryFilter = this.enrollForm.valueChanges.pipe(
      startWith(''),
      map(value => this.countryList?.filter((ele: any) => ele.toLowerCase().includes(value.country?.toLowerCase()))),
    );

    this.stateFilter = this.enrollForm.valueChanges.pipe(
      startWith(''),
      map(value => this.stateList?.filter((ele: any) => ele.toLowerCase().includes(value.state?.toLowerCase()))),
    )

  }

  // convertmmtopixel(value: any) {
  //   return Number(value) * 3.7795275591
  // }

  // convertPixelstoMM(value: any) {
  //   return Number(value) * 0.2645833333
  // }

  // private ipRegex = new RegExp(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/);
  // getRTCPeerConnection() {
  //   return window.RTCPeerConnection;
  // }

  // private determineLocalIp() {
  //   const RTCPeerConnections = this.getRTCPeerConnection();

  //   const pc = new RTCPeerConnection({ iceServers: [] });
  //   pc.createDataChannel('');
  //   pc.createOffer().then(pc.setLocalDescription.bind(pc));

  //   pc.onicecandidate = (ice) => {
  //     this.zone.run(() => {
  //       if (!ice || !ice.candidate || !ice.candidate.candidate) {
  //         return;
  //       }

  //       const localIp = ice.candidate.candidate;
  //       console.log(localIp)
  //       pc.onicecandidate = () => { };
  //       pc.close();
  //     });
  //   };
  // }

  // getIPAddress() {
  //   this.determineLocalIp()
  // };
  openSnackBar(data: any) {
    this._snackBar.open(data.message, 'Close', {
      duration: 2 * 1000,
    });
  }

  compareSelect(obj1: any, obj2: any) {
    return obj1 && obj2 && obj1.categoriesId === obj2
  }

  onCancel() {
    this.router.navigate(['login']);
  }

  countryChange(event: any) {
    const value = event?.option?.value || event?.target?.value;
    this.isIndia = value.toLowerCase() === "india";
    console.log(this.isIndia);
  }

  emailChange() {
    this.isEmailValid = this.enrollForm.controls["email"].valid;
  }

  verifyEmail() {
    const data = {
      "emailId": this.enrollForm.value.email
    }
    console.log(data);
    this.regService.postVerifyEmail(data).subscribe({
      next: (response) => {
        console.log(response);
        this.otpData = response;
        this.openOtpDial(this.otpData.otp);
      },
      error: (error) => {
      }
    });
  }

  openOtpDial(val: any) {
    let emailDialogRef = this.dialog.open(OtpComponent, {
      data: {
        emailId: this.enrollForm.value.email,
        otp: val
      },
      width: "50%",
      height: "40%"
    });

    // emailDialogRef.afterOpened().subscribe(_ => {
    //   setTimeout(() => {
    //     emailDialogRef.close();
    //   }, timeout)
    // });

    emailDialogRef.afterClosed().subscribe(data => {
      console.log("After OTP Dialog popup close");
      console.log(data);
      if (data.otpStatus == true) {
        console.log("Email id is verified");
        this.otpError = false;
        this.isEmailSended = true;
        this.isEmailVerified = true;
        this.isEmailValid = false;
      } else {
        console.log("Email id is not verified");
        this.otpError = true;
        this.isEmailSended = false;
        this.isEmailVerified = false;
      }
    });

    //if(isemailsended);
  }

  verifyotp() {
    if (this.otp?.length === 0 || !InputvalidationService.inputvalidation.isnumbers.test(this.otp)) {
      this.otpError = true;
      return;
    }

    this.otpError = false;
    this.isEmailSended = false;
    this.isEmailVerified = true;
  }

  // photoupload(event: any) {
  //   this.photoerror = this.detailsinformation.value.photo === null ? true : false
  //   this.photo = event.target.files[0]
  //   const mm = 0.2645833333
  //   const reader = new FileReader();
  //   let self = this
  //   reader.readAsDataURL(this.photo);
  //   reader.onload = (_event) => {
  //     const image = new Image()
  //     image.src = reader.result as string
  //     image.onload = function (e) {
  //       const { path } = Object(e)
  //       const [img] = path
  //       // in px
  //       const width = Math.round(img.width * mm)
  //       const height = Math.round(img.height * mm)
  //       console.log({ width, height })
  //       self.checksizeconstranit(width, height, reader.result)
  //     };
  //   }
  // }

  // checksizeconstranit(width: any, height: any, url: any) {
  //   const [prefferedwidth, preferredheight] = [51, 51]

  //   if (width <= prefferedwidth && height <= preferredheight) {
  //     console.log("it fits");
  //     this.photosizeerror = false;
  //     this.photourl = url;
  //   }
  //   else {
  //     console.log("it not fits");
  //     this.photosizeerror = true;
  //     this.detailsinformation.get('photo')?.reset();
  //   }
  // }

  termsCondition() {

    const dialogref = this.dialog.open(DialogPopupComponent, {
      data: {
        title: "Terms&Condition",
        message: "Read Terms and condition"
      },
      width: "100%"
    });

    dialogref.afterClosed().subscribe(data => {
      // this.termschecked = data
      // console.log(this.termschecked);
      return;
    });
  }


  enrollmentSubmit() {
    const timeout = 1000;
    if (!this.isEmailVerified) {
      const dialogref = this.dialog.open(DialogPopupComponent, {
        data: {
          title: "Email not Verified",
          message: "Email not Verified"
        },
        width: "30%",
        height: "25%"
      });

      dialogref.afterOpened().subscribe(_ => {
        setTimeout(() => {
          dialogref.close();
        }, timeout);
      });

      dialogref.afterClosed().subscribe(data => {
        return;
      });
    } else {
      if (this.enrollForm.valid) {
        const body = {
          "firstName": this.enrollForm.value.firstName,
          "middleName": this.enrollForm.value.middleName,
          "lastName": this.enrollForm.value.lastName,
          "emailId": this.enrollForm.value.email,
          "mobileNumber": this.enrollForm.value.mobile,
          "dateOfBirth": this.enrollForm.value.dateOfBirth,
          "genderId": {
            "genderId": this.enrollForm.value.gender
          },
          "houseNumber": this.enrollForm.value.houseNo,
          "street": this.enrollForm.value.street,
          "townCity": this.enrollForm.value.town,
          "country": this.enrollForm.value.country,
          "state": this.enrollForm.value.state,
          "pinCode": this.enrollForm.value.pincode,
          "motherTongue": this.enrollForm.value.motherTounge,
          "englishCommunicate": this.enrollForm.value.isEnglishSpoken ? "Y" : "N",
          "aboutUsId": {
            "aboutUsId": this.enrollForm.value.refferal
          },
          "termsCondition": this.enrollForm.value.termsCondition ? "Y" : "N"
        }
        this.regService.postEnrollment(body).subscribe({
          next: (response) => {
            this.openSnackBar(response)
            this.enrollForm.reset()
          },
          error: (error) => {
            // console.error(error);
          }
        });
      } else {
        this.enrollForm.markAllAsTouched();
      }
    }
  }
}
