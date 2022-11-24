import { Component, OnInit } from '@angular/core';
import { DonationserviceService } from '../service/donationservice.service';

@Component({
  selector: 'app-donationviewdetails',
  templateUrl: './donationviewdetails.component.html',
  styleUrls: ['./donationviewdetails.component.css']
})
export class DonationviewdetailsComponent implements OnInit {


  details!: any



  constructor(
    private donationservice: DonationserviceService
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  ngAfterViewInit() {

    // this.getData()
  }

  getData() {

    this.donationservice.getdonationdetails().subscribe({
      next: (response) => {
        console.log(response);

      },
      error: (error) => {
        console.error(error.message);
        
        // static values
        this.details = {
          amount: "1,4,157.00",
          donorname: "Elizabeth",
          email: "elizabeth@gmail.com",
          mobile: "+91 9985575669",
          isregisteredmember: "Yes",
          country: "India",
          message: " when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
          modeofpayment: "Online Payment"

        }

      }
    })



  }

}
