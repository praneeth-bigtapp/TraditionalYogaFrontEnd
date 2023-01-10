import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators,FormGroup,  FormBuilder, } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MapuserService } from '../mapuser.service';

@Component({
  selector: 'app-map-course',
  templateUrl: './map-course.component.html',
  styleUrls: ['./map-course.component.css']
})
export class MapCourseComponent implements OnInit {
  data:any
  displayedColumns: string[] = ['sno', 'image', 'name',"emailId","country","Gender","usersince","status", "view", "select"];
  dataSource :any;
  iseditable: boolean = false
  registredId= null;
  courseId:any;
  
  disableSelect = new FormControl(false);
  // nameerror = new FormControl('', [Validators.required ]);
  // mailerror = new FormControl('', [Validators.required ]);
  // selectMob = new FormControl('', [Validators.required ]);
  // selectRegion = new FormControl('', [Validators.required ]);
  // country = new FormControl('', [Validators.required ]);
  // status = new FormControl('', [Validators.required ]);
  // agefrom = new FormControl('', [Validators.required ]);
  // ageto = new FormControl('', [Validators.required ]);
  selection = new SelectionModel<any>(true, []);
  Mapusers!: FormGroup 
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  filterData: any;
  gridData: any;
  displaycontent: boolean = false
  pageno:number=1
  courseID= null; 
  courseIDOne= null; 
  courseIDTwo= null; 
  courseIDThree= null; 
  courseIDFour= null; 
  courseIDFive= null; 
  courseIDSix= null;
  courseIDSeven= null;  
  courseIDEight= null; 
 body:any;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  

  constructor( private formbuilder:FormBuilder, private service:MapuserService,private _snackBar: MatSnackBar,) {
    this.Mapusers = this.formbuilder.group({
      courseId: [null],
      nameerror: [null, Validators.compose([Validators.required])],
      mailerror: [null, Validators.compose([Validators.required])],
      country: [null, Validators.compose([Validators.required])],
      // duration: [null, Validators.compose([Validators.required])],
      selectMob: [null, Validators.compose([Validators.required])],
      selectRegion: [null, Validators.compose([Validators.required])],
      agefrom: [null, Validators.compose([Validators.required])],
      ageto: [null, Validators.compose([Validators.required])],
      status: [null, Validators.compose([Validators.required])],
      course: [null, Validators.compose([Validators.required])],
      gender: [null, Validators.compose([Validators.required])],
    });
    this.filterData = {
      filterColumnNames: this.displayedColumns.map((ele: any) => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };

    this.service.getcourse().subscribe({
      next: (response) => {
        console.log(response)

        this.courseId = response

      },
      error: (error) => {
        console.error(error.message);
      }
    });
  
   
  
   
   }


   getuserdata(){
    this.service.getuser().subscribe({
      next: (response) => {
        console.log(response)

        this.data = response
        this.dataSource=new MatTableDataSource<any>(this.data)
        // this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // this.filterData = {
        //   filterColumnNames: this.displayedColumns.map(ele => ({ "Key": ele, "Value": "" })),
        //   gridData: this.gridData,
        //   dataSource: this.dataSource,
        //   paginator: this.paginator,
        //   sort: this.sort
        // }
        // this.dataSource = new MatTableDataSource<any>(this.data)
        this.filterData.gridData = this.data;
        this.filterData.dataSource = this.dataSource;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.filterData.sort = this.sort;
        for (let col of this.filterData.filterColumnNames) {
          col.Value = '';
        }

      },
      error: (error) => {
        console.error(error.message);
      }
    });

   }

  ngOnInit(): void {
    this.  getuserdata()
  
   
  

    
    
  }
  ngAfterViewInit() {
    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort;

  }
  mapCourse(){
    this.displaycontent = !this.displaycontent
  }
  updatePagination() {

    
    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort;
  }
  
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach((row: any) => this.selection.select(row));
  }
  reseteditable() {
    // this.addCourseForm.reset()
    this.iseditable = false
    this.displaycontent = !this.displaycontent
  }
  // getcourse(isSelected){

