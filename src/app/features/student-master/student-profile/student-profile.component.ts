import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
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
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator2!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort2!: MatSort;
  gridData2 = [];
  volunteerForm=false
  filterData: any;
  gridData = [];
  purchaseform=false
  searchStudentForm!: FormGroup;
  courseForm!: FormGroup;
  AddPurchaseForm!: FormGroup;
  AddVolunteerForm!: FormGroup;
  StudentList: any = [];
  CourseList: any = [];
  courseSelectStatus=false;
  dataSource!: MatTableDataSource<any>;
  donationsData: any;
  ePurchasesdata: any;
  volunterData: any;

  studentProfile: any;
  studentSelectStatus: Boolean = false;

  donationsColumns: string[] = ['SNo', 'Date', 'Discription', "ModeofPay", "amountDonated"];
  ePurchasesColumns: string[] = ['SNo', 'Date', 'PurchesedAmount', 'ProductName'];
  volunterColumns: string[] = ['SNo', 'Category', 'Courses', 'StartDate', 'EndDate', 'SeervedAs', 'noMembers'];
  coursesProfileColumns: string[] = ['SNo', 'CourseName', 'AdmissionsStatus', 'CompletionStatus'];
  courseLiveColumns: string[] = ['SNo', 'date', 'type', 'totalScreen', 'attendedScreen', 'percentage'];
  practiceLibColumns: string[] = ['SNo', 'dateTime', 'description', 'section', 'attendedTime'];

  coursesProfileData = ELEMENT_DATA;
  coureseLiveData = COURSES_LIVE_DATA;
  coureseShortData = COURSES_LIVE_DATA;
  practiceLibData = PARTICES_LIBARY;
  pageno: number = 1
  donations: any;
  filterData2: any
   dataSource2:any;

  onpaginatechange(event: any) {
    if (event.pageIndex === 0) {
      this.pageno = 1
      return
    }
    this.pageno = (event.pageIndex * event.pageSize) + 1
    return
  }
  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private studentService: StudentService,
  ) { }


  ngOnInit(): void {
    this.onselectCourse()
    this.searchStudentForm = this.formBuilder.group({
      course:   [null, Validators.required],
      studentId:[null, Validators.required],
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
      startDate: [null,],
      endDate: [null],
      members: [null],
      servedAs: [null]
    });

    this.filterData2 = {
      filterColumnNames: this.ePurchasesColumns.map(ele => ({ "Key": ele, "Value": "" })),
      gridData2: this.gridData2,
      dataSource2: this.dataSource2,
      paginator2: this.paginator2,
      sort2: this.sort2
    };
    this.dataSource2 = new MatTableDataSource<any>(this.ePurchasesdata)
    this.filterData2.gridData2 = this.ePurchasesdata;
    this.filterData2.dataSource2 = this.dataSource2;
    this.dataSource2.paginator2 = this.paginator2;
    this.dataSource2.sort2 = this.sort2;
    this.filterData2.sort2 = this.sort2;
    for (let col of this.filterData2.filterColumnNames) {
      col.Value = '';
    }

    this.filterData = {
      filterColumnNames: this.donationsColumns.map(ele => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };
    

    this.getStudentList();
  }
  updatePagination() {
    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort=this.sort

}
updatePagination2() {
  this.filterData2.dataSource2.paginator2 = this.paginator2;
  this.filterData2.dataSource2.sort2=this.sort2

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
  onAddVolunteer(){
    this.volunteerForm=!this.volunteerForm
  }
  onaddpurchase(){
    this.purchaseform=true
  }
  donationAPI(){
    this.studentService.getdonations().subscribe({
      next: (response) => {
        this.donations = response;
        this.donations= this.donations.reverse()
        
        this.dataSource = new MatTableDataSource<any>(this.donations)
        this.filterData.gridData = this.donations;
        this.filterData.dataSource = this.dataSource;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.filterData.sort = this.sort;
        for (let col of this.filterData.filterColumnNames) {
          col.Value = '';
        }
      },
      error: (error) => {

      }
    });
  }
  onselectCourse(){
    console.log("Enterning Select Course List");
    this.studentService.getCourses().subscribe({
      next: (response) => {
        this.CourseList = response;
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
        console.log(this.studentProfile)
        this.studentSelectStatus = true;
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
       
        this.ePurchasesdata = response;
        this.ePurchasesdata= this.ePurchasesdata.reverse()
        
        this.dataSource2 = new MatTableDataSource<any>(this.ePurchasesdata)
        this.filterData2.gridData2 = this.ePurchasesdata;
        this.filterData2.dataSource2 = this.dataSource2;
        this.dataSource2.paginator2 = this.paginator2;
        this.dataSource2.sort2 = this.sort2;
        this.filterData2.sort2 = this.sort2;
        for (let col of this.filterData2.filterColumnNames) {
          col.Value = '';
        }
      },
      error: (error) => {

      }
    });
  }

  oncourseselect(){
    this.courseSelectStatus=true
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
    this.purchaseform=false
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
