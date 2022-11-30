import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private service: ScripcturesService,
    private _snackBar: MatSnackBar
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
    this._snackBar.open(data.message, 'Close');
  }
  onfilechange(formname: string) {

    if (formname === 'backcover')
      this.filerror = this.addmediaform.value.coverimage === null ? true : false

    if (formname === 'file')
      this.filerror2 = this.addmediaform.value.coverfile === null ? true : false

  }
  ontimechange() {
    this.timerror = this.addmediaform.value.videoduration === null ? true : false

  }
  addmedia() {

    this.onfilechange('backcover')
    this.onfilechange('file')

    if (this.addmediaform.valid) {

      const { coverimage, covertitle, coverdescription, coverfile, coverkeywords } = this.addmediaform.value


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
