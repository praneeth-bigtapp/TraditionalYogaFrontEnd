import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ParametersService } from './service/parameters.service';
import { MatSnackBar, } from '@angular/material/snack-bar';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css']
})
export class ParametersComponent implements OnInit {

  courselist!: any
  coursename!: any
  courserror: boolean = false
  displaycontent: boolean = false
  Ratings!: FormGroup

  parameters: any;
  body: any;


  constructor(
    private service: ParametersService, private snackBar: MatSnackBar
  ) {
    this.service.getallcourses().subscribe({
      next: (response) => {
        this.courselist = response

      },
      error: (error) => {
        console.error(error.message);

      }
    })

  }



  ngOnInit(): void {
  }


  getallparameter(courseid: any) {
    this.service.getInput().subscribe({
      next: (response) => {
        this.parameters = response

        console.log(this.parameters);

        this.parameters = this.parameters.filter((ele: any) => ele.courseId.courseId === courseid)
        console.log(this.parameters)

      },
      error: (error) => {
        console.error(error.message);

      }
    })
  }
  coursechange() {

    this.displaycontent = false
    this.courserror = false
    if (this.coursename == undefined || this.coursename == null) {
      this.courserror = true
      return
    }
    // this.gobutton()


  }

  gobutton() {
    this.coursechange()
    console.log(this.coursename);
    if (this.coursename) {
      this.displaycontent = true
      this.getallparameter(this.coursename)
    }


  }


  onActivateParameter(eleid: any) {
    const yes = ["Yes", "Y", "yes", "y"]
    const no = ["No", "N", "no", "n"]


    this.parameters.map((element: any) => {
      if (element.id === eleid) {
        element.active = yes.includes(element.active) ? "N" : "Y"
      }

    });

    const { id, ratingGood, ratingAvearage, ratingPoor, ratingRedAlert, active } = this.parameters.filter((ele: any) => ele.id === eleid)[0]
    // console.log({ id, ratingGood, ratingAvearage, ratingPoor, ratingRedAlert, active });

    const body = {

      "performaceRatingId": id,
      "ratingGood": ratingGood,
      "ratingAvearage": ratingAvearage,
      "ratingPoor": ratingPoor,
      "ratingRedAlert": ratingRedAlert,
      "active": active,
    }


    console.log(body);

    // console.log(body);
    this.service.postparamters(body).subscribe({
      next: (response) => {

        this.openSnackBar(response)

      },
      error: (error) => {
        console.error(error.message);

      }
    })


  }
  openSnackBar(data: any) {
    this.snackBar.open(data.message, 'Close');
  }

  IsActiveorNot(value: any) {
    const yes = ["Yes", "Y", "yes", "y"]
    const no = ["No", "N", "no", "n"]
    if (no.includes(value))
      return true

    return false
  }

  keypressvalue(eleid: any) {


    const { id, ratingGood, ratingAvearage, ratingPoor, ratingRedAlert, active } = this.parameters.filter((ele: any) => ele.id === eleid)[0]
    // console.log({ id, ratingGood, ratingAvearage, ratingPoor, ratingRedAlert, active });

    const body = {

      "performaceRatingId": id,
      "ratingGood": ratingGood,
      "ratingAvearage": ratingAvearage,
      "ratingPoor": ratingPoor,
      "ratingRedAlert": ratingRedAlert,
      "active": active,
    }

    console.log(body);
    this.service.postparamters(body).subscribe({
      next: (response) => {

        console.log(response)
        this.openSnackBar(response)

      },
      error: (error) => {
        console.error(error.message);

      }
    })



  }
}
