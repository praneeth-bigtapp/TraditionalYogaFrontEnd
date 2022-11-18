import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Router } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';
import { HeaderService } from 'src/app/core/layout/header/service/header.service';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { SendReceiveService } from 'src/app/shared/services/sendReceive.service';
import { LoginService } from '../../auth/login/services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AngularEditorConfig } from '@kolkov/angular-editor';


export interface CourseData {
  no: string,
  title: string,
  description: string,
  mediatype: string,
  timeadded: string,
  keywords: string,

}

const coursedata: CourseData[] = [
  { no: "1", title: "Traditionals Yoga", description: "Descriptions", mediatype: "Images", timeadded: "-", keywords: "key", },
  { no: "2", title: "Traditionals Yoga", description: "Descriptions", mediatype: "Images", timeadded: "-", keywords: "key", },
  { no: "3", title: "Traditionals Yoga", description: "Descriptions", mediatype: "Images", timeadded: "-", keywords: "key", },
  { no: "4", title: "Traditionals Yoga", description: "Descriptions", mediatype: "Images", timeadded: "-", keywords: "key", },
  { no: "5", title: "Traditionals Yoga", description: "Descriptions", mediatype: "Images", timeadded: "-", keywords: "key", },
  { no: "6", title: "Traditionals Yoga", description: "Descriptions", mediatype: "Images", timeadded: "-", keywords: "key", },
  { no: "7", title: "Traditionals Yoga", description: "Descriptions", mediatype: "Images", timeadded: "-", keywords: "key", },
  { no: "8", title: "Traditionals Yoga", description: "Descriptions", mediatype: "Images", timeadded: "-", keywords: "key", },
  { no: "9", title: "Traditionals Yoga", description: "Descriptions", mediatype: "Images", timeadded: "-", keywords: "key", },
  { no: "10", title: "Traditionals Yoga", description: "Descriptions", mediatype: "Images", timeadded: "-", keywords: "key", },
  { no: "11", title: "Traditionals Yoga", description: "Descriptions", mediatype: "Images", timeadded: "-", keywords: "key", },

]
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

  addmediaform!: FormGroup

  classtype!: string
  filerror!: boolean
  timerror!: boolean

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


  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private loginService: LoginService,
    private dataStorageService: DataStorageService,
    public sendReceiveService: SendReceiveService,
    private userIdle: UserIdleService,
    private headerService: HeaderService
  ) {

    this.filterData = {
      filterColumnNames: [
        { "Key": 'no', "Value": "" },
        { "Key": 'title', "Value": "" },
        { "Key": 'description', "Value": "" },
        { "Key": 'mediatype', "Value": "" },
        { "Key": 'timeadded', "Value": "" },
        { "Key": 'keywords', "Value": "" },

      ],
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };

    this.dataSource = new MatTableDataSource<any>(coursedata)
    this.filterData.gridData = coursedata;
    this.filterData.dataSource = this.dataSource;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.filterData.sort = this.sort;
    for (let col of this.filterData.filterColumnNames) {
      col.Value = '';
    }

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




  displayedColumns = ['SNO', 'Title', 'Description', 'Media Type', 'Time added', 'Keywords', 'View/Manage']

  updatePagination() {

    this.dataSource.paginator = this.paginator;
  }

  gobutton() {
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
