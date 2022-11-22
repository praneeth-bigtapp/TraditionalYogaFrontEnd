import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    private alertservice: AlertService
  ) {
    this.alertform = this.formbuilder.group({
      category: [null, Validators.compose([Validators.required])],
      paragraph: [null, Validators.compose([Validators.required])],
      startdate: [null, Validators.compose([Validators.required])],
      enddate: [null, Validators.compose([Validators.required])],
      file: [null, Validators.compose([Validators.required])],


    })
  }


  onfilechange() {

    this.filerror = this.alertform.value.file === null ? true : false


  }

  ngOnInit(): void {


    this.alertservice.getAllAlerts()
      .subscribe({
        next: (response) => {
          this.category = response

        },
        error: (error) => {
          console.error(error.message);

        }
      })
  }


  onalertsubmit() {


    this.onfilechange()

    if (this.alertform.valid) {
      // only if formvalid
      console.log(this.alertform.value);

    }
    else {
      this.alertform.markAllAsTouched()
    }
  }

}
