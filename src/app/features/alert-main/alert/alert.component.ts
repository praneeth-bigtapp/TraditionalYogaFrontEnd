import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AlertService } from '../service/alertservoce.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  disableSelect = new FormControl(false);
  alertform !: FormGroup
  category!: any
  filerror!: boolean
  durationInSeconds: number = 6
  // snackBarRef = inject(MatSnackBarRef);

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '20rem',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    // uploadUrl: 'v1/image',

    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

  constructor(
    private formbuilder: FormBuilder,
    private alertservice: AlertService,
    private _snackBar: MatSnackBar
  ) {
    this.alertform = this.formbuilder.group({
      alertid: [null, Validators.compose([Validators.required])],
      paragraph: [null, Validators.compose([Validators.required])],
      startdate: [null, Validators.compose([Validators.required])],
      enddate: [null, Validators.compose([Validators.required])],
      // file: [null, Validators.compose([Validators.required])],
      // categoryid: [null]

    })
  }


  onfilechange() {

    this.filerror = this.alertform.value.file === null ? true : false


  }

  ngOnInit(): void {


    this.alertservice.getRoles()
      .subscribe({
        next: (response) => {
          this.category = response


        },
        error: (error) => {
          console.error(error.message);

        }
      })
  }

  openSnackBar(message: any) {
    // this._snackBar.openFromComponent(AlertComponent, {
    //   duration: this.durationInSeconds * 1000,

    // });
    this._snackBar.open(message, 'Close', {
      // horizontalPosition: this.horizontalPosition,
      // verticalPosition: this.verticalPosition,
    });
  }


  onalertsubmit() {


    this.onfilechange()

    if (this.alertform.valid) {
      // only if formvalid

      // this.alertform.value.categoryid = this.category.filter((ele: any) => ele.alertId == this.alertform.value.alertid)[0].categoryId


      this.alertservice.setalert(this.alertform.value).subscribe({
        next: (response) => {
          this.alertform.reset()
          this.openSnackBar(response.message)

        },
        error: (error) => {
          console.error(error.message);

        }
      })
    }
    else {
      this.alertform.markAllAsTouched()
    }
  }

}
