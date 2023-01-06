import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { PopupInfoComponent } from '../popup-info/popup-info.component';

@Component({
  selector: 'app-write-gratitude',
  templateUrl: './write-gratitude.component.html',
  styleUrls: ['./write-gratitude.component.css']
})
export class WriteGratitudeComponent implements OnInit {

  displaycontent: boolean = false
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '8rem',
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
  dialogRef: any;
  info(){
   this.dialogRef= this.dialog.open(PopupInfoComponent,{
    height:'50%',
    width:'30%'
   });
  
    
    
   

  
  }

  constructor(public dialog: MatDialog) { 
    this.info()
  }

  ngOnInit(): void {
  }


}
