import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OnlineexamService } from '../service/onlineexam.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {

  taskform!: FormGroup
  filerror: boolean = false
  course!: any

  filedata!: any
  pageno: number = 1

  constructor(
    public dialogRef: MatDialogRef<TaskCreateComponent>,
    private formbuilder: FormBuilder,
    private service: OnlineexamService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    console.log(data);
    this.course = data.courses

    this.taskform = this.formbuilder.group({
      name: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],
      mediafile: [null, Validators.compose([Validators.required])],
      duedate: [null, Validators.compose([Validators.required])],
    })

  }
  ngOnInit(): void {
  }

  openSnackBar(data: any) {
    this._snackBar.open(data.message, 'Close', {
      duration: 2 * 1000,
    });
  }

  fileupload(event: any) {

    this.filerror = this.taskform.value.mediafile === null ? true : false

    this.filedata = event.target.files[0].name
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: null });
  }

  onpaginatechange(event: any) {
    if (event.pageIndex === 0) {
      this.pageno = 1
      return
    }
    this.pageno = (event.pageIndex * event.pageSize) + 1
    return
  }


  tasksubmit() {
    this.filerror = this.taskform.value.mediafile === null ? true : false

    if (this.taskform.invalid)
      return this.taskform.markAllAsTouched()

    this.taskform.value.mediafile = this.filedata


    const { name, description, mediafile, duedate } = this.taskform.value
    console.log({ name, description, mediafile, duedate });


    const body = {
      "taskName": name,
      "coursesId": {
        "coursesId": this.course
      },
      "description": description,
      "mediafile": mediafile,
      "dueDate": duedate
    }

    console.log(body);


    this.service.posttask(body).subscribe({
      next: (response) => {

        this.openSnackBar(response)
        this.taskform.reset()


      },
      error: (error) => {
        console.error(error.message);

      }
    })

  }
}
