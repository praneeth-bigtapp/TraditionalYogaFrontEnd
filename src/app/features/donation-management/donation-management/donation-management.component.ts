import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { DonationserviceService } from '../service/donationservice.service';

@Component({
  selector: 'app-donation-management',
  templateUrl: './donation-management.component.html',
  styleUrls: ['./donation-management.component.css']
})
export class DonationManagementComponent implements OnInit {
  dateForm!:FormGroup
  // disableSelect = new FormControl(false);
  // category:any=[{'S_No':'1', 'Date':'12-11-2022', 'DonorName':"ajith","Country":"India","Amountdonated":"10,500.00"},
  // {'S_No':'1', 'Date':'12-11-2022', 'DonorName':"ajith","Country":"India","Amountdonated":"10,500.00"},
  // {'S_No':'1', 'Date':'12-11-2022', 'DonorName':"ajith","Country":"India","Amountdonated":"10,500.00"},
  // {'S_No':'1', 'Date':'12-11-2022', 'DonorName':"ajith","Country":"India","Amountdonated":"10,500.00"}]
  displayedColumns: string[] = ['S_No', 'Date', 'DonorName',"Country","Amountdonated","ViewDetails"];
total="1,20,52,365"
 
  dataSource :any;
  data:any;
  constructor(private formbuilder:FormBuilder, private service:DonationserviceService) { }

  ngOnInit(): void {
    this.dateForm = this.formbuilder.group({
      
      fromdate: [null, Validators.compose([Validators.required])],
      todate: [null, Validators.compose([Validators.required])],
      checkbox:[null, Validators.compose([Validators.required])],
      
    })
   
    this.service.getdonationdetails().subscribe({
      next: (response) => {
        this.data = response;
        this.dataSource = new MatTableDataSource<any>(this.data);
        console.log(this.data)
      },
      error: (error) => {
        console.error(error.message);
      }
    });

  }
  viewDetails(name:any){

  }
  filterDate(){
    
  }

}
