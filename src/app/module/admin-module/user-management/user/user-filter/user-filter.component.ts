import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, startWith } from 'rxjs';
import { AddCourseService } from 'src/app/data/services/admin-module/course-management/course-main/course.service';
import { UserFilterService } from 'src/app/data/services/admin-module/user-management/user/user-filter/user-filter.service';
import { MappingRegionsToChiefMentorService } from 'src/app/data/services/admin-module/website-management/mapping-regions-to-chief-mentor/mapping-regions-to-chief-mentor.service';
import { RegistrationService } from 'src/app/data/services/student-module/registration/registration.service';

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.css']
})
export class UserFilterComponent implements OnInit {
  data = [{ "sno": "1", "name": "Anji", "emailId": "anji@gmail", "country": "india", "Gender": "male", "usersince": "2020", "status": "" },
  { "sno": "2", "name": "Praneeth", "emailId": "praneeth@gmail", "country": "Austrilia", "Gender": "male", "usersince": "2020", "status": "" },
  { "sno": "3", "name": "Sumukesh", "emailId": "sumukesh@gmail", "country": "india", "Gender": "male", "usersince": "2020", "status": "" },
  { "sno": "4", "name": "Shekar", "emailId": "shekar@gmail", "country": "india", "Gender": "male", "usersince": "2020", "status": "" },
  { "sno": "5", "name": "Nikhil", "emailId": "nikhil@gmail", "country": "india", "Gender": "male", "usersince": "2020", "status": "" },
  ]
  displayedColumns: string[] = ['sno', 'image', 'name', "emailId", "country", "Gender", "usersince", "status",];
  pageno: number = 1
  dataSource: any;
  iseditable: boolean = false
  disableSelect = new FormControl(false);
  selection = new SelectionModel<any>(true, []);
  UserFilter!: FormGroup
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  filterData: any;
  gridData: any;
  displaycontent = false
  issubmit: boolean = true
  countryList!: any
  regionList!: any
  countryfilter !: Observable<any>
  regionfilter !: Observable<any>
  genderList: any;
  courselist: any;

  mentorList: any = [
    {
      id: null,
      name: "Mentors"
    },
    {
      id: null,
      name: "Chief Mentors"
    },
  ]


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  constructor(private formbuilder: FormBuilder,
    private service: UserFilterService,
    private otherService: MappingRegionsToChiefMentorService,
    private regService: RegistrationService,
    private courseService: AddCourseService,
    private _snackBar: MatSnackBar

  ) {
    this.UserFilter = this.formbuilder.group({
      courseId: [null],
      name: [null,],
      emailId: [null,],
      country: [null,],
      // duration: [null, ],
      selectMob: [null,],
      selectRegion: [null,],
      agefrom: [null,],
      ageto: [null,],
      status: [null,],
      language: [null,],
      Gender: [null,],
      selectMentor: [null,]
    });



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
        console.log(this.countryList);

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
        console.log(this.regionList);


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

  cancelView() {
    this.issubmit = true
  }


  viewdetails(element: any) {
    this.issubmit = false
    this.UserFilter.patchValue({
      name: element.name,
      country: element.country,
      Gender: element.Gender,
      emailId: element.emailId
    });

 
  }

  userSearch() {
    console.log(this.UserFilter.value);
    const body = {

    }
    this.service.searchUsers(body).subscribe({
      next: (response) => {
        this.openSnackBar(response)
      },
      error: (error) => {
        console.error(error);

      }
    })

  }


}

