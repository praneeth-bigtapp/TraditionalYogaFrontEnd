import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AddCourseService } from './../add-course.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  disableSelect = new FormControl(false);
  filerror!: boolean
  categorySelect!: any
  addCourseForm!: FormGroup
  paragrapherror: boolean = false
  categoryList: any = ["Online Course by Guruji", "Meditation Retreat by Guruji", "Two Day Meditation by Guruji", "Guided Medidation by Volunteers", "In-person Training by Volunteers", "Others"
  ]


  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '16rem',
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


  openSnackBar(data: any) {
    this._snackBar.open(data.message, 'Close');
  }

  constructor(private AddCourseService: AddCourseService, private formbuilder: FormBuilder, private _snackBar: MatSnackBar) {
    this.addCourseForm = this.formbuilder.group({
      courseName: [null, Validators.compose([Validators.required])],
      coursecategory: [null, Validators.compose([Validators.required])],
      applicationclosuredate: [null, Validators.compose([Validators.required])],

      description: [null, Validators.compose([Validators.required])],
      startDate: [null, Validators.compose([Validators.required])],
      endDate: [null, Validators.compose([Validators.required])],
    });

  }

  ngOnInit(): void {

  }

  paragraphchange() {

    this.paragrapherror = this.addCourseForm.value.description === null ? true : false

  }

  onAddCourse() {

    this.paragraphchange()
    if (this.addCourseForm.invalid)
      return this.addCourseForm.markAllAsTouched()

    const body = {

      "courseName": this.addCourseForm.value.courseName,
      "startDate": this.addCourseForm.value.startDate,
      "endDate": this.addCourseForm.value.endDate,
      "category": this.addCourseForm.value.coursecategory,
      "paragraph": this.addCourseForm.value.description,
      "applicationclosuredate": this.addCourseForm.value.applicationclosuredate
    }

    console.log(body);


    this.AddCourseService.postadcourse(body).subscribe({
      next: (response) => {
        this.openSnackBar(response)
      },
      error: (error) => {
        console.error(error.message);

      }
    })
  }
}
