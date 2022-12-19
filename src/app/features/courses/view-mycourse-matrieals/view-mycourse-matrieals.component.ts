import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-mycourse-matrieals',
  templateUrl: './view-mycourse-matrieals.component.html',
  styleUrls: ['./view-mycourse-matrieals.component.css']
})
export class ViewMycourseMatriealsComponent implements OnInit {

  id: any
  details = {
    amount: "",
    donorname: "",
    address: "",
    email: "",
    mobile: "",
    isIndian: "",
    taxbenefits: "",
    identitynumber: "",
    isregisteredmember: "",
    country: "",
    message: "",
    modeofpayment: "",
    cardname: "",
    identityproof: ""
  }
  
  constructor(
    private route: ActivatedRoute,
  ) {

    this.id = this.route.snapshot.paramMap.get('id')
    console.log(this.id);

  }

  ngOnInit(): void {
  }

}
