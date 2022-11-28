import { Component, OnInit } from '@angular/core';
import { DonationserviceService } from '../service/donationservice.service';

@Component({
  selector: 'app-donationviewdetails',
  templateUrl: './donationviewdetails.component.html',
  styleUrls: ['./donationviewdetails.component.css']
})
export class DonationviewdetailsComponent implements OnInit {


  details = {
    amount: "",
    donorname: "",
    email: "",
    mobile: "",
    isregisteredmember: "",
    country: "",
    message: "",
    modeofpayment: ""

  }
  apidata!: any



  constructor(
    private donationservice: DonationserviceService
  ) { }

  ngOnInit(): void {
    this.getData()
  }


  getData() {

    const body = {
      "donationId": "3"
    }

    this.donationservice.postdonationdetails(body).subscribe({
      next: (response) => {
        console.log(response);
        this.apidata = response
        this.details.amount = this.apidata.amountDonated
        this.details.modeofpayment = this.apidata.modeOfPayment
        this.details.message = this.apidata.description

      },
      error: (error) => {
        console.error(error.message);

      }
    })



  }

}
