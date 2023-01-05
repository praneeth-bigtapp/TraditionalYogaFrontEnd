import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar, } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ParametersService } from 'src/app/data/services/admin-module/course-management/parameters/parameters.service';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css']
})
export class ParametersComponent implements OnInit {
  performanceRating: any = [];

  courselist: any;
  selectCourse: any;

  courseError: boolean = false;
  performanceError: boolean = false;
  displayContent: boolean = false;

  sectionDataA!: MatTableDataSource<any>;
  sectionDataB!: MatTableDataSource<any>;

  sectionColumnsA: string[] = ['parameterName', 'ratingGood', 'ratingAvearage', 'ratingPoor', 'ratingRedAlert', 'active'];
  sectionColumnsB: string[] = ['parameterName', 'rating', 'active'];

  constructor(
    private parameterService: ParametersService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getCourse();
  }

  getCourse() {
    this.parameterService.getallcourses().subscribe({
      next: (response) => {
        this.courselist = response;
        console.log(this.courselist);
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  courseChange() {
    this.displayContent = false;
    this.courseError = false;
    if (this.selectCourse == undefined || this.selectCourse == null) {
      this.courseError = true;
      return
    }
  }

  onClkCourse() {
    console.log(this.selectCourse);
    if (this.selectCourse == undefined || this.selectCourse == null) {
      this.displayContent = false;
      this.courseError = true;
    } else {
      this.displayContent = true;
      this.courseError = false;
      this.getParameter(this.selectCourse);
    }
  }

  getParameter(courseId: any) {
    this.parameterService.getInput(courseId).subscribe({
      next: (response) => {
        this.performanceRating = response;
        // console.log(this.performanceRating.sectionA);
        console.log(this.performanceRating);
        this.sectionDataA = new MatTableDataSource(this.performanceRating.sectionA);
        this.sectionDataB = new MatTableDataSource(this.performanceRating.sectionB);
        this.performanceError = false;
        // if (this.performanceRating.sectionA == null && this.performanceRating.sectionB == null) {
        // } else {
        //   this.displayContent = false;
        //   this.performanceError = true;
        // }
      },
      error: (error) => {
        this.performanceError = true;
      }
    });
  }
  
  openSnackBar(data: any) {
    this.snackBar.open(data.message, 'Close', {
      duration: 2 * 1000,
    });
  }

  // For Posting the Input fields
  // Create a method here
  ratingSectionB(parameter: any) {
    this.updateSectionB(parameter);
  }

  ratingSectionA(parameter: any) {
    this.updateSectionA(parameter);
  }

  onActiveParameterB(parameter: any, event: MatSlideToggleChange) {
    console.log(event);
    if (event.checked) {
      parameter.active = "Y"
    } else {
      parameter.active = "N"
    }
    this.updateSectionB(parameter);
  }

  onActiveParameterA(parameter: any, event: MatSlideToggleChange) {
    console.log(event);
    if (event.checked) {
      parameter.active = "Y"
    } else {
      parameter.active = "N"
    }
    this.updateSectionA(parameter);
  }

  updateSectionB(parameter: any) {
    console.log(parameter);
    const data = {
      "performaceRatingId": parameter.parametersId,
      "ratingGood": parameter.rating,
      "active": parameter.active
    };
    this.parameterService.saveParamters(data, 2).subscribe({
      next: (response) => {
        console.log(response);
        this.openSnackBar(response);
        this.getParameter(this.selectCourse);
      },
      error: (error) => {
        console.error(error.message);
        this.getParameter(this.selectCourse);
      }
    });
  }

  updateSectionA(parameter: any) {
    console.log(parameter);
    const data = {
      "performaceRatingId": parameter.parametersId,
      "ratingGood": parameter.ratingGood,
      "ratingAvearage": parameter.ratingAvearage,
      "ratingPoor": parameter.ratingPoor,
      "ratingRedAlert": parameter.ratingRedAlert,
      "active": parameter.active
    };
    this.parameterService.saveParamters(data, 1).subscribe({
      next: (response) => {
        console.log(response);
        this.openSnackBar(response);
        this.getParameter(this.selectCourse);
      },
      error: (error) => {
        console.error(error.message);
        this.getParameter(this.selectCourse);
      }
    });
  }
}
