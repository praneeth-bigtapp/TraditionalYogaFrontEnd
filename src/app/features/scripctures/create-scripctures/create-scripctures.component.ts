import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogPopupComponent } from 'src/app/shared/dialog-popup/dialog-popup.component';
import { ScripcturesService } from '../service/scripctures.service';

@Component({
  selector: 'app-create-scripctures',
  templateUrl: './create-scripctures.component.html',
  styleUrls: ['./create-scripctures.component.css']
})
export class CreateScripcturesComponent implements OnInit {

  category!: string
  addmediaform!: any
  timerror!: boolean
  filerror!: boolean
  filerror2!: boolean
  backcoverdata!: any
  filedata!: any
  displaycontent: boolean = true
  iseditable: boolean = false
  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private service: ScripcturesService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.addmediaform = this.formbuilder.group({
      coverimage: [null, Validators.compose([Validators.required])],
      covertitle: [null, Validators.compose([Validators.required])],
      coverdescription: [null, Validators.compose([Validators.required])],
      coverfile: [null, Validators.compose([Validators.required])],
      coverkeywords: [null, Validators.compose([Validators.required])]
    })
  }

  gobutton() {
    const classtype = this.category
    console.log(classtype);

  }
  openSnackBar(data: any) {
    this._snackBar.open(data.message, 'Close', {
      duration: 2 * 1000,
    });
  }

  add() {
    this.displaycontent = !this.displaycontent
  }

  onfilechange(formname: string, event: any) {

    if (formname === 'backcover') {
      this.filerror = this.addmediaform.value.coverimage === null ? true : false

      this.backcoverdata = event && event.target.files[0].name
      console.log(this.backcoverdata);
    }
    if (formname === 'file') {
      this.filerror2 = this.addmediaform.value.coverfile === null ? true : false
      this.filedata = event && event.target.files[0].name
      console.log(this.filedata);
    }

  }
  ontimechange() {
    this.timerror = this.addmediaform.value.videoduration === null ? true : false

  }
  reseteditable() {
    this.addmediaform.reset()
    this.iseditable = false
    this.displaycontent = !this.displaycontent
  }


  deletedetails() {
    const dialogref = this.dialog.open(DialogPopupComponent, {
      data: {
        title: "Delete Confirmation",
        message: "Are You Sure You Want To Delete this scripctures ?"
      },
      width: "25%"
    })

    dialogref.afterClosed().subscribe(data => {
      if (data) {
        //delete API 
        return
      }

    })
  }

  addmedia() {

    this.filerror = this.addmediaform.value.coverimage === null ? true : false
    this.filerror2 = this.addmediaform.value.coverfile === null ? true : false


    if (this.addmediaform.valid) {
      this.addmediaform.value.coverimage = this.backcoverdata
      this.addmediaform.value.coverfile = this.filedata


      const { coverimage, covertitle, coverdescription, coverfile, coverkeywords } = this.addmediaform.value
      console.log({ coverimage, covertitle, coverdescription, coverfile, coverkeywords })


      const body = {

      }

      this.service.postscripctures(body).subscribe({
        next: (response) => {
          console.log(response);
          this.openSnackBar(response)
        },
        error: (error) => {
          console.error(error.message);

        }
      })


    }
    else {
      console.log("invalid");

      this.addmediaform.markAllAsTouched()
    }

  }
}
