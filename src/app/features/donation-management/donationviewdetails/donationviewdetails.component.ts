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
  fullform(value: any) {
    const yes = ["Yes", "Y", "yes", "y"]
    const no = ["No", "N", "no", "n"]

    if (yes.includes(value))
      return "Yes"

    return "No"
  };

  getData() {

    const body = {
      "donationId": "3"
    }

    this.donationservice.postdonationdetails(body).subscribe({
      next: (response) => {
        console.log(response);


        this.apidata = response

        const { amountDonated, modeOfPayment, date } = this.apidata

        const { donarId, address, email, contactNumber, indianCitizen, country, taxBenefits, identityProof, identityNumber, donationAmount, stripeCreditCard, cardName, message } = this.apidata.donarId

        // this.details.amount = amountDonated || "NIL"
        // this.details.donorname = '' || "NIL"
        // this.details.address = address || "NIL"
        // this.details.email = email || "NIL"
        // this.details.mobile = '' || "NIL"
        // this.details.isIndian = this.fullform(indianCitizen) || "NIL"
        // this.details.taxbenefits = this.fullform(taxBenefits) || "NIL"
        // this.details.identityproof = identityProof || "NIL"
        // this.details.identitynumber = identityNumber || "NIL"
        // this.details.isregisteredmember = '' || "NIL"
        // this.details.country = country || "NIL"
        // this.details.modeofpayment = modeOfPayment || "NIL"
        // this.details.cardname = cardName || "NIL"

        // this.details.message = message || "NIL"

        this.details.amount = "20000"
        this.details.donorname = "ajith"
        this.details.address = "hyderabad"
        this.details.email = "ajith@gmail.com"
        this.details.mobile = "9876543210"
        this.details.isIndian = " Yes"
        this.details.taxbenefits = "No"
        this.details.identityproof = "Pan Card"
        this.details.identitynumber = "GHYYS2222Z"
        this.details.isregisteredmember = "Yes"
        this.details.country = "India"
        this.details.modeofpayment = "Credit"
        this.details.cardname = "ajith kumar"
        this.details.message = "description"



      },
      error: (error) => {
        console.error(error);

        // this.details.amount = "20000"
        // this.details.donorname = "ajith"
        // this.details.address = "hyderabad"
        // this.details.email = "ajith@gmail.com"
        // this.details.mobile = "9876543210"
        // this.details.isIndian = " Yes"
        // this.details.taxbenefits = "No"
        // this.details.identityproof = "Pan Card"
        // this.details.identitynumber = "GHYYS2222Z"
        // this.details.isregisteredmember = "Yes"
        // this.details.country = "India"
        // this.details.modeofpayment = "Credit"
        // this.details.cardname = "ajith kumar"
        // this.details.message = "description"
      }
    })



  }

}
