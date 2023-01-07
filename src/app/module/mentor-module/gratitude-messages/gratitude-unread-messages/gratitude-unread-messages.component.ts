import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { data } from 'jquery';
import { GratitudeMessagesService } from 'src/app/data/services/mentor-module/gratitude-messages/gratitude-messages.service';

@Component({
  selector: 'app-gratitude-unread-messages',
  templateUrl: './gratitude-unread-messages.component.html',
  styleUrls: ['./gratitude-unread-messages.component.css']
})
export class GratitudeUnreadMessagesComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  gridData = [];
  filterData: any;

  pageno: number = 1

  dataSource: any;
  displayedColumns: string[] = ['SNo', 'dateTime', 'studentName', "message", "Action"];
  data: any;
  selectedMessage: any;
  editorConfig: AngularEditorConfig = {
    editable: false,
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
  constructor(
    private activeroute: ActivatedRoute,
    private service: GratitudeMessagesService,
    private router: Router

  ) {
    console.log(this.activeroute.snapshot.paramMap.get('id'));

  }

  ngOnInit(): void {
    this.filterData = {
      filterColumnNames: this.displayedColumns.map((ele: any) => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };
    this.getUnreadData()
  }
  rendertabledata(data: any) {
    this.dataSource = new MatTableDataSource<any>(data)
    this.filterData.gridData = data;
    this.filterData.dataSource = this.dataSource;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.filterData.sort = this.sort;
    for (let col of this.filterData.filterColumnNames) {
      col.Value = '';
    }
  }

  updatePagination() {
    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort
  }
  onpaginatechange(event: any) {
    if (event.pageIndex === 0) {
      this.pageno = 1
      return
    }
    this.pageno = (event.pageIndex * event.pageSize) + 1
    return
  }

  getUnreadData() {
    this.data = [{
      "dateTime": new Date(),
      "studentName": "Ramesh",
      "message": "Messages"
    },
    {
      "dateTime": new Date(),
      "studentName": "Sumesh",
      "message": "Sumuesh messages"
    }]

    this.rendertabledata(this.data)

  }

  viewdetails(element: any) {
    this.selectedMessage = element
  }

  acceptMessage() {
    this.selectedMessage = null
  }
  deniedMessage() {
    this.selectedMessage = null
  }
  backtoSummary() {
    this.router.navigate(['mentor/gratitudeSummary'])
  }
}
