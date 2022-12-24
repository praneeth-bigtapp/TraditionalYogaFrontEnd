import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogPopupComponent } from 'src/app/shared/dialog-popup/dialog-popup.component';
import { AudioService } from '../audio.service';
import { MatSnackBar, } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  displayedColumns: string[] = ["id","audioTitle", "uploadCategory", "audioCategoryId", "audioDuration", "Actions"];
  dataSource: any;
  issubmit: boolean = true
  iseditable: boolean = false
  displaycontent: boolean = false
  filerror!: boolean
  filerror2: boolean = false
  gridData: any;
  pageno: number = 1
  filterData: any
  disableSelect = new FormControl(false);
  Audiomanagement!: FormGroup;
 
  audiodata!: any
  courses!: any;
  Audiodata!:any
  AllaudioCategory!:any;
  data:any;

  onpaginatechange(event: any) {
    if (event.pageIndex === 0) {
      this.pageno = 1
      return
    }
    this.pageno = (event.pageIndex * event.pageSize) + 1
    return
  }


  // this. Audiomanagement = this.formbuilder.group({
  //   course: [null, Validators.compose([Validators.required])],
  //   testtype: [null, Validators.compose([Validators.required])],
  //   testname: [null, Validators.compose([Validators.required])],
  //   leveltest: [null, Validators.compose([Validators.required])],
  //   file: [null, Validators.compose([Validators.required])],
  //   description: [null, Validators.compose([Validators.required])],
  // data = [
  //   {
  //     "Title": "RYT 200 Course photos",
  //     "category": "21-07-2022",
  //     "File Type": "Admin",
  //     "numberofphotosadded": 18,
      
  //   },
  //   {
  //     "GalaryName": "RYT 800Course photos",
  //     "dateofcreation": "22-07-2022",
  //     "role": "Student",
  //     "numberofphotosadded": 108,
  //     "isvisible": true
  //   },
  //   {
  //     "GalaryName": "RYT 800Course photos",
  //     "dateofcreation": "22-07-2022",
  //     "role": "Student",
  //     "numberofphotosadded": 10,
  //     "isvisible": true
  //   },
  //   {
  //     "GalaryName": "RYT 800Course photos",
  //     "dateofcreation": "22-07-2022",
  //     "role": "Student",
  //     "numberofphotosadded": 108,
  //     "isvisible": true
  //   }



  // ]


  constructor(private formbuilder: FormBuilder, private audio: AudioService,   private _snackBar: MatSnackBar, private dialog: MatDialog,) {
    this.Audiomanagement = this.formbuilder.group({

    courseid:[null],
      Id:[null],
      category: [null, Validators.compose([Validators.required])],
      audiocategoryid:[null],
      createdate:[null],
      createdby:[null],
      updatedate:[null],
      updateby:[null],
     
      file: [null, Validators.compose([Validators.required])],
      title: [null, Validators.compose([Validators.required])],
      upload: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],
      duration: [null, Validators.compose([Validators.required])],
      meta: [null, Validators.compose([Validators.required])],
      // audioType:[null],
      active:[null],
    })
    this.filterData = {
      filterColumnNames: this.displayedColumns.map((ele: any) => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };
    this.audio.getcourse().subscribe({
      next: (response) => {

        this.courses = response
        console.log(this.courses);

      },
      error: (error) => {
        console.error(error.message);
      }
    });

    // this.audiocategory.getaudio().subscribe({
    //   next: (response) => {

    //     this. audiocategory = response
    //     console.log(this. audiocategory);

    //   },
    //   error: (error) => {
    //     console.error(error.message);
    //   }

    // })
    // this.audio.getaudio().subscribe({
    //   next:(Response:any)=>{
    //   this. audiocategory = Response
    //   console.log(Response)
        

    //   },
    //   error: (error: { message: any; }) => {
    //     console.error(error.message);
    //   }
      
    // })

  }
  getaudiocategory(){
    this.audio.getaudio().subscribe({
      next: (response: any) => {
        this.Audiodata= response

        // this.data=this.data.reverse()
        // for (let data of this.data) {
        //   data.check = false;
        // }

        
        // this. audiocategory = response
        // console.log(this. audiocategory);
        // this.dataSource = new MatTableDataSource<any>(this.data)
        // this.filterData.gridData = this.data;
        // this.filterData.dataSource = this.dataSource;
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
        // this.filterData.sort = this.sort;
        // for (let col of this.filterData.filterColumnNames) {
        //   col.Value = '';
        // }

      },
      error: (error: { message: any; }) => {
        console.error(error.message);
      }

    })
    this.audio.getCategory().subscribe({
      next:(response:any)=>{
        this.data=response
        console.log('data');
        
        console.log(response)
      },
      error:(error:{message:any;})=>{
        console.error(error.message);
      }
    })
    this.audio.getAllAudio().subscribe({
      next:(response:any)=>{
        this.AllaudioCategory=response
        console.log(response)
        this.AllaudioCategory=this.AllaudioCategory.reverse()
        for (let AllaudioCategory of this.AllaudioCategory) {
          AllaudioCategory.check = false;
           this.dataSource = new MatTableDataSource<any>(this.AllaudioCategory)
        this.filterData.gridData = this.AllaudioCategory;
        this.filterData.dataSource = this.dataSource;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.filterData.sort = this.sort;
        for (let col of this.filterData.filterColumnNames) {
          col.Value = '';
        }
        }
      },
      error:(error:{message:any;})=>{
        console.error(error.message)
      }
    })


  }
  openSnackBar(data: any) {
    this._snackBar.open(data.message, 'Close', {
      duration: 2 * 1000,
    });
  }
  updatePagination() {

    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort;

  }
  ngAfterViewInit() {
    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort;

  }
  
  ChangeActive(_element:any){

  }
  IsActiveorNot(element:any){
    return true
  }
  viewdetails(element:any){
    this.displaycontent = true
    this.issubmit = false
    this.Audiomanagement.setValue({
      audiocategoryid:element.audioCategoryId,
      
      courseid:element.courseId,
      Id:element.id,
      category: element.uploadCategory,
      upload: element.audioType,
      file:"",
      title: element.audioTitle,
      description: element.audioDesc,
      duration: Number(element.audioDuration),
      meta: element.metakey,
      createdate:element.createdDate,
      createdby:element.createdBy,
      updatedate:element.updatedDate,
      updateby:element.updatedBy,
      active:element.isActive
    });


  }
  editdetails(element:any){
    this.iseditable = true
    this.displaycontent = true
    this.issubmit = true
    // let catogerieId=this.data.filter((ele:any)=>{if(ele.audioCategoryId===
    //   ){
    //   return this.data.audioName
    // }})
    console.log("catoger:"+element.audioCategoryId.audioName);
    
    this.Audiomanagement.setValue({
      audiocategoryid:element.audioCategoryId,
      
      courseid:element.courseId,
      Id:element.id,
      category: element.audioCategoryId.audioName,
      upload: element.audioType,
      file:"",
      title: element.audioTitle,
      description: element.audioDesc,
      duration: Number(element.audioDuration),
      meta: element.metakey,
      createdate:element.createdDate,
      createdby:element.createdBy,
      updatedate:element.updatedDate,
      updateby:element.updatedBy,
      active:element.isActive
    });
    this.Audiomanagement.value.category= element.audioCategoryId.audioName

  }
  deletedetails(Id:any){
    console.log(Id);
    const body = {
      "id": Number(Id) 
    }
console.log(body);
    const dialogref = this.dialog.open(DialogPopupComponent, {
      data: {
        title: "Delete Confirmation",
        message: "Are You Sure You Want To testimonial ?"
      },
      width: "30%"
    })

    dialogref.afterClosed().subscribe((Id: any) => {
      if (Id) {
        this.audio.delete(body).subscribe({
          next: (response) => {
           console.log(response);
            this.Audiomanagement.reset()
            this. getaudiocategory()
          },
          error: (error) => {
            console.error(error.message);
          }
        })
        return
      }

    })


  }
  addcourse() {
    this.displaycontent = !this.displaycontent
  }
  reseteditable() {
    this. Audiomanagement.reset()
    this.iseditable = false
    this.displaycontent = !this.displaycontent
    this.issubmit = true
    this.filerror2 = false
  }

  ngOnInit(): void {
    this.getaudiocategory()

  
    this.filterData = {
      filterColumnNames: this.displayedColumns.map(ele => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };

    this.dataSource = new MatTableDataSource<any>(this.AllaudioCategory)
   
    this.filterData.gridData = this.AllaudioCategory;
    this.filterData.dataSource = this.dataSource;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.filterData.sort = this.sort;
    for (let col of this.filterData.filterColumnNames) {
      col.Value = '';
    }

  }

  gobutton()
  {
    
  }

  filechange(event: any) {
    this.filerror = this.Audiomanagement.value.file === null ? true : false

    this.audiodata = event.target.files[0]
  }
  

  addAudiocategory() {

    if (this.Audiomanagement.invalid)
      return this.Audiomanagement.markAllAsTouched()

    const body = {
   
      "courseId": 0,
        "audioCategoryId": {
            "audioCategoryId": 2
            
        },
        "uploadCategory": this.Audiomanagement.value.category ,
        "audioType": {
            "audioType": this.Audiomanagement.value.upload,
            
        },
        "audioFile": this.Audiomanagement.value.file,
        "audioTitle": this.Audiomanagement.value.title,
        "audioDesc": this.Audiomanagement.value.description,
        "audioDuration": this.Audiomanagement.value.duration,
        "metakey": this.Audiomanagement.value.meta,
        "createdDate": "",
        "createdBy": "",
        "updatedDate": "",
        "updatedBy": "",
        "isActive": ""
    

    
    }
    if (this.iseditable){
      const body = {
   "id":2,
    "courseId": 0,
   "audioCategoryId": {
    "audioCategoryId": 3
    
},
"uploadCategory": this.Audiomanagement.value.category ,
"audioType": {
    "audioType": this.Audiomanagement.value.upload,
    
},
"audioFile": this.Audiomanagement.value.file,
"audioTitle": this.Audiomanagement.value.title,
"audioDesc": this.Audiomanagement.value.description,
"audioDuration": this.Audiomanagement.value.duration,
"metakey": this.Audiomanagement.value.meta,
"createdDate": "",
"createdBy": "",
"updatedDate": "",
"updatedBy": "",
"isActive": ""
      
      
  
      
      }
      console.log("editing");
      
      this.audio.updateaudio(body).subscribe({
        next:(response)=>{
          console.log(response)
          this.Audiomanagement.reset()
          this.getaudiocategory()

        },
        error:(error)=>{
          console.error(error.message)
        }
      })
      return
    }
    console.log(this.Audiomanagement);
    console.log(body)

    this.audio.audiopost(body).subscribe({
      next: (response) => {
        console.log(response)
        this.Audiomanagement.reset()

        this.getaudiocategory()

      },
      error: (error) => {
        console.error(error.message);

      }
    })

  }

}