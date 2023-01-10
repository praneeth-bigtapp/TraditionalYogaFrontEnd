import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddCourseService } from 'src/app/data/services/admin-module/course-management/course-main/course.service';
import { MappingRegionsToChiefMentorService } from 'src/app/data/services/admin-module/course-management/region-management/region-management.service';
import { UserFilterService } from 'src/app/data/services/admin-module/user-management/user/user-filter/user-filter.service';
import { RegistrationService } from 'src/app/data/services/student-module/registration/registration.service';
import { startWith, map } from 'rxjs';


@Component({
  selector: 'app-world-wide-applications',
  templateUrl: './world-wide-applications.component.html',
  styleUrls: ['./world-wide-applications.component.css']
})
export class WorldWideApplicationsComponent implements OnInit {
  data = [
    { "sno": "1", "name": "Jeannette", "MentorName": "Durga", "ChiefMentorName": "Jaya Sankar", "Region": "India", "CurrentStatus": "active", "status": "", "Check": "" },
    { "sno": "1", "name": "Jeannette", "MentorName": "Durga", "ChiefMentorName": "Jaya Sankar", "Region": "India", "CurrentStatus": "active", "status": "", "Check": "" },
    { "sno": "1", "name": "Jeannette", "MentorName": "Durga", "ChiefMentorName": "Jaya Sankar", "Region": "India", "CurrentStatus": "active", "status": "", "Check": "" },
    { "sno": "1", "name": "Jeannette", "MentorName": "Durga", "ChiefMentorName": "Jaya Sankar", "Region": "India", "CurrentStatus": "active", "status": "", "Check": "" },
    { "sno": "1", "name": "Jeannette", "MentorName": "Durga", "ChiefMentorName": "Jaya Sankar", "Region": "India", "CurrentStatus": "active", "status": "", "Check": "" },
    { "sno": "1", "name": "Jeannette", "MentorName": "Durga", "ChiefMentorName": "Jaya Sankar", "Region": "India", "CurrentStatus": "active", "status": "", "Check": "" },
    { "sno": "1", "name": "Jeannette", "MentorName": "Durga", "ChiefMentorName": "Jaya Sankar", "Region": "India", "CurrentStatus": "active", "status": "", "Check": "" },
    { "sno": "1", "name": "Jeannette", "MentorName": "Durga", "ChiefMentorName": "Jaya Sankar", "Region": "India", "CurrentStatus": "active", "status": "", "Check": "" },
    { "sno": "1", "name": "Jeannette", "MentorName": "Durga", "ChiefMentorName": "Jaya Sankar", "Region": "India", "CurrentStatus": "active", "status": "", "Check": "" },
    { "sno": "1", "name": "Jeannette", "MentorName": "Durga", "ChiefMentorName": "Jaya Sankar", "Region": "India", "CurrentStatus": "active", "status": "", "Check": "" },
    { "sno": "1", "name": "Jeannette", "MentorName": "Durga", "ChiefMentorName": "Jaya Sankar", "Region": "India", "CurrentStatus": "active", "status": "", "Check": "" },
    { "sno": "1", "name": "Jeannette", "MentorName": "Durga", "ChiefMentorName": "Jaya Sankar", "Region": "India", "CurrentStatus": "active", "status": "", "Check": "" },
    { "sno": "1", "name": "Jeannette", "MentorName": "Durga", "ChiefMentorName": "Jaya Sankar", "Region": "India", "CurrentStatus": "active", "status": "", "Check": "" },
    { "sno": "1", "name": "Jeannette", "MentorName": "Durga", "ChiefMentorName": "Jaya Sankar", "Region": "India", "CurrentStatus": "active", "status": "", "Check": "" },
    { "sno": "1", "name": "Jeannette", "MentorName": "Durga", "ChiefMentorName": "Jaya Sankar", "Region": "India", "CurrentStatus": "active", "status": "", "Check": "" },
    { "sno": "1", "name": "Jeannette", "MentorName": "Durga", "ChiefMentorName": "Jaya Sankar", "Region": "India", "CurrentStatus": "active", "status": "", "Check": "" },
    { "sno": "1", "name": "Jeannette", "MentorName": "Durga", "ChiefMentorName": "Jaya Sankar", "Region": "India", "CurrentStatus": "active", "status": "", "Check": "" },
  ]
  displayedColumns: string[] = ['sno', 'name', "MentorName", "ChiefMentorName", "Region", "CurrentStatus", "status", "Check"];

