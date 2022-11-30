import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from '../student.service';

let COURSES_LIVE_DATA: any[] = [
  { SNo: 1, date: '2022-12-10', type: 'type', totalScreen: '1 hours', attendedScreen: '2 hours', percentage: '20' },
  { SNo: 2, date: '2022-10-10', type: 'type', totalScreen: '3 hours', attendedScreen: '2 hours', percentage: '20' },
  { SNo: 3, date: '2022-11-11', type: 'type', totalScreen: '4 hours', attendedScreen: '2 hours', percentage: '20' },
  { SNo: 4, date: '2022-11-12', type: 'type', totalScreen: '5 hours', attendedScreen: '2 hours', percentage: '20' },
  { SNo: 5, date: '2022-11-13', type: 'type', totalScreen: '6 hours', attendedScreen: '2 hours', percentage: '20' },
];

let PARTICES_LIBARY: any[] = [
  { SNo: 1, dateTime: '2022-12-10', description: 'description', section: '1 section', attendedTime: '2 hours' },
  { SNo: 2, dateTime: '2022-10-10', description: 'description', section: '3 section', attendedTime: '2 hours' },
  { SNo: 3, dateTime: '2022-11-11', description: 'description', section: '4 section', attendedTime: '2 hours' },
  { SNo: 4, dateTime: '2022-11-12', description: 'description', section: '5 section', attendedTime: '2 hours' },
  { SNo: 5, dateTime: '2022-11-13', description: 'description', section: '6 section', attendedTime: '2 hours' },
];

let ELEMENT_DATA: any[] = [
  { SNo: 1, CourseName: 'RYIT 200', CourseDiscription: 'Free Online Traditional Meditation Teacher Training Based on Darashanas or sanathana Dharma For Yoga Teachers and Students to become a Yogi', CourseStartDate: '10-20-2022', CourseEndDate: '10-20-2022', AdmissionsStatus: "Admitted", CompletionStatus: 'Completed & Certified' },
  { SNo: 2, CourseName: 'RYIT 200', CourseDiscription: 'Free Online Traditional Meditation Teacher Training Based on Darashanas or sanathana Dharma For Yoga Teachers and Students to become a Yogi', CourseStartDate: '10-20-2022', CourseEndDate: '10-20-2022', AdmissionsStatus: "Admitted", CompletionStatus: 'Certified' },
  { SNo: 3, CourseName: 'RYIT 200', CourseDiscription: 'Free Online Traditional Meditation Teacher Training Based on Darashanas or sanathana Dharma For Yoga Teachers and Students to become a Yogi', CourseStartDate: '10-20-2022', CourseEndDate: '10-20-2022', AdmissionsStatus: "Admitted", CompletionStatus: 'Completed' },
];

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  searchStudentForm!: FormGroup;
  courseForm!: FormGroup;
  AddPurchaseForm!: FormGroup;
  AddVolunteerForm!: FormGroup;
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
  courseLiveColumns: string[] = ['SNo', 'date', 'type', 'totalScreen', 'attendedScreen', 'percentage'];
  practiceLibColumns: string[] = ['SNo', 'dateTime', 'description', 'section', 'attendedTime'];

  coursesProfileData = ELEMENT_DATA;
  coureseLiveData = COURSES_LIVE_DATA;
  coureseShortData = COURSES_LIVE_DATA;
  practiceLibData = PARTICES_LIBARY;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private studentService: StudentService,
  ) { }


  ngOnInit(): void {
    this.searchStudentForm = this.formBuilder.group({
      course: [null],
      studentId: [null]
    });
    this.searchStudentForm.controls['studentId'].disable();

    this.courseForm = this.formBuilder.group({
      
    });

    this.AddPurchaseForm = this.formBuilder.group({
      date: [null, Validators.required],
      purcheseAmount: [null, Validators.required],
      purcheseList: [null, Validators.required]
    });

    this.AddVolunteerForm = this.formBuilder.group({
      category: [null, Validators.required],
      Courses: [null, Validators.required],
      startDate: [null],
      endDate: [null],
      members: [null],
      servedAs: [null]
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

    this.getPurchase(data);
    this.getVolunteer(data);
  }

  getPurchase(data: any) {
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
  }

  getVolunteer(data: any) {
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

  onPurchaseSubmit() {
   
    const data = {
      "studentId": this.studentProfile.studentId,
      "date": this.AddPurchaseForm.value.date,
      "purchaseAmount": this.AddPurchaseForm.value.purcheseAmount,
      "productPurchase": this.AddPurchaseForm.value.purcheseList
    }
    this.studentService.addPurchaseById(data).subscribe({
      next: (response) => {
        this.onPurchaseClose();
        const studentData = {
          "studentId": this.studentProfile.studentId,
          "name": this.studentProfile.name
        }
        this.getPurchase(studentData);
        
      },
      error: (error) => {

      }
    });
  }

  onPurchaseClose() {
    this.AddPurchaseForm.reset();
  }

  onVolunteerSubmit() {
    const data = {
      "studentId": this.studentProfile.studentId,
      "categoryName": this.AddVolunteerForm.value.category,
      "courseId": this.AddVolunteerForm.value.Courses,
      "startDate": this.AddVolunteerForm.value.startDate,
      "endDate": this.AddVolunteerForm.value.endDate,
      "servedAs": this.AddVolunteerForm.value.servedAs,
      "noOfMembers": this.AddVolunteerForm.value.members
    }
    this.studentService.addVolunteerById(data).subscribe({
      next: (response) => {
        this.onVolunteerClose();
        const studentData = {
          "studentId": this.studentProfile.studentId,
          "name": this.studentProfile.name
        }
        this.getVolunteer(studentData);
      },
      error: (error) => {

      }
    });
  }

  onVolunteerClose() {
    this.AddVolunteerForm.reset();
  }

  onStudentSearch() {

  }

  onCourseSubmit() {

  }

  onCourseCancel() {
    this.courseForm.reset();
  }

}
