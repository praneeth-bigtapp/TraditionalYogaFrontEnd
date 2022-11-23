import { Component, OnInit,AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, } from '@angular/material/table';
import { BlacklistUsersService } from '../blacklist-users.service';


@Component({
  selector: 'app-blacklist-users',
  templateUrl: './blacklist-users.component.html',
  styleUrls: ['./blacklist-users.component.css']
})
export class BlacklistUsersComponent implements OnInit{

  adddetails!:FormGroup
  filerror!:boolean;
  displayedColumns: string[] = ['blacklistuserId', 'date', 'blacklistUserEmail',"comments","action"];
  data:any;
  dataSource :any;
  values= 
  {
     
     "blacklistUserEmail": "",
     "date": "",
     "comments": ""
 }
  constructor(private service:BlacklistUsersService,private inputs: FormBuilder,private _snackBar: MatSnackBar ) {
   
    
   }
  // ngAfterViewChecked(): void {
  //   this. getdata()
  // }

  ngOnInit(): void {
    this.adddetails = this.inputs.group({
      
      emailId: [null, Validators.compose([Validators.required])],
   
      remarks: [null, Validators.compose([Validators.required])],
     

    })
   
    this. getdata()

  }
  
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
    this.getdata()
  }
  onblock(){
  
    
    const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
  this.values.blacklistUserEmail=this.adddetails.value.emailId
  this.values.comments=this.adddetails.value.remarks
  this.values.date=(year.toString()+'-'+month.toString()+'-'+day.toString())
this.addData(this.values)
  }

  getdata(){
    this.service.getBlacklist().subscribe({

      next: (response) => {
        this.data = response
        
        this.dataSource=new MatTableDataSource<any>(this.data)
   
      },

      error: (error) => {
        console.error(error.message);
      }

    })
  }
  addData(data:any){
  
    if(data.blacklistUserEmail!=null&& data.comments&&data.date){
      this.service.addBlacklist(data).subscribe({

        next: (response) => {
          // console.log(response)
         
     this.openSnackBar("Blocked user Sucessfully","ok")
        },
  
        error: (error) => {
          console.error(error.message);
        }
  
      })
    }
    //error msg
  }
  deleterow(value:any){
    
    let values={
      "blacklistuserId": value
       
   }
      this.service.removeBlacklist(values).subscribe({

        next: (response) => {
          // console.log("deleted")
          this.openSnackBar("Unblocked user Sucessfully","ok")
     
        },
  
        error: (error) => {
          console.log(error.message);
        }
  
      })
    
  }
}
