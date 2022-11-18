import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserIdleConfig, UserIdleService } from 'angular-user-idle';
import { HeaderService } from 'src/app/core/layout/header/service/header.service';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { SendReceiveService } from 'src/app/shared/services/sendReceive.service';
import { LoginService } from '../../auth/login/services/login.service';
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
    private loginService: LoginService,
    private dataStorageService: DataStorageService,
    public sendReceiveService: SendReceiveService,
    private userIdle: UserIdleService,
    private headerService: HeaderService
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

      // this.coursebanner.reset()


    }
    else {
      console.log("invalid");
      this.coursebanner.markAllAsTouched()
    }

  }
}
