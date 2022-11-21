import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-pratice-library',
  templateUrl: './create-pratice-library.component.html',
  styleUrls: ['./create-pratice-library.component.css']
})
export class CreatePraticeLibraryComponent implements OnInit {

  category!: string
  addmediaform!: any
  timerror!: boolean
  constructor(
    private Router: Router,
    private formbuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.addmediaform = this.formbuilder.group({
      videolink: [null, Validators.compose([Validators.required])],
      videotitle: [null, Validators.compose([Validators.required])],
      videodescription: [null, Validators.compose([Validators.required])],
      videoduration: [null, Validators.compose([Validators.required])],
      vidoemetakeywords: [null, Validators.compose([Validators.required])]
    })
  }


  gobutton() {
    const classtype = this.category
    console.log(classtype);

  }

  ontimechange() {
    this.timerror = this.addmediaform.value.videoduration === null ? true : false

  }
  addmedia() {

    this.ontimechange()

    if (this.addmediaform.valid) {

      const result = this.addmediaform.value

      console.log(result);


    }
    else {
      console.log("invalid");

      this.addmediaform.markAllAsTouched()
    }

  }
}
