import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, Validators, FormGroup, FormBuilder, } from '@angular/forms';
import { CreateGalleryComponent } from '../create-gallery/create-gallery.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GalleryService } from 'src/app/data/services/admin-module/website-management/photo-gallery/photo-gallery.service';
import { DialogPopupComponent } from 'src/app/shared/components/dialog-popup/dialog-popup.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  filterData: any
  gridData: any;
  createalbum!: FormGroup
  displaycontent: boolean = false
  issubmit: boolean = true
  iseditable: boolean = false
  filerror!: boolean 
  filerror2: boolean = false
  updatebtn=false
  submitbth=true
  data:any;
  displayedColumns: string[] = ["GalaryName", "dateofcreation", "role", "numberofphotosadded", "Actions"];

  dataSource: any;
  
  // displayedColumns: string[] = ["image","Galleryname","dateofcreationOfCreation",'numOfPhotos','status', 'view'];

  constructor(
    public dialog: MatDialog,
    public router: Router,
    private formbuilder: FormBuilder,
    private service:GalleryService,
    private _snackBar: MatSnackBar,
  ) {

    this.createalbum = this.formbuilder.group({

      albumname: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],
      fromdate: [null, Validators.compose([Validators.required])],
      // duration: [null, Validators.compose([Validators.required])],
      todate: [null, Validators.compose([Validators.required])],

    });
  }

  ngOnInit(): void {
    this.getAlldata()
    
    this.filterData = {
      filterColumnNames: this.displayedColumns.map(ele => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };

    this.dataSource = new MatTableDataSource<any>(this.data)
    this.filterData.gridData = this.data;
    this.filterData.dataSource = this.dataSource;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.filterData.sort = this.sort;
    for (let col of this.filterData.filterColumnNames) {
      col.Value = '';
    }

  }
  createGallery() {
    this.dialog.open(CreateGalleryComponent);
  }
  ngAfterViewInit() {
    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort;

  }

  updatePagination() {

    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort;

  }

  addphoto() {
    this.router.navigate(["admin/uploadGallery"])
   

  }

 
  IsActiveorNot2(element: any) {
    // const body={

    // }
    // this.service.addList(body).subscribe({
    //   next: (response) => {
    //     this.openSnackBar(response)
      
    //   },
    //   error: (error) => {
    //     console.error(error.message);
    //   }
    // })
 return true
  }
  viewdetails(element: any) {
    // alert('hi')
    this.displaycontent=true
    this.submitbth=false
    this.updatebtn=false

    this.createalbum.setValue({

      albumname:element.galleryName,
      description: element.galleryDescription,
      fromdate: element.fromDate,
      
      todate: element.toDate,

    });
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
});
   
  }
  editbtn(element:any){
    this.displaycontent=true
    this.updatebtn=true
    this.submitbth=false

    this.createalbum.setValue({

      albumname:element.galleryName,
      description: element.galleryDescription,
      fromdate: element.fromDate,
      
      todate: element.toDate,

    });
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
});
  }
  editdetails() {
    this.updatebtn=false
    this.submitbth=true
    const body={
      "photoGalleryId": 3,
      "galleryName":this.createalbum.value.albumname,
      "galleryDescription": this.createalbum.value.description,
    
      "fromDate":this.createalbum.value.fromdate,
    "toDate": this.createalbum.value.todate

      }
    this.service.updateList(body).subscribe({
      next: (response) => {
       console.log(response)
       this.createalbum.reset()
       this.openSnackBar(response)
       this.getAlldata()
      
      },
      error: (error) => {
        console.error(error.message);
        this.openSnackBar(error.message);
      }
    })

  }
  deletedetails(element: any) {
     const body={
      "photoGalleryId": element.photoGalleryId
      
      }

      const dialogref = this.dialog.open(DialogPopupComponent, {
        data: {
          title: "Delete Confirmation",
          message: "Are You Sure You Want To Delete this library ?"
        },
        width: "30%",
        height:"25%"
      })
  
      dialogref.afterClosed().subscribe(data => {
        if (data) {
         
    this.service.DeleteLit(body).subscribe({
      next: (response) => {
        this.openSnackBar(response)
        this.getAlldata()
      
      },
      error: (error) => {
        console.error(error.message);
      }
    })
          return
        }
  
      })



  }
  album() {
    this.displaycontent = !this.displaycontent
  }

 
    openSnackBar(data: any) {
      this._snackBar.open(data.message, 'Close', {
        duration: 2 * 1000,
      });
    }
  reseteditable() {
    this.createalbum.reset()
    this.iseditable = false
    this.displaycontent = !this.displaycontent
    this.issubmit = true
    this.filerror2 = false
  }
  addAlbum(){

    if(this.createalbum.invalid){
      return this.createalbum.markAllAsTouched()
    }
    const body=
      {
        "galleryName":this.createalbum.value.albumname,
        "galleryDescription": this.createalbum.value.description,
        "fromDate":this.createalbum.value.fromdate,
    "toDate": this.createalbum.value.todate

    }
    
    this.service.addList(body).subscribe({
      next: (response) => {
        this.createalbum.reset()
        this.openSnackBar(response)
        this.getAlldata()
      
      },
      error: (error) => {
        console.error(error.message);
        this.openSnackBar(error.message)
      }
    })
  }
  getAlldata(){
    this.service.getAll().subscribe({
      next: (response) => {
        console.log(response) 
        this.data=response
        this.data=this.data.reverse()    
        this.dataSource = new MatTableDataSource<any>(this.data)
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
    })
  }


  IsActiveorNot(id: any) {
    const yes = ["Yes", "Y", "yes", "y"]
    const no = ["No", "N", "no", "n"]

    const filterdata = this.data.filter((ele: any) => ele.photoGalleryId === id)[0].active

    return yes.includes(filterdata)
  };

  ChangeActive(element: any) {

    const body = 
      {
        "photoGalleryId": element.photoGalleryId,
        "active": element.active
    }
    console.log('ca,me');
   
    

    const yes = ["Yes", "Y", "yes", "y"]
    const no = ["No", "N", "no", "n"]
    if(yes.includes(element.active))
    {
      body.active='N'
    }
    else{
      body.active='Y'
    }
   
          this.service.VisitList(body).subscribe({
            next: (response) => {
              this.openSnackBar(response)
             this.getAlldata()
            },
            error: (error) => {
              console.error(error.message);

            }
          })
        
      
  }


}