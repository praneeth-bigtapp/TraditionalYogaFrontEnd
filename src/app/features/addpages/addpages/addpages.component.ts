import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-addpages',
  templateUrl: './addpages.component.html',
  styleUrls: ['./addpages.component.css']
})
export class AddpagesComponent implements OnInit {
  pageName = new FormControl('', [Validators.required, ]);
  Title = new FormControl('', [Validators.required, ]);
Tags= new FormControl('', [Validators.required, ]);
  hover = new FormControl('', [Validators.required, ]);
  description = new FormControl('', [Validators.required, ]);
  subject = new FormControl('', [Validators.required, ]);
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


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onaddpage(){
    this.router.navigateByUrl("addpages");
  }
  onManage(){
    this.router.navigateByUrl("addpages");
  }
}
