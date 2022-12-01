import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WebsitemanagementService } from '../service/websitemanagement.service';

@Component({
  selector: 'app-pearlwidsom',
  templateUrl: './pearlwidsom.component.html',
  styleUrls: ['./pearlwidsom.component.css']
})
export class PearlwidsomComponent implements OnInit {

  filerror: boolean = false
  filerror2: boolean = false
  imagefiledata!: any
  auctionfiledata!: any
  wisdomform!: FormGroup
  constructor(
    private service: WebsitemanagementService,
    private formbuilder: FormBuilder,
    private _snackBar: MatSnackBar,
  ) {

    this.wisdomform = this.formbuilder.group({
      imagefile: [null, Validators.compose([Validators.required])],
      auctionfile: [null, Validators.compose([Validators.required])]
    })
  }

  ngOnInit(): void {
  }

  openSnackBar(data: any) {
    this._snackBar.open(data.message, 'Close');
  }

  onfilechange(event: any, name: string) {

    if (name === "imagefile") {

      this.filerror = this.wisdomform.value.imagefile === null ? true : false
      this.imagefiledata = event.target.files[0].name
      return
    }

    if (name === "auctionfile") {

      this.filerror2 = this.wisdomform.value.auctionfile === null ? true : false
      this.auctionfiledata = event.target.files[0].name
      return
    }
  }


  wisdomsubmit() {

    this.filerror = this.wisdomform.value.imagefile === null ? true : false

    this.filerror2 = this.wisdomform.value.auctionfile === null ? true : false


    if (this.wisdomform.invalid)
      return this.wisdomform.markAllAsTouched()

    this.wisdomform.value.imagefile = this.imagefiledata
    this.wisdomform.value.auctionfile = this.auctionfiledata

    const { imagefile, auctionfile } = this.wisdomform.value

    console.log({ imagefile, auctionfile });

  }
}
