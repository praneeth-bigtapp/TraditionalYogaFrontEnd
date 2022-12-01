import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OnlineexamService } from '../service/onlineexam.service';

@Component({
  selector: 'app-onlineexam',
  templateUrl: './onlineexam.component.html',
  styleUrls: ['./onlineexam.component.css']
})
export class OnlineexamComponent implements OnInit {

  onlineexamform!: FormGroup
  courselist!: any
  filerror!: any

  filedata !: any

  typetestlist: any = ['Audio Dharana', 'Scotram','Text']
  testlevel: any = ['Beginner', "Intermediate", "Final", "Certified"]
  constructor(
    private formbuilder: FormBuilder,
    private service: OnlineexamService,
    private _snackBar: MatSnackBar
  ) {

    this.service.getallcourses().subscribe({
      next: (response) => {
        this.courselist = response

      },
      error: (error) => {
        console.error(error.message);

      }
    })

    this.onlineexamform = this.formbuilder.group({
      course: [null, Validators.compose([Validators.required])],
      testtype: [null, Validators.compose([Validators.required])],
      testname: [null, Validators.compose([Validators.required])],
      leveltest: [null, Validators.compose([Validators.required])],
      file: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],
    })

  }

  ngOnInit(): void {
  }

  openSnackBar(data: any) {
    this._snackBar.open(data.message, 'Close');
  }

  onfilechange(event: any) {

    this.filerror = this.onlineexamform.value.file === null ? true : false

    this.filedata = event.target.files[0].name
  }


  onlineexamsubmit() {

    this.filerror = this.onlineexamform.value.file === null ? true : false




    if (this.onlineexamform.invalid)
      return this.onlineexamform.markAllAsTouched()

    this.onlineexamform.value.file = this.filedata

    const { course, testtype, testname, leveltest, file, description } = this.onlineexamform.value


    console.log({ course, testtype, testname, leveltest, file, description });

    const body = {

    }
    this.service.postonlineexam(body).subscribe({
      next: (response) => {

        this.openSnackBar(response)

      },
      error: (error) => {
        console.error(error.message);

      }
    })


  }

}
