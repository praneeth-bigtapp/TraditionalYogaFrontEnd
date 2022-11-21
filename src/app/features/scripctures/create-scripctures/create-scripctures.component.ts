import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-scripctures',
  templateUrl: './create-scripctures.component.html',
  styleUrls: ['./create-scripctures.component.css']
})
export class CreateScripcturesComponent implements OnInit {

  category!: string
  addmediaform!: any
  timerror!: boolean
  filerror!: boolean
  filerror2!: boolean
  constructor(
    private router: Router,
    private formbuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.addmediaform = this.formbuilder.group({
      coverimage: [null, Validators.compose([Validators.required])],
      covertitle: [null, Validators.compose([Validators.required])],
      coverdescription: [null, Validators.compose([Validators.required])],
      coverfile: [null, Validators.compose([Validators.required])],
      coverkeywords: [null, Validators.compose([Validators.required])]
    })
  }

  gobutton() {
    const classtype = this.category
    console.log(classtype);

  }

  onfilechange(formname: string) {

    if (formname === 'backcover')
      this.filerror = this.addmediaform.value.coverimage === null ? true : false

    if (formname === 'file')
      this.filerror2 = this.addmediaform.value.coverfile === null ? true : false

  }
  ontimechange() {
    this.timerror = this.addmediaform.value.videoduration === null ? true : false

  }
  addmedia() {

    this.onfilechange('backcover')
    this.onfilechange('file')

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
