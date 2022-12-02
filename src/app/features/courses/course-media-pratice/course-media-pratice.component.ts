import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CoursesService } from '../courses.service';


export interface CourseData {
  no: string,
  title: string,
  description: string,
  mediatype: string,
  timeadded: string,
  keywords: string,

}


@Component({
  selector: 'app-course-media-pratice',
  templateUrl: './course-media-pratice.component.html',
  styleUrls: ['./course-media-pratice.component.css']
})



export class CourseMediaPraticeComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  filterData: any;
  gridData = [];
  dataSource: any
  categoryerror: boolean = false

  addmediaform!: FormGroup
  data!: any

  classtype!: string
  filerror!: boolean
  timerror!: boolean
  displaycontent: boolean = true

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
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

  displayedColumns = ['id', 'title', 'description', 'duration', 'metaKeyword', 'buttons']
  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private service: CoursesService
  ) {


    this.service.getcoursemedia().subscribe({
      next: (response) => {
        console.log(response);
        this.data = response

        this.dataSource = new MatTableDataSource<any>(this.data)
        this.filterData.gridData = this.data;
        this.filterData.dataSource = this.dataSource;
        this.filterData.paginator = this.paginator
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.filterData.sort = this.sort;
        for (let col of this.filterData.filterColumnNames) {
          col.Value = '';
        }

      },
      error: (error) => {
        console.error(error.message);

      }
    })

    this.filterData = {
      filterColumnNames: this.displayedColumns.map((ele: any) => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };


    console.log(this.filterData);




  }

  ngOnInit(): void {
    this.addmediaform = this.formbuilder.group({
      videolink: [null, Validators.compose([Validators.required])],
      videotitle: [null, Validators.compose([Validators.required])],
      videodescription: [null, Validators.compose([Validators.required])],
      videoduration: [null, Validators.compose([Validators.required])],
      vidoemetakeywords: [null, Validators.compose([Validators.required])],
      imagetitle: [null, Validators.compose([Validators.required])],
      paragraph: [null, Validators.compose([Validators.required])],
      imagekeywords: [null, Validators.compose([Validators.required])],
      mediafile: [null, Validators.compose([Validators.required])],
      mediatitle: [null, Validators.compose([Validators.required])],
      mediadescription: [null, Validators.compose([Validators.required])],
      mediametakeywords: [null, Validators.compose([Validators.required])],
    })
  }

  ngAfterViewInit() {
    this.filterData.dataSource.paginator = this.paginator;
  }

  updatePagination() {
    this.filterData.dataSource.paginator = this.paginator;
  }
  typechange() {

    this.displaycontent = false
    this.categoryerror = false
    if (!this.classtype) {
      this.categoryerror = true
      return
    }
  }
  gobutton() {
    if (!this.classtype) {
      this.displaycontent = false
      this.categoryerror = true
      return
    }

    this.displaycontent = true
    this.categoryerror = false

    const classtype = this.classtype
    console.log(classtype);


  }

  ontimechange() {
    this.timerror = this.addmediaform.value.videoduration === null ? true : false

  }
  onfilechange() {
    this.filerror = this.addmediaform.value.mediafile === null ? true : false
  }

  viewmanage(data: any) {
    console.log(data);

  }
  addmedia() {

    this.onfilechange()
    this.ontimechange()


    if (this.addmediaform.valid) {

      const result = this.addmediaform.value

      console.log(result);


    }
    else {
      console.log("invalid");

      this.addmediaform.markAllAsTouched()
    }

  }

}
