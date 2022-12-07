import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {
  // data=[{"s_no":"1","date":"02-08-2022","type":"Live class Link","media_file":" 12",},
  // {"s_no":"2","date":"02-08-2022","type":"media","media_file":" 11",},
  // {"s_no":"3","date":"02-08-2022","type":"Live class Link","media_file":" 8",},
  // {"s_no":"4","date":"02-08-2022","type":"Live class Link","media_file":" 9",},
  // {"s_no":"5","date":"02-08-2022","type":"Live class Link","media_file":" 10",},
  // {"s_no":"6","date":"02-08-2022","type":"Live class Link","media_file":" 5",},
  // {"s_no":"7","date":"02-08-2022","type":"Live class Link","media_file":" 9",},]
  displayedColumns: string[] = ['s_no', 'date', 'type',"media_file","Action"];
  dataSource :any;
  disableSelect = new FormControl(false);
  dataForm!:FormGroup
  dateForm!:FormGroup
  data:any
  courses:any
  constructor(private formbuilder: FormBuilder,private services:ServicesService) { 

  }

  ngOnInit(): void {
    this.dateForm = this.formbuilder.group({

      
      date: [null, Validators.compose([Validators.required])],
      // checkbox: [null, Validators.compose([Validators.required])],
  
    })
    this.dataForm = this.formbuilder.group({
    
      checkbox: [null, Validators.compose([Validators.required])],
  
    })
    this.getalldata()
    this.getallcourse()
  }
  getalldata(){
    this.services.getMediadetails().subscribe({
      next: (response) => {
        this.data = response; 
       console.log(this.data);
       
        this.dataSource = new MatTableDataSource<any>(this.data);
      
      },
      error: (error) => {
        console.error(error.message);
      }
    });

  }
  getallcourse(){
    this.services.getcoursesdetails().subscribe({
      next: (response) => {
        this.data = response; 
      //  console.log(this.data);
       this.courses=this.data.map((ele:any)=>ele.coursesName)
       console.log(this.courses);
      
      },
      error: (error) => {
        console.error(error.message);
      }
    });

  }
  datefilter(){
    const fromdate = this.dateForm.value.date
  
    let filters = this.data.filter((ele: any) => new Date(ele.date) >= new Date(fromdate))
    if (fromdate !== null ) {
      this.dataSource = new MatTableDataSource<any>(filters);
    }
  }
  
  

}
