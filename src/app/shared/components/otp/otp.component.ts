import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegistrationService } from 'src/app/data/services/student-module/registration/registration.service';
import { InputvalidationService } from '../../services/input-validation.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  otpForm !: FormGroup;
  otpStatus: Boolean = false;
  errorMessage: string = ""

  constructor(
    public dialogRef: MatDialogRef<OtpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private regService: RegistrationService
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.otpForm = this.fb.group({
      otp: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(InputvalidationService.inputvalidation.isnumbers)
        ]),
      ]
    });
  }

  onSubmit() {
    console.log(this.data);


    if (this.otpForm.invalid)
      return this.otpForm.markAllAsTouched()
    let generatedOtp = this.data.otp;
    let currentOtp = this.otpForm.value.otp;

    console.log(generatedOtp);
    console.log(currentOtp);

    this.otpStatus = generatedOtp == currentOtp;
    console.log(this.otpStatus);
    if (this.otpStatus) {
      console.log("valid Otp");
      const data = {
        "otpStatus": true
      };
      this.dialogRef.close(data);
    } else {
      console.log("invalid Otp");
      this.errorMessage = "Invalid OTP"
    }
  }

}
