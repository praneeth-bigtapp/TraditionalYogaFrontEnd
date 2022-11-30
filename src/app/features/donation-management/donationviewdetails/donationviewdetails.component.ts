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
    modeofpayment: "",
    identityproof: ""

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

        const { amountDonated, modeOfPayment, description, identityproof } = this.apidata
        const { registedIpAddress, name, mobile, address, emailId } = this.apidata.student
        this.details.amount = amountDonated || "NIL"
        this.details.modeofpayment = modeOfPayment || "NIL"
        this.details.message = description || "NIL"
        this.details.donorname = name || "NIL"
        this.details.email = emailId || "NIL"
        this.details.mobile = mobile || "NIL"
        this.details.isregisteredmember = registedIpAddress || "NIL"
        this.details.country = address || "NIL"
        this.details.identityproof = identityproof || "NIL"

      },
      error: (error) => {
        console.error(error.message);

      }
    })



  }

}
