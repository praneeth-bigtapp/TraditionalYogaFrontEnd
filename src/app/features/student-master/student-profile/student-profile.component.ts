import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from '../student.service';


export interface PeriodicElement {
  SNo: number;
  CourseName: string;
  CourseDiscription: string;
  CourseStartDate: string;
  CourseEndDate: string;
  AdmissionsStatus: string;
  CompletionStatus: string;
}

export interface coursesLiveClass {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const COURSES_LIVE_DATA: coursesLiveClass[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},

];
let ELEMENT_DATA: PeriodicElement[] = [
  { SNo: 1, CourseName: 'RYIT 200', CourseDiscription: 'Free Online Traditional Meditation Teacher Training Based on Darashanas or sanathana Dharma For Yoga Teachers and Students to become a Yogi',CourseStartDate: '10-20-2022', CourseEndDate: '10-20-2022',AdmissionsStatus: "Admitted", CompletionStatus: 'Completed & Certified' },
  { SNo: 2, CourseName: 'RYIT 200', CourseDiscription: 'Free Online Traditional Meditation Teacher Training Based on Darashanas or sanathana Dharma For Yoga Teachers and Students to become a Yogi',CourseStartDate: '10-20-2022', CourseEndDate: '10-20-2022',AdmissionsStatus: "Admitted", CompletionStatus: 'Certified' },
  { SNo: 3, CourseName: 'RYIT 200', CourseDiscription: 'Free Online Traditional Meditation Teacher Training Based on Darashanas or sanathana Dharma For Yoga Teachers and Students to become a Yogi',CourseStartDate: '10-20-2022', CourseEndDate: '10-20-2022',AdmissionsStatus: "Admitted", CompletionStatus: 'Completed' },
];

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  searchStudentForm!: FormGroup;
  courseForm!: FormGroup;
  StudentList: any = [];
  CourseList: any = [];

  dataSource!: MatTableDataSource<any>;
  donationsData: any;
  ePurchasesdata: any;
  volunterData: any;

  studentProfile: any;
  studentSelectStatus: Boolean = false;

  donationsColumns: string[] = ['SNo', 'Date', 'AmountDonated', 'Description', 'ModeofPayment'];
  ePurchasesColumns: string[] = ['SNo', 'Date', 'PurchesedAmount', 'ProductName'];
  volunterColumns: string[] = ['SNo', 'Category', 'Courses', 'StartDate', 'EndDate', 'SeervedAs', 'noMembers'];
  coursesProfileColumns: string[] = ['SNo', 'CourseName', 'AdmissionsStatus', 'CompletionStatus'];

  coursesProfileData = ELEMENT_DATA;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource2 = COURSES_LIVE_DATA;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private studentService: StudentService,
  ) { }


  ngOnInit(): void {
    this.searchStudentForm = this.formBuilder.group({
      studentId: [null, Validators.required]
    });
    this.searchStudentForm.controls['studentId'].disable();

    this.courseForm = this.formBuilder.group({
      course: [null, Validators.required]
    });
    this.getStudentList();
  }

  getStudentList() {
    this.studentService.getStudent().subscribe({
      next: (response) => {
        console.log(response);
        this.StudentList = response;
        this.searchStudentForm.controls['studentId'].enable();
      },
      error: (error) => {

      }
    });

  }

  onSelectStudent(studentDetails: any) {
    console.log("Enterning Select Student List");
    const data = {
      "studentId": studentDetails.studentId,
      "name": studentDetails.name
    }
    this.studentService.getStudentById(data).subscribe({
      next: (response) => {
        this.studentProfile = response;
        this.studentSelectStatus = true;
      },
      error: (error) => {

      }
    });

    console.log("Enterning Select Course List");
    this.studentService.getCourses().subscribe({
      next: (response) => {
        this.CourseList = response;
      },
      error: (error) => {

      }
    });

    console.log("Enterning Select Donation List");
    this.studentService.getDonationById(data).subscribe({
      next: (response) => {
        console.log(response);
        this.dataSource = new MatTableDataSource(response);
        this.donationsData = this.dataSource;
      },
      error: (error) => {

      }
    });

    console.log("Enterning Select e-Purchases List");
    this.studentService.getPurchaseById(data).subscribe({
      next: (response) => {
        console.log(response);
        this.dataSource = new MatTableDataSource(response);
        this.ePurchasesdata = this.dataSource;
      },
      error: (error) => {

      }
    });

    console.log("Enterning Select Volunteer List");
    this.studentService.getVolunteerById(data).subscribe({
      next: (response) => {
        console.log(response);
        this.dataSource = new MatTableDataSource(response);
        this.volunterData = this.dataSource;
      },
      error: (error) => {

      }
    });
  }

  onStudentSearch() {

  }

  onCourseSubmit() {

  }

  onCourseCancel() {
    this.courseForm.reset();
  }

}
