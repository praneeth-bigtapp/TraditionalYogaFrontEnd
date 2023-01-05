import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MemberService } from '../services/member.service';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-memberspage',
  templateUrl: './memberspage.component.html',
  styleUrls: ['./memberspage.component.css']
})
export class MemberspageComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  selection = new SelectionModel<any>(true, []);

  serialnumber: any = Number(1)

  filterData: any;
  categoryerror: boolean = false
  gridData = [];
  dataSource: any;
  totalUserApplied: any;
  totalUser: any;
  displayform: boolean = false
  isedit: boolean = false

  displayedColumns: string[] = ['studentId', 'Image', 'name', "emailId", "address", "genderId", "mentorId", "ChiefMentorId", "Status", "View_Profile"];

  selectedmember!: any
  formtype: string = "Members"
  // data: any;
  displaycontent: boolean = false

  data!: any

  downloadurl!: string

  pageno: number = 1
  category!: string
  courselist!: any
  memberform!: FormGroup

  agelist = Array.from({ length: 10 }, (_, i) => i + 18)

  countryList!: any
  regionList!: any
  countryfilter !: Observable<any>
  regionfilter !: Observable<any>

  constructor(
    private memberservice: MemberService,
    private _formbuilder: FormBuilder,
  ) {

    this.memberform = this._formbuilder.group({
      name: [null],
      email: [null],
      country: [null],
      mobile: [null],
      region: [null],
      agefrom: [null],
      ageto: [null],
      gender: [null],
      status: [null],
      usertype: [null],
    })

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

    this.memberservice.getcountry().subscribe({
      next: (response) => {

        this.countryList = response
        this.countryList = this.countryList.map((ele: any) => ele.countryName)

      },
      error: (error) => {
        console.error(error.message);

      }
    })
    this.memberservice.getregionlist().subscribe({
      next: (response) => {

        this.regionList = response

        this.regionList = this.regionList.map((ele: any) => ele.regionName)
        console.log(this.regionList);



      },
      error: (error) => {
        console.error(error.message);

      }
    })


  }
  updatePagination(col: any) {

    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {

    this.memberservice.getallcourses().subscribe({
      next: (response) => {
        this.courselist = response
      },
      error: (error) => {
        console.error(error.message);

      }
    })

    this.countryfilter = this.memberform.valueChanges.pipe(
      startWith(''),
      map(value => this.countryList.filter((ele: any) => ele.toLowerCase().includes(value.country?.toLowerCase()))),
    )


    this.regionfilter = this.memberform.valueChanges.pipe(
      startWith(''),
      map(value => this.regionList.filter((ele: any) => ele.toLowerCase().includes(value.region?.toLowerCase()))),
    )


  }
  ngAfterViewInit() {
    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort;
  }

  getmemberslist(category: any) {
    this.memberservice.getmembers().subscribe({
      next: (response) => {
        this.data = response
        this.totalUser = this.data.userMapped;
        this.totalUserApplied = this.data.userApplied;
        this.data = this.data.students

        console.log(this.data);


        this.data = this.data.filter((ele: any) => ele.courseId.courseId === this.category)

        this.data = this.data.reverse()

        this.dataSource = new MatTableDataSource<any>(this.data)
        this.filterData.gridData = this.data;
        this.filterData.dataSource = this.dataSource;
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
  }

  getmentorlist() {
    this.memberservice.getmentor().subscribe({
      next: (response) => {
        this.data = response
        this.data = this.data.students

        this.dataSource = new MatTableDataSource<any>(this.data)
        this.filterData.gridData = this.data;
        this.filterData.dataSource = this.dataSource;
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
  }

  onpaginatechange(event: any) {
    if (event.pageIndex === 0) {
      this.pageno = 1
      return
    }
    this.pageno = (event.pageIndex * event.pageSize) + 1
    return
  }


  reseteditable() {
    this.memberform.reset()
    this.isedit = false
    this.displayform = !this.displayform
  }
  coursechange() {

    if (!this.category) {
      this.categoryerror = true
      return
    }
    this.displaycontent = true
    this.displayform = true
    this.categoryerror = false
    this.getmemberslist(this.category)

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

  viewprofile(element: any) {
    console.log(element);

  }

  // viewcourseactivity(data: any) {
  //   console.log(data);

  // }

  // viewexemption(data: any) {
  //   console.log(data);

  // }

  selectmember(event: any, data: any) {
    console.log(data);
  }

  downloadexcel() {


    // const headers = Object.keys(this.data[0]).join(",") + "\n"


    // let content = headers



    // content += this.data.map((ele: any) => Object.values(ele).map((ele: any) => {
    //   if (ele) {
    //     if (typeof ele === "object")
    //       return Object.values(ele).join(",") + "\n"
    //     return ele

    //   }
    //   return "Nil"
    // })
    // ).join("\n")

    // console.log(content);
    // const mimetype = 'text/csv;encoding:utf-8'

    // const fileblob = new Blob([content], {
    //   type: mimetype
    // })

    // var anchor = document.createElement("a");
    // anchor.download = `${this.category}-members.csv`;
    // anchor.href = URL.createObjectURL(fileblob);
    // anchor.click();


  }

  gendername(id: number) {
    if (id === 1)
      return "Male"
    if (id === 2)
      return "Female"

    return "Transgender"

  }

  memberformsubmit() {

    if (this.memberform.invalid)
      return this.memberform.markAllAsTouched()

    const formvalue = this.memberform.value

    console.log(formvalue);


    if (this.formtype == "Members") {
      // memberform
      console.log("memberform");

      return
    }

    if (this.formtype == "Mentor Mapping") {
      // member mapping form
      console.log("mentor mapping form");

      return
    }


    if (this.formtype == "Chief Mentor Mapping") {
      console.log("Chief mentor mapping form");

      // Chief mapping form
      return
    }
  }
}
