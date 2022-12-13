import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AddCourseService } from './../add-course.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';



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
  categoryList!: any
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '7rem',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    // enableToolbar: true,
    // showToolbar: true,
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

  constructor(private AddCourseService: AddCourseService, private formbuilder: FormBuilder, private _snackBar: MatSnackBar,private location:Location) {
    this.addCourseForm = this.formbuilder.group({
      courseName: [null, Validators.compose([Validators.required])],
      coursecategory: [null, Validators.compose([Validators.required])],
      applicationclosuredate: [null, Validators.compose([Validators.required])],
      // duration: [null, Validators.compose([Validators.required])],

      description: [null, Validators.compose([Validators.required])],
      startDate: [null, Validators.compose([Validators.required])],
      endDate: [null, Validators.compose([Validators.required])],
    });

    this.AddCourseService.getCategory().subscribe({
      next: (value) => {
        console.log(value);
        this.categoryList = value

      },
      error: (error) => {
        console.warn(error.message);

      }
    })
  }

  goback()
  {
    this.location.back()

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
      // "coursesId": 1,
      "categorieId": {
        "categoriesId": this.addCourseForm.value.coursecategory.categoriesId,
        "categoriesName": this.addCourseForm.value.coursecategory.categoriesName,
      },
      "coursesName": this.addCourseForm.value.courseName,
      "description": this.addCourseForm.value.description,
      "startDate": this.addCourseForm.value.startDate,
      "endDate": this.addCourseForm.value.endDate,
      "applicationClouserDate": this.addCourseForm.value.applicationclosuredate
    }
    console.log(body);


    this.AddCourseService.postadcourse(body).subscribe({
      next: (response) => {
        this.openSnackBar(response)
        this.addCourseForm.reset()
      },
      error: (error) => {
        console.error(error.message);

      }
    })
  }
}
