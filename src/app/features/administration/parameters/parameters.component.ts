import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder} from '@angular/forms';
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
  Ratings!:FormGroup

  parameters :any;
  body: any;


  // parameters: any = {

  //   frequency_validate: {
  //     name: "frequency_validate",
  //     good: "15 days",
  //     average: "",
  //     poor: "",
  //     redalert: "",
  //     disable: false,
  //   },
  //   live_class_min_screen: {
  //     name: "live_class_min_screen",
  //     good: ">60%",
  //     average: "20-40%",
  //     poor: "40-30%",
  //     redalert: "<30%",
  //     disable: false,
  //   },
  //   course_pratice_min_screen: {
  //     name: "course_pratice_min_screen",
  //     good: ">60%",
  //     average: "20-40%",
  //     poor: "40-30%",
  //     redalert: "<30%",
  //     disable: false,
  //   },
  //   gratitude_messages: {
  //     name: "gratitude_messages",
  //     good: "1",
  //     average: "1",
  //     poor: "1",
  //     redalert: "1",
  //     disable: false,
  //   },
  //   task_submitted: {
  //     name: "task_submitted",
  //     good: "",
  //     average: "",
  //     poor: "",
  //     redalert: "",
  //     disable: false,
  //   },
  //   shortvideo_min_screen: {
  //     name: "shortvideo_min_screen",
  //     good: "",
  //     average: "",
  //     poor: "",
  //     redalert: "",
  //     disable: false,
  //   },
  // }



  constructor(
    private service: ParametersService,private snackBar: MatSnackBar
  ) {
    this.service.getallcourses().subscribe({
      next: (response) => {
        this.courselist = response

      },
      error: (error) => {
        console.error(error.message);

      }
    })
    this.service. getInput().subscribe({
      next: (response) => {
        this.parameters = response

      },
      error: (error) => {
        console.error(error.message);

      }
    })
  }

  ngOnInit(): void {
  }
  coursechange() {

    this.displaycontent = false
    this.courserror = false
    if (this.coursename == undefined || this.coursename == null) {
      this.courserror = true
    }

  }

  gobutton() {
    this.coursechange()
    console.log(this.coursename);
    if (this.coursename)
      this.displaycontent = true


  }

  onActivateParameter(paramname: string) {

    this.parameters[paramname].disable = !this.parameters[paramname].disable
  }
  // openSnackBar(message: any) {
  //   this.snackBar.open(message, 'Close');
  // }

  keypressvalue(_value: string) {
    const body = {

      "performaceRatingId": "",
      "ratingGood": "",
      "ratingAvearage": "",
      "ratingPoor": "",
      "ratingRedAlert": ""
    }

    console.log(this.parameters);
    this.service.postparamters(this.body).subscribe({
      next: (response) => {
        
        console.log(response)

      },
      error: (error) => {
        console.error(error.message);

      }
    })

    

  }
}
