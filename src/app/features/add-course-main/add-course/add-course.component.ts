import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AddCourseService } from './../add-course.service';
import { MatSnackBar, } from '@angular/material/snack-bar';



@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
 
  disableSelect = new FormControl(false);
  filerror!: boolean
  categorySelect!: any
  addCourseForm: FormGroup = new FormGroup({});


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




  constructor(private AddCourseService: AddCourseService, private formbuilder: FormBuilder, private _snackBar: MatSnackBar) {
    // this.addCourseForm = this.formbuilder.group({
    //   categorys: [null, Validators.compose([Validators.required])],
    //   coursename: [null, Validators.compose([Validators.required])],
    //   paragraph: [null, Validators.compose([Validators.required])],
    //   banner: [null, Validators.compose([Validators.required])],
    //   Instructorname: [null, Validators.compose([Validators.required])],
    //   Application: [null, Validators.compose([Validators.required])],
    //   Image: [null, Validators.compose([Validators.required])],
    //   startdate: [null, Validators.compose([Validators.required])],
    //   endDate: [null, Validators.compose([Validators.required])],
    //   verfication: [null, Validators.compose([Validators.required])],
    // });
  
  }

  ngOnInit(): void {
   
   
    



    this.AddCourseService. getCategory()
      .subscribe({
        next: (response) => {
          this.categorySelect = response

console.log(response)
        },
        error: (error) => {
          console.error(error.message);

        }
      })

      this.addCourseForm=this.formbuilder.group({
        'category':new FormControl(''),
        'courseName': new FormControl(''),
        'startDate':new FormControl(''),
        'endDate':new FormControl(''),
        'verficationRequired':new FormControl(''),
        // 'banner':new FormControl(''),
        // 'Instructorname':new FormControl(''),
        // 'Image':new FormControl(''),
        // 'Application':new FormControl(''),
        // 'paragraph':new FormControl('')




      })
    
  }

  onAddCourse(){
    this.AddCourseService. postadcourse(this.addCourseForm.value).subscribe((data:any)=>{
      console.log(data);
      console.log("course added")
    },(err:any)=>{
      console.log(err);
    })
  }
}
  // openSnackBar(message: any) {
  //   this._snackBar.open(message, 'Close');
  // }
 
  // onAddCourse() {
    
  //   // console.log(this.addCourseForm.value)
    
  //   this.filerror = this.addCourseForm.value.file === null ? true : false


  //   if (this.addCourseForm.valid) {

  //     const body = {

  //       "category": this.addCourseForm.value.categorys,
  //       "courseName": this.addCourseForm.value.coursename,
  //       "startDate": this.addCourseForm.value.startdate,
  //       "endDate": this.addCourseForm.value.enddate
  //     }
  //     console.log(body)
  //     this.AddCourseService.postadcourse(body).subscribe({
  //       next: (response) => {
  //         this.addCourseForm.reset()
  //         this.openSnackBar(response.message)

  //       },
  //       error: (error) => {
  //         console.error(error.message);

  //       }
  //     })
  //   }
  //   else {
  //     this.addCourseForm.markAllAsTouched()
  //   }
  // }
  // }


