import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, startWith, map } from 'rxjs';
import { DialogPopupComponent } from 'src/app/shared/dialog-popup/dialog-popup.component';
import { InputvalidationService } from 'src/app/shared/services/inputvalidation.service';
import { RegistrationService } from '../service/registration.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-studentenrollment',
  templateUrl: './studentenrollment.component.html',
  styleUrls: ['./studentenrollment.component.css']
})
export class StudentenrollmentComponent implements OnInit {

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
  isemailvalid: boolean = false
  photosizeerror: boolean = false


  constructor(
    private formbuilder: FormBuilder,
    private service: RegistrationService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private http: HttpClient,
    private zone: NgZone


  ) {
    this.formdetails = this.formbuilder.group({
      firstname: [null, Validators.compose([Validators.required])],
      middlename: [null],
      lastname: [null, Validators.compose([Validators.required])],
      // name: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      mobile: [null, Validators.compose([Validators.required, Validators.pattern(InputvalidationService.inputvalidation.phonenumber)])],
      mothertounge: [null, Validators.compose([Validators.required])],
      isenglishspoken: [null, Validators.compose([Validators.required])],
      dateofbirth: [null, Validators.compose([Validators.required])],
      gender: [null, Validators.compose([Validators.required])],
      houseno: [null, Validators.compose([Validators.pattern(InputvalidationService.inputvalidation.isnumbers)])],
      street: [null, Validators.compose([])],
      town: [null, Validators.compose([])],
      state: [null],
      country: [null, Validators.compose([])],
      pincode: [null, Validators.compose([Validators.pattern(InputvalidationService.inputvalidation.isnumbers)])],
      refferal: [null, Validators.compose([Validators.required])],
      termscondition: [null, Validators.compose([Validators.required])],

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

    // this.service.getindiastates().subscribe({
    //   next: (response) => {
    //     this.statelist = response
    //     console.log(this.statelist);

    //   },
    //   error: (error) => {
    //     console.error(error.message);
    //   }
    // })
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

  // convertmmtopixel(value: any) {
  //   return Number(value) * 3.7795275591
  // }

  convertPixelstoMM(value: any) {
    return Number(value) * 0.2645833333

  }


  private ipRegex = new RegExp(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/);
  getRTCPeerConnection() {
    return window.RTCPeerConnection
  }
  private determineLocalIp() {
    const RTCPeerConnections = this.getRTCPeerConnection();

    const pc = new RTCPeerConnection({ iceServers: [] });
    pc.createDataChannel('');
    pc.createOffer().then(pc.setLocalDescription.bind(pc));

    pc.onicecandidate = (ice) => {
      this.zone.run(() => {
        if (!ice || !ice.candidate || !ice.candidate.candidate) {
          return;
        }

        const localIp = ice.candidate.candidate;
        console.log(localIp)
        pc.onicecandidate = () => { };
        pc.close();
      });
    };
  }

  getIPAddress() {
    this.determineLocalIp()
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
    console.log(this.isIndia)

  }


  emailchange() {
    this.isemailvalid = this.formdetails.controls["email"].valid
  }
  sendemail() {

    const timeout = 1000
    const dialogref = this.dialog.open(DialogPopupComponent, {
      data: {
        title: "Email not Verified",
        message: "OTP has been mailed"
      },
      width: "30%",
      height: "25%"
    })

    dialogref.afterOpened().subscribe(_ => {
      setTimeout(() => {
        dialogref.close();
      }, timeout)
    })

    dialogref.afterClosed().subscribe(data => {
      return
    })

    //if(isemailsended)
    this.otperror = false
    this.isemailsended = true
    this.isemailverified = false
  }
  verifyotp() {


    if (this.otp?.length === 0 || !InputvalidationService.inputvalidation.isnumbers.test(this.otp)) {
      this.otperror = true
      return
    }

    this.otperror = false
    this.isemailsended = false
    this.isemailverified = true
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


  enrollmentsubmit() {
    const timeout = 1000
    if (!this.isemailverified) {
      const dialogref = this.dialog.open(DialogPopupComponent, {
        data: {
          title: "Email not Verified",
          message: "Email not Verified"
        },
        width: "30%",
        height: "25%"
      })

      dialogref.afterOpened().subscribe(_ => {
        setTimeout(() => {
          dialogref.close();
        }, timeout)
      })

      dialogref.afterClosed().subscribe(data => {
        return
      })
    }
    if (this.formdetails.invalid)
      return this.formdetails.markAllAsTouched()

    const { firstname, middlename, lastname, refferal, termscondition, email, mobile, mothertounge, isenglishspoken, dateofbirth, gender, houseno, street, town, state, country, pincode } = this.formdetails.value

    const body = {
      "firstName": firstname,
      "middleName": middlename,
      "lastName": lastname,
      "emailId": email,
      "mobileNumber": mobile,
      "dateOfBirth": dateofbirth,
      "genderId": {
        "genderId": gender
      },
      "houseNumber": houseno,
      "street": street,
      "townCity": town,
      "country": country,
      "state": state,
      "pinCode": pincode,
      "motherTongue": mothertounge,
      "englishCommunicate": isenglishspoken ? "Y" : "N",
      "aboutUsId": {
        "aboutUsId": refferal
      },
      "termsCondition": termscondition ? "Y" : "N"
    }
    this.service.postenrollment(body).subscribe({
      next: (response) => {
        this.openSnackBar(response)
        this.formdetails.reset()
      },
      error: (error) => {
        console.error(error.message);

      }
    })
  }




}
