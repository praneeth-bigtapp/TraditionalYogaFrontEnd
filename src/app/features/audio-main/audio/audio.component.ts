import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AudioService } from '../audio.service';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements OnInit {
  disableSelect = new FormControl(false);
  Audiomanagement!: FormGroup;
  filerror: boolean = false
  audiodata!: any
  courses!: any;

  // this. Audiomanagement = this.formbuilder.group({
  //   course: [null, Validators.compose([Validators.required])],
  //   testtype: [null, Validators.compose([Validators.required])],
  //   testname: [null, Validators.compose([Validators.required])],
  //   leveltest: [null, Validators.compose([Validators.required])],
  //   file: [null, Validators.compose([Validators.required])],
  //   description: [null, Validators.compose([Validators.required])],


  constructor(private formbuilder: FormBuilder, private course:AudioService) {
    this.Audiomanagement = this.formbuilder.group({
      category: [null, Validators.compose([Validators.required])],
      outline: [null, Validators.compose([Validators.required])],
      file: [null, Validators.compose([Validators.required])],
      title: [null, Validators.compose([Validators.required])],
      upload: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],
      duration: [null, Validators.compose([Validators.required])],
      meta: [null, Validators.compose([Validators.required])],
    })
    this.course.getcourse().subscribe({
      next: (response) => {

        this.courses = response
        console.log(this.courses);

      },
      error: (error) => {
        console.error(error.message);
      }
    });

  }

  ngOnInit(): void {

    // this. Audiomanagement = this.formbuilder.group({
    //   category: [null, Validators.compose([Validators.required])],
    //   outline: [null, Validators.compose([Validators.required])],
    //   file: [null, Validators.compose([Validators.required])],
    //   title: [null, Validators.compose([Validators.required])],
    //   file: [null, Validators.compose([Validators.required])],
    //   description: [null, Validators.compose([Validators.required])],
    //   duration: [null, Validators.compose([Validators.required])],
    //   meta: [null, Validators.compose([Validators.required])],
    // }
  }

  filechange(event: any) {
    this.filerror = this.Audiomanagement.value.file === null ? true : false

    this.audiodata = event.target.files[0]
  }
  audiosubmit() {
    this.filerror = this.Audiomanagement.value.file === null ? true : false

    if (this.Audiomanagement.invalid)
      return this.Audiomanagement.markAllAsTouched()

    this.Audiomanagement.value.file = this.audiodata

  }

  // getcoursedata(){
  //   this.course.getcourse().subscribe({
  //     next: (response) => {

  //       this.courses = response
  //       console.log(this.courses);

  //     },
  //     error: (error) => {
  //       console.error(error.message);
  //     }
  //   });


  // }
}
