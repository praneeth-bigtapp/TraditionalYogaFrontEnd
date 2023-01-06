import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from 'src/app/data/services/admin-module/user-management/student-master/student.service';

@Component({
  selector: 'app-courseprofiletab',
  templateUrl: './courseprofiletab.component.html',
  styleUrls: ['./courseprofiletab.component.css']
})
export class CourseprofiletabComponent implements OnInit {
  @Input() student: any;
  coursesProfileData: any;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  filterData: any;
  coursesProfileColumns: string[] = ['SNo', 'courseId', 'admissionsStatus', 'completionStatus'];

  gridData = [];
  dataSource!: MatTableDataSource<any>;
  pageno: number = 1;

  constructor(
    private service: StudentService
  ) { }

  ngOnInit(): void {
    this.filterData = {
      filterColumnNames: this.coursesProfileColumns.map(ele => ({ "Key": ele, "Value": "" })),
      gridData2: this.gridData,
      dataSource2: this.dataSource,
      paginator2: this.paginator,
      sort2: this.sort
    };
  }

  ngOnChanges() {
    this.courseProfileAPI()
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
  courseProfileAPI() {
    const body = {
      "studentId": this.student && this.student.studentId,
      "name": this.student && this.student.name
    }
    this.service.getCourseProfileById(body).subscribe({
      next: (response) => {
        this.coursesProfileData = response;
        this.coursesProfileData = this.coursesProfileData.reverse()
        this.renderTableDate(this.coursesProfileData)
      },
      error: (error) => {
        console.error(error);

      }
    });
  }
}