  // }
  openSnackBar(data: any) {
    this._snackBar.open(data.message, 'Close', {
      duration: 2 * 1000,
    });
  }
  onpaginatechange(event: any) {
    if (event.pageIndex === 0) {
      this.pageno = 1
      return
    }
    this.pageno = (event.pageIndex * event.pageSize) + 1
    return
  }
  getregistrationId(element:any){
    this.registredId=element
  }
  getCourseId(element:any){
    if(this.courseID== null)
    {
      this.courseID=element
    }else if(this.courseIDOne ==null){
      this.courseIDOne=element

    }
    else if(this.courseIDTwo ==null){
      this.courseIDTwo=element

    }
    else if(this.courseIDThree ==null){
      this.courseIDThree=element

    }
    else if(this.courseIDFour == null){
      this.courseIDFour=element

    }
    else if(this.courseIDFive ==null){
      this.courseIDFive=element

    }
    // else if(this.courseIDSix){
    //   this.courseIDSix=element

    // }
    // else if(this.courseIDSeven){
    //   this.courseIDSeven=element

    // }
    // else if(this.courseIDEight){
    //   this.courseIDEight=element

    // }
    else{
      return
    }
    
    
    
   
    
    
   
   
    
    console.log(element)

  }
  mapuserCourse(){
    if(this.registredId == null && this.courseID == null ){
      console.log("select student and course")
    }
    else if(this.registredId== null){
      console.log('select student')
    }
    else if( this.courseID == null){
      console.log('select course')
    }
    else{
      if(this.registredId !== null && this.courseID !== null && this.courseIDOne !== null && this.courseIDTwo !== null && this.courseIDThree !== null && this.courseIDFour !== null && this.courseIDFive
        !== null)
      {
     //   this.body={
     //     "studentId": {
     //         "registrationId": this.registredId
     //     },
     //     "coursesId": {
     //         "coursesId": this.courseID
     //     }
     // }
    
   
     this.body={
       "studentId": {
           "registrationId": this.registredId
       },
       "coursesId": [
          {
               "coursesId": this.courseID
           },
           {
               "coursesId": this.courseIDOne
           },
           {
               "coursesId": this.courseIDTwo
           },
           {
             "coursesId": this.courseIDThree
         },
         {
           "coursesId": this.courseIDFour
       },
       {
         "coursesId": this.courseIDFive
     },
   //   {
   //     "coursesId": this.courseIDSix
   // },
   // {
   //   "coursesId": this.courseIDSeven
   // },
   // {
   //   "coursesId": this.courseIDEight
   // }
   
       ]
   }
    
      }
      else if(this.registredId !== null && this.courseID !== null && this.courseIDOne !== null && this.courseIDTwo !== null && this.courseIDThree !== null && this.courseIDFour !== null ){
       this.body={
         "studentId": {
             "registrationId": this.registredId
         },
         "coursesId": [
            {
                 "coursesId": this.courseID
             },
             {
                 "coursesId": this.courseIDOne
             },
             {
                 "coursesId": this.courseIDTwo
             },
             {
               "coursesId": this.courseIDThree
           },
           {
             "coursesId": this.courseIDFour
         },
        
    
     
         ]
     }
   
       }
       else if(this.registredId !== null && this.courseID !== null && this.courseIDOne !== null && this.courseIDTwo !== null && this.courseIDThree !== null  ){
         this.body={
           "studentId": {
               "registrationId": this.registredId
           },
           "coursesId": [
              {
                   "coursesId": this.courseID
               },
               {
                   "coursesId": this.courseIDOne
               },
               {
                   "coursesId": this.courseIDTwo
               },
               {
                 "coursesId": this.courseIDThree
             },
         
      
       
           ]
       }
     
         }
         else if(this.registredId !== null && this.courseID !== null && this.courseIDOne !== null && this.courseIDTwo !== null  ){
           this.body={
             "studentId": {
                 "registrationId": this.registredId
             },
             "coursesId": [
                {
                     "coursesId": this.courseID
                 },
                 {
                     "coursesId": this.courseIDOne
                 },
                 {
                     "coursesId": this.courseIDTwo
                 },
                
        
         
             ]
         }
       
           }
           else if(this.registredId !== null && this.courseID !== null && this.courseIDOne !== null ){
             this.body={
               "studentId": {
                   "registrationId": this.registredId
               },
               "coursesId": [
                  {
                       "coursesId": this.courseID
                   },
                   {
                       "coursesId": this.courseIDOne
                   },
                   
                 
          
           
               ]
           }
         
             }
             else if(this.registredId !== null && this.courseID !== null  ){
               this.body={
                 "studentId": {
                     "registrationId": this.registredId
                 },
                 "coursesId": [
                    {
                         "coursesId": this.courseID
                     },
                     
                
            
             
                 ]
             }
           
               }
    }
   
  
   
    console.log(this.body)
  this.service. postadcourse(this.body).subscribe({
    next: (response) => {
      console.log(response)
      this.openSnackBar({ message: "Student Mapped to course Successfully" })
    //  window.location.reload()
      
    },
    error: (error) => {
      console.error(error.message);

    }
  }) 
   
  }
  



 
}



// service