  // displayedColumns: string[] = ['sno', 'name',"stdId","Gender","Age","Profession","MentorId", "ChiefMentorId","Region","ViewApplication", "CurrentStatus", "PerformanceRating", "dWmir","status","Check"];
  dataSource: any;
  iseditable: boolean = false
  disableSelect = new FormControl(false);
  selection = new SelectionModel<any>(true, []);
  UserFilter!: FormGroup
  mentorfield!: FormGroup

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  filterData: any;
  gridData: any;
  Count: any;
  displaycontent: boolean = false;
  isDisableChief: boolean = false;
  isDisableMentor: boolean = false;

  datavalue = [
    {
      name: "Ansari",
      value: "1"
    },
    {
      name: "Jagdish",
      value: "2"
    },
  ]
  countryList: any;
  countryfilter: any;
  regionList: any;
  regionfilter: any;
  genderList: any;
  courselist: any;
  pageno: number = 1;



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  constructor(private formbuilder: FormBuilder, private dialog: MatDialog,
    private service: UserFilterService,
    private otherService: MappingRegionsToChiefMentorService,
    private regService: RegistrationService,
    private _snackBar: MatSnackBar,

    private courseService: AddCourseService) {
    this.UserFilter = this.formbuilder.group({
      courseId: [null],
      nameerror: [null,],
      mailerror: [null,],
      country: [null,],
      // duration: [null, ],
      selectMob: [null,],
      selectRegion: [null,],
      agefrom: [null,],
      ageto: [null,],
      status: [null,],
      language: [null,],
      gender: [null,],
      cheifmentoruserid: [null,],
      studentuserid: [null,],
      mentoruserid: [null,],
      ChiefMentor: []
    });

    this.mentorfield = this.formbuilder.group({
      Menotr_CM: [null,],
      Chief_Mentor: [null,],
      Mentor: [null,],


    })


  }

  ngOnInit(): void {

    this.dataSource = new MatTableDataSource<any>(this.data)
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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


    this.otherService.getcountry().subscribe({
      next: (response) => {

        this.countryList = response

        this.countryfilter = this.UserFilter.valueChanges.pipe(
          startWith(''),
          map((value: any) => this.countryList.filter((ele: any) => ele.countryName.toLowerCase().includes(value.country?.toLowerCase()))),
        )
      },
      error: (error) => {
        console.error(error.message);

      }
    })
    this.otherService.getregion().subscribe({
      next: (response) => {

        this.regionList = response


        this.regionfilter = this.UserFilter.valueChanges.pipe(
          startWith(''),
          map((value: any) => this.regionList.filter((ele: any) => ele.regionName.toLowerCase().includes(value.selectRegion?.toLowerCase()))),
        )


      },
      error: (error) => {
        console.error(error.message);

      }
    })

    this.regService.getGender().subscribe({
      next: (response) => {
        this.genderList = response;
      },
      error: (error) => {
        // console.error(error);
      }
    });
    this.courseService.getCourse().subscribe({
      next: (response) => {
        this.courselist = response

      },
      error: (error) => {
        console.error(error.message);

      }
    })

  }
  ngAfterViewInit() {
    this.filterData.dataSource.paginator = this.paginator;

  }


  showOptions(eve: any) {
    debugger
    this.Count = this.dataSource.data.length;
  }
  mapCourse() {
    this.displaycontent = !this.displaycontent
  }

  onpaginatechange(event: any) {
    if (event.pageIndex === 0) {
      this.pageno = 1
      return
    }
    this.pageno = (event.pageIndex * event.pageSize) + 1
    return
  }
  updatePagination() {

    this.dataSource.paginator = this.paginator;
  }
  openSnackBar(data: any) {
    this._snackBar.open(data.message, 'Close', {
      duration: 2 * 1000,
    });
  }
  renderTableDate(data: any) {
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

  go(id: any) {
    debugger;
    const dialogRef = this.dialog.open(id);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  MentorSelected(values: any) {
    debugger
    console.log("MentorValue : " + values);
    if (values == 'Australia') {
      this.isDisableChief = false;
      this.isDisableMentor = true;
    } else if (values == 'India') {
      this.isDisableMentor = false;
      this.isDisableChief = true
    }
  }


}
