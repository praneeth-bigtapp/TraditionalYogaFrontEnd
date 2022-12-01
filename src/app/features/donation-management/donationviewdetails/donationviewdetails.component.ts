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

        const { amountDonated, country, identitynumber, cardname, taxbenefits, modeOfPayment, description, identityproof, isIndian, registedIpAddress, name, mobile, address, emailId } = this.apidata
        this.details.amount = amountDonated || "NIL"
        this.details.donorname = name || "NIL"
        this.details.address = address || "NIL"
        this.details.email = emailId || "NIL"
        this.details.mobile = mobile || "NIL"
        this.details.isIndian = isIndian || "NIL"
        this.details.taxbenefits = taxbenefits || "NIL"
        this.details.identityproof = identityproof || "NIL"
        this.details.identitynumber = identitynumber || "NIL"
        this.details.isregisteredmember = registedIpAddress || "NIL"
        this.details.country = country || "NIL"
        this.details.modeofpayment = modeOfPayment || "NIL"
        this.details.cardname = cardname || "NIL"

        this.details.message = description || "NIL"

      },
      error: (error) => {
        console.error(error.message);

        this.details.amount = "20000"
        this.details.donorname = "donorname"
        this.details.address = "address"
        this.details.email = "email"
        this.details.mobile = "mobile"
        this.details.isIndian = " isIndian"
        this.details.taxbenefits = "taxbenefits"
        this.details.identityproof = "identityproof"
        this.details.identitynumber = "identitynumber"
        this.details.isregisteredmember = "registedIpAddress"
        this.details.country = "country"
        this.details.modeofpayment = "modeOfPayment"
        this.details.cardname = "cardname"
        this.details.message = "description"
      }
    })



  }

}
