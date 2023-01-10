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
import { RegistrationService } from 'src/app/data/services/student-module/registration/registration.service';
import { startWith, map, Observable } from 'rxjs';
import { InputvalidationService } from 'src/app/shared/services/input-validation.service';
import { WorldWideApplicationService } from 'src/app/data/services/admin-module/word-wide-application/world-wide-application.service';


@Component({
  selector: 'app-world-wide-applications',
  templateUrl: './world-wide-applications.component.html',
  styleUrls: ['./world-wide-applications.component.css']
})
export class WorldWideApplicationsComponent implements OnInit {
  data!: any
  displayedColumns: string[] = ['sno', 'name', "MentorName", "ChiefMentorName", "Region", "CurrentStatus", "status", "Check"];

  // displayedColumns: string[] = ['sno', 'name',"stdId","Gender","Age","Profession","MentorId", "ChiefMentorId","Region","ViewApplication", "CurrentStatus", "PerformanceRating", "dWmir","status","Check"];
  dataSource: any;
  iseditable: boolean = false
  disableSelect = new FormControl(false);
  selection = new SelectionModel<any>(true, []);
  UserFilter!: FormGroup
  mentorfield!: FormGroup
  manageExemption!: any

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  filterData: any;
  gridData: any;
  Count: any;
  displaycontent: boolean = false;
  actionOption!: null

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
  countryfilter!: Observable<any>;
  regionList: any;
  regionfilter!: Observable<any>;
  genderList: any;
  courselist: any;
  pageno: number = 1;
  professionsList: any;
  languageList: any;
  studentDetails: any;
  isChangeMentor: boolean = false
  isChangeChiefMentor: boolean = false
  newMentorName!: any
  newChiefMentorName!: any



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  constructor(private formbuilder: FormBuilder, private dialog: MatDialog,
    private otherService: MappingRegionsToChiefMentorService,
    private regService: RegistrationService,
    private _snackBar: MatSnackBar,
    private service: WorldWideApplicationService,

    private courseService: AddCourseService) {
    this.UserFilter = this.formbuilder.group({
      courseId: [null],
      nameerror: [null,],
      mailerror: [null, Validators.compose([Validators.email])],
      country: [null,],
      // duration: [null, ],
      selectMob: [null, Validators.compose([Validators.pattern(InputvalidationService.inputvalidation.phonenumber)])],
      selectRegion: [null,],
      agefrom: [null,],
      ageto: [null,],
      status: [null,],
      language: [null,],
      gender: [null,],
      cheifmentoruserid: [null,],
      studentuserid: [null,],
      mentoruserid: [null,],
      ChiefMentor: [],
      Profession: [null,]
    });

    this.mentorfield = this.formbuilder.group({
      Chief_Mentor: [null, Validators.compose([Validators.required])],
      Mentor: [null, Validators.compose([Validators.required])],
    })

    this.manageExemption = [
      {
        text: "Frequency to validate for every (Number of Days)",
        value: null,
        isEnable: false,
      },
      {
        text: "Percentage of Minimum Screen time for Live classes",
        value: null,
        isEnable: false,
      },
      {
        text: "Percentage of Minimum Screen time for course practice sessions",
        value: null,
        isEnable: false,
      },
      {
        text: "Number of Gratitude messages to be sent & circulated",
        value: null,
        isEnable: false,
      },
      {
        text: "Percentage of Tasks/Assignment to be submitted",
        value: null,
        isEnable: false,
      },
      {
        text: "Percentage of Minimu, Screen time for short videos",
        value: null,
        isEnable: false,
      }
    ]
  }

  ngOnInit(): void {


    this.filterData = {
      filterColumnNames: this.displayedColumns.map(ele => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    }
    this.getStudentData()


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
    this.regService.getProfessions().subscribe({
      next: (response) => {
        this.professionsList = response
        console.log(this.professionsList);

      },
      error: (err) => {
        console.error(err);

      },
    })
    this.courseService.getCourse().subscribe({
      next: (response) => {
        this.courselist = response

      },
      error: (error) => {
        console.error(error.message);

      }
    })
    this.regService.getlanguages().subscribe({
      next: (response) => {
        this.languageList = response;

      },
      error: (error) => {
        console.error(error.message);
      }
    });

  }
  ngAfterViewInit() {
    this.filterData.dataSource.paginator = this.paginator;

  }

  getStudentData() {
    this.service.getStudent().subscribe({
      next: (response) => {
        this.data = response
        this.data = this.data.reverse()
        this.renderTableDate(this.data)

      },
      error: (error) => {
        console.error(error);
        this.data = [
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
        this.renderTableDate(this.data)
      }
    })
  }

  getExemptedStudentData() {

    this.service.getExemptedStudent().subscribe({
      next: (response) => {
        this.data = response
        this.data = this.data.reverse()
        this.renderTableDate(this.data)

      },
      error: (error) => {
        console.error(error);
      }
    })
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
  isEnableorNot(element: any) {
    const yes = ["Yes", "Y", "yes", "y"]
    const no = ["No", "N", "no", "n"]
    return yes.includes(element)
  };
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

  go(id: any, element: any) {
    const dialogRef = this.dialog.open(id,
      {
        width: "80%",
        height: element ? "50%" : "100%"
      });

    this.studentDetails = element

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  changeAction(event: any) {
    this.isChangeChiefMentor = false
    this.isChangeMentor = false
    if (event === "cheifmentor") {
      this.isChangeChiefMentor = true
      return
    }
    if (event === "mentor") {
      this.isChangeMentor = true
      return
    }


  }

  changeToggle(element: any) {
    const body = {}

    if (this.isEnableorNot(element)) {
      // Already enable means

      this.service.activeStudent(body).subscribe({
        next: (response) => {
          this.openSnackBar(response)
          this.getStudentData()
        },
        error: (error) => {
          console.log(error);

        }
      })
      return
    }

    // Already disable means
    this.service.deactiveStudent(body).subscribe({
      next: (response) => {
        this.openSnackBar(response)
        this.getStudentData()
      },
      error: (error) => {
        console.log(error);

      }
    })
  }

  searchUser() {

    const body = {}

    this.service.searchUsers(body).subscribe({
      next: (response) => {
        this.data = response
        this.data = this.data.reverse()
        this.renderTableDate(this.data)
        this.openSnackBar({ message: "Sucessfully Filtered" })
      },
      error: (error) => {
        console.log(error);

      }
    })
  }

  changeMentors() {


    if (this.isChangeChiefMentor) {
      // changing chief 
      console.log(this.newChiefMentorName);
      console.log(this.selection.selected);

      const body = {}

      this.service.changeChiefMentor(body).subscribe({
        next: (response) => {
          this.openSnackBar(response)
          this.getStudentData()
        },
        error: (error) => {
          console.log(error);

        }
      })

      return
    }


    // changing  mentor
    console.log(this.newMentorName);
    console.log(this.selection.selected);

    const body = {}

    this.service.changeMentor(body).subscribe({
      next: (response) => {
        this.openSnackBar(response)
        this.getStudentData()
      },
      error: (error) => {
        console.log(error);

      }
    })
    return




  }

  changeExemptionStatus(element: any) {
    element.isEnable = !element.isEnable
  }

  submitManageExemption() {
    console.log(this.manageExemption);

    const body = {}

    this.service.manageExemptionStudent(body).subscribe({
      next: (response) => {
        this.openSnackBar(response)
      },
      error: (error) => {
        console.log(error);

      }
    })

  }


}
