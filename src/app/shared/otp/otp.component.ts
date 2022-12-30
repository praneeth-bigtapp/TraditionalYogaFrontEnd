import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegistrationService } from 'src/app/studentmodule/registration/service/registration.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  otpForm !: FormGroup;
  otpStatus: Boolean = false;

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
          Validators.minLength(1),
          Validators.maxLength(6),
        ]),
      ]
    });
  }

  onSubmit() {
    console.log(this.data);
    console.log(this.otpForm);
    console.log(this.otpForm.controls['otp'].hasError('minLength'));
    console.log(this.otpForm.controls['otp'].hasError('maxLength'));

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
    }
  }

}
