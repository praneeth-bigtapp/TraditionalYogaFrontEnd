import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-addpages',
  templateUrl: './addpages.component.html',
  styleUrls: ['./addpages.component.css']
})
export class AddpagesComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  selection = new SelectionModel<any>(true, []);
  data = [{ "Pagename": "About US", "Author": 'admin', 'Dateofpublish': '02,Aug,2022, 12:30:37', "lastmodified": '02,Aug,2022, 12:30:37', "link": "https://tradiationalyoga.co.in/aboutus", "status": "published" },
  { "Pagename": "About US1", "Author": 'admin', 'Dateofpublish': '02,Aug,2022, 12:30:37', "lastmodified": '02,Aug,2022, 12:30:37', "link": "https://tradiationalyoga.co.in/about", "status1": "published1" },
  { "Pagename": "About US", "Author1": 'admin1', 'Dateofpublish': '02,Aug,2022, 12:30:37', "lastmodified": '03,Aug,2022, 12:30:37', "links": "https://tradiationalyoga.co.in/about", "status": "published" },
  { "Pagename": "About US3", "Author": 'admin', 'Dateofpublish1': '04,Aug,2022, 12:30:37', "lastmodified": '02,Aug,2022, 12:30:37', "link": "https://tradiationalyoga.co.in/about", "status": "published3" },
  { "Pagename": "About US", "Author3": 'admin', 'Dateofpublish': '02,Aug,2022, 12:30:37', "lastmodified": '02,Aug,2022, 12:30:37', "link": "https://tradiationalyoga.co.in/about", "status3": "published" },
  { "Pagename": "About US", "Author": 'admin3', 'Dateofpublish3': '02,Aug,2022, 12:30:37', "lastmodified": '04,Aug,2022, 12:30:37', "linked": "https://tradiationalyoga.co.in/about", "status": "published" },
  { "Pagename": "About US", "Author": 'admin', 'Dateofpublish': '03,Aug,2022, 12:30:37', "lastmodified": '02,Aug,2022, 12:30:37', "link": "https://tradiationalyoga.co.in/about", "status": "published" },
  { "Pagename": "About US", "Author": 'bdmin', 'Dateofpublish': '02,Aug,2022, 12:30:37', "lastmodified": '02,Aug,2022, 12:30:37', "link": "https://tradiationalyoga.co.in/about", "status": "published" }]
  gridData: any;
  addCourseForm!: FormBuilder;
  elementvalue = {}
  dataSource: any;
  displayedColumns: string[] = ["Checkbox", "Pagename", "Author", 'Dateofpublish', 'lastmodified', 'link', 'status', 'Action'];
  iseditable: boolean = false
  paragrapherror: boolean = false

  displaycontent: boolean = false

  pageName = new FormControl('', [Validators.required,]);
  Title = new FormControl('', [Validators.required,]);
  Tags = new FormControl('', [Validators.required,]);
  hover = new FormControl('', [Validators.required,]);
  description = new FormControl('', [Validators.required,]);
  subject = new FormControl('', [Validators.required,]);
  Description = new FormControl('', [Validators.required,]);
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
  name: any
  filterData: any;

  
  constructor(private router: Router, private route: ActivatedRoute) {
    this.name = this.route.snapshot.paramMap.get("element")
    console.log(this.name)
  }

  updatePagination() {

    this.filterData.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit() {
    this.filterData.dataSource.paginator = this.paginator;

  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.filterData.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.filterData.dataSource.data.forEach((row: any) => this.selection.select(row));
  }
  addPages() {
    this.displaycontent = !this.displaycontent
  }
  reseteditable() {
    // this.addCourseForm.reset()
    this.iseditable = false
    this.displaycontent = !this.displaycontent
  }

  paragraphchange() {
    this.paragrapherror = this.Description.value.length === 0 ? true : false

  }

  ngOnInit(): void {
    // this.addcourse();

    this.filterData = {
      filterColumnNames: this.displayedColumns.map(ele => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    }
    this.dataSource = new MatTableDataSource<any>(this.data)
    this.filterData.gridData = this.data;
    this.filterData.dataSource = this.dataSource;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.filterData.sort = this.sort;
    for (let col of this.filterData.filterColumnNames) {
      col.Value = '';
    }

    // onaddpage(){
    // this.router.navigateByUrl("addpages");
    // }

  }
  onManage() {
    this.router.navigateByUrl("pages");
  }

  addpagesubmit() {
    this.paragraphchange()
  }
}
