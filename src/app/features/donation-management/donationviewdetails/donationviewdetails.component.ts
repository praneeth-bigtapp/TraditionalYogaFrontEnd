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

        const { amountDonated, modeOfPayment, description } = this.apidata
        const { registedIpAddress, name, mobile, address, emailId } = this.apidata.student
        this.details.amount = amountDonated
        this.details.modeofpayment = modeOfPayment
        this.details.message = description
        this.details.donorname = name
        this.details.email = emailId
        this.details.mobile = mobile
        this.details.isregisteredmember = registedIpAddress == "" ? "N/A" : registedIpAddress
        this.details.country = address

      },
      error: (error) => {
        console.error(error.message);

      }
    })



  }

}
