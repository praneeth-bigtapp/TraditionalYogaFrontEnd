import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CreatepraticelibraryService } from '../service/createpraticelibrary.service';

@Component({
  selector: 'app-create-pratice-library',
  templateUrl: './create-pratice-library.component.html',
  styleUrls: ['./create-pratice-library.component.css']
})
export class CreatePraticeLibraryComponent implements OnInit {

  category!: string
  addmediaform!: any
  timerror!: boolean
  categoryerror: boolean = false
  displaycontent: boolean = true


  categoryList!: any
  constructor(
    private formbuilder: FormBuilder,
    private service: CreatepraticelibraryService,
    private _snackBar: MatSnackBar
  ) {

    this.service.getcategory().subscribe({
      next: (response) => {
        this.categoryList = response

      },
      error: (error) => {
        console.error(error.message);

      }
    })

  }

  ngOnInit(): void {
    this.addmediaform = this.formbuilder.group({
      category: [null, Validators.compose([Validators.required])],
      videolink: [null, Validators.compose([Validators.required])],
      videotitle: [null, Validators.compose([Validators.required])],
      videodescription: [null, Validators.compose([Validators.required])],
      videoduration: [null, Validators.compose([Validators.required])],
      vidoemetakeywords: [null, Validators.compose([Validators.required])]
    })
  }

  opensnackBar(data: any) {
    this._snackBar.open(data.message, 'Close')
  }

  coursechange() {
    this.displaycontent = false

    if (this.category)
      this.categoryerror = false
  }

  gobutton() {
    if (this.category)
      this.displaycontent = true
    else
      this.categoryerror = true
  }


  addmedia() {


    if (this.addmediaform.valid) {

      const { category, videolink, videotitle, videodescription, videoduration, vidoemetakeywords } = this.addmediaform.value


      const body = {
        "videoLink": videolink,
        "duration": videoduration,
        "title": videotitle,
        "message": videodescription,
        "metaKeyword": vidoemetakeywords
      }

      console.log(body);

      this.service.postpraticelibrary(body, category).subscribe({
        next: (response) => {

          this.addmediaform.reset()
          // this.opensnackBar(response)
          this.opensnackBar({ message: "Library Created" })

        },
        error: (error) => {
          console.error(error.message);

        }
      })

    }
    else {
      this.addmediaform.markAllAsTouched()
    }

  }
}
