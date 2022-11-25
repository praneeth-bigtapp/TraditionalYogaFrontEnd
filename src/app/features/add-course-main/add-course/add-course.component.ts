import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AddCourseService } from './../add-course.service';



@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  categorySelect!: any
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

  disableSelect = new FormControl(false);

  constructor(private AddCourseService: AddCourseService, ) {}

  ngOnInit(): void {
    this.AddCourseService. getCategory()
      .subscribe({
        next: (response) => {
          this.categorySelect = response


        },
        error: (error) => {
          console.error(error.message);

        }
      })
    
  }

  

}
