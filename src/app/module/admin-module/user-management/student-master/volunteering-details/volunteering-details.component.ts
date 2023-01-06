import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from 'src/app/data/services/admin-module/user-management/student-master/student.service';

@Component({
  selector: 'app-volunteering-details',
  templateUrl: './volunteering-details.component.html',
  styleUrls: ['./volunteering-details.component.css']
})
export class VolunteeringDetailsComponent implements OnInit {
  @Input() student: any;
  donationData: any;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  filterData: any;
  volunterColumns: string[] = ['SNo', 'Category', 'Courses', 'StartDate', 'EndDate', 'SeervedAs', 'noMembers'];
  volunteerForm = false
  AddVolunteerForm!: FormGroup;

  gridData = [];
  dataSource!: MatTableDataSource<any>;
  pageno: number = 1;
  ePurchasesdata: any;
  volunterData: any;
  catogeriesList: any;
  CourseList: any;

  constructor(
    private service: StudentService,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit(): void {
    this.filterData = {
      filterColumnNames: this.volunterColumns.map(ele => ({ "Key": ele, "Value": "" })),
      gridData2: this.gridData,
      dataSource2: this.dataSource,
      paginator2: this.paginator,
      sort2: this.sort
    };
    this.AddVolunteerForm = this.formBuilder.group({
      category: [null, Validators.compose([Validators.required])],
      Courses: [null, Validators.compose([Validators.required])],
      startDate: [null, Validators.compose([Validators.required])],
      endDate: [null, Validators.compose([Validators.required])],
      members: [null, Validators.compose([Validators.required])],
      servedAs: [null, Validators.compose([Validators.required])]
    });
  }


  ngOnChanges() {
    this.getVolunteer()
    this.onselectCourse()
    this.getCategoriesList()
  }

  onpaginatechange(event: any) {
    if (event.pageIndex === 0) {
      this.pageno = 1
      return
    }
    this.pageno = (event.pageIndex * event.pageSize) + 1
    return
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
  updatePagination() {
    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort
  }

  getCategoriesList() {
    this.service.getcatogeries().subscribe({
      next: (response) => {
        this.catogeriesList = response;
      },
      error: (error) => {

      }
    });

  }

  onselectCourse() {
    this.service.getCourses().subscribe({
      next: (response) => {
        this.CourseList = response;
        console.log(this.CourseList)
      },
      error: (error) => {

      }
    });
  }

  getVolunteer() {
    const data = {
      "studentId": this.student.studentId,
      "name": this.student.name
    }
    this.service.getVolunteerById(data).subscribe({
      next: (response) => {
        console.log(response);
        this.volunterData = response;
        this.volunterData = this.volunterData.reverse();

        this.renderTableDate(this.volunterData)

      },
      error: (error) => {

      }
    });
  }

  onAddVolunteer() {
    this.volunteerForm = !this.volunteerForm
  }

  onVolunteerSubmit() {

    if (this.AddVolunteerForm.invalid) {
      return this.AddVolunteerForm.markAllAsTouched()
    }
    const data =
    {
      "studentId": this.student.studentId,
      "categoryName": {
        "volunteeringCategoryId": this.AddVolunteerForm.value.category
      },
      "courseId": {
        "coursesId": this.AddVolunteerForm.value.Courses
      },
      "startDate": this.AddVolunteerForm.value.startDate,
      "endDate": this.AddVolunteerForm.value.endDate,
      "servedAs": this.AddVolunteerForm.value.servedAs,
      "noOfMembers": this.AddVolunteerForm.value.members
    }

    this.service.addVolunteerById(data).subscribe({
      next: (response) => {
        this.AddVolunteerForm.reset();
        this.getVolunteer();
      },
      error: (error) => {

      }
    });
  }

}
