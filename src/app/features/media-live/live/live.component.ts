import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LiveclassService } from '../service/liveclass.service';
import { MatSnackBar, } from '@angular/material/snack-bar';


@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit {


  courselist!: any
  categorylist!: any
  coursename!: any
  categoryerror: boolean = false
  filerror!: boolean

  glimpseform !: FormGroup
  videoform!: FormGroup
  shortvideoform!: FormGroup


  constructor(
    private service: LiveclassService,
    private formbuilder: FormBuilder,
    private _snackBar: MatSnackBar

  ) {

    service.getallcourse().subscribe({
      next: (response) => {

        this.courselist = response

      },
      error: (error) => {
        console.error(error.message);

      }
    })

    service.getcoursemediacategory().subscribe({
      next: (response) => {

        this.categorylist = response

      },
      error: (error) => {
        console.error(error.message);

      }
    })
    this.videoform = this.formbuilder.group({
      videolink: [null, Validators.compose([Validators.required])],
      date: [null, Validators.compose([Validators.required])],
      title: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],

    })

    this.shortvideoform = this.formbuilder.group({
      videolink: [null, Validators.compose([Validators.required])],
      date: [null, Validators.compose([Validators.required])],
      duration: [null, Validators.compose([Validators.required])],
      category: [null, Validators.compose([Validators.required])],
      title: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],

    })
    this.glimpseform = this.formbuilder.group({

      date: [null, Validators.compose([Validators.required])],
      file: [null, Validators.compose([Validators.required])],


    })

  }
  openSnackBar(data: any) {
    this._snackBar.open(data.message, 'Close');
  }

  coursechange() {


    this.categoryerror = false
    if (this.coursename == undefined || this.coursename == null) {
      this.categoryerror = true
    }

  }
  ngOnInit(): void {

  }

  filechange(event: any) {
    this.filerror = this.glimpseform.value.file === null ? true : false

    const file = event.target.files[0]
    this.glimpseform.value.file = file.name



  }

  videoformsubmit() {
    if (this.videoform.invalid)
      return this.videoform.markAllAsTouched()


    const { videolink, date, title, description } = this.videoform.value

    const body = {
      "courseLink": videolink,
      "date": date,
      "title": title,
      "description": description
    }


    this.service.postvideo(body).subscribe({
      next: (response) => {

        this.videoform.reset()

        this.openSnackBar(response)


      },
      error: (error) => {
        console.error(error.message);

      }
    })

  }

  shortvideoformsubmit() {

    if (this.shortvideoform.invalid)
      return this.shortvideoform.markAllAsTouched()


    const { videolink, date, duration, category, title, description } = this.shortvideoform.value

    const body = {
      "courseLink": videolink,
      "date": date,
      "duration": duration,
      "title": title,
      "categoryId": category,
      "description": description

    }


    this.service.postshortvideo(body).subscribe({
      next: (response) => {

        this.shortvideoform.reset()

        this.openSnackBar(response)


      },
      error: (error) => {
        console.error(error.message);

      }
    })

  }

  glimpseformsubmit() {
    this.filerror = this.glimpseform.value.file === null ? true : false

    if (this.glimpseform.invalid)
      return this.glimpseform.markAllAsTouched()


    const { date, file } = this.glimpseform.value

    const body = {
      "date": date,
      "fileName": file
    }



    this.service.postglimpsevideo(body).subscribe({
      next: (response) => {

        this.glimpseform.reset()

        this.openSnackBar(response)


      },
      error: (error) => {
        console.error(error.message);

      }
    })


  }

}
