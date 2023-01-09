import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { VideoGalleryService } from 'src/app/data/services/admin-module/website-management/video-gallery/video-gallery.service';
import { DialogPopupComponent } from 'src/app/shared/components/dialog-popup/dialog-popup.component';
import { InputvalidationService } from 'src/app/shared/services/input-validation.service';

@Component({
  selector: 'app-upload-videos',
  templateUrl: './upload-videos.component.html',
  styleUrls: ['./upload-videos.component.css']
})
export class UploadVideosComponent implements OnInit {

  uploadVideo!: FormGroup

  filelist: any = []
  pageno: number = 1
  formdata = new FormData()
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  filterData: any
  gridData: any;
  createalbum!: FormGroup
  displaycontent: boolean = false
  issubmit: boolean = true
  iseditable: boolean = false
  videoError: boolean = false
  albumList: any
  audioId:any;
data:any;
  // data = [
  //   {
  //     "GalaryName": "RYT 200 Course photos",
  //     "dateofcreation": "21-07-2022",
  //     "role": "Admin",
  //     "numberofvideosadded": 18,
  //     "SNo": "1",
  //     "isvisible": false
  //   },
  //   {
  //     "GalaryName": "RYT 800Course photos",
  //     "dateofcreation": "22-07-2022",
  //     "role": "Student",
  //     "numberofvideosadded": 108,
  //     "SNo": "2",
  //     "isvisible": true
  //   },
  //   {
  //     "GalaryName": "RYT 800Course photos",
  //     "dateofcreation": "22-07-2022",
  //     "role": "Student",
  //     "numberofvideosadded": 10,
  //     "SNo": "3",
  //     "isvisible": true
  //   },
  //   {
  //     "GalaryName": "RYT 800Course photos",
  //     "dateofcreation": "22-07-2022",
  //     "role": "Student",
  //     "numberofvideosadded": 108,
  //     "SNo": "4",
  //     "isvisible": true
  //   }



  // ]
  displayedColumns: string[] = ["SNo", "GalaryName", "dateofcreation", "role", "numberofvideosadded", "Actions"];

  dataSource: any;

  constructor(
    public router: Router,
    private formbuilder: FormBuilder,
    private service: VideoGalleryService,
    private dialog: MatDialog
  ) {
    this.uploadVideo = this.formbuilder.group({
      videoId: [null],
     
      album: [null, Validators.compose([Validators.required])],
      Title: [null, Validators.compose([Validators.required])],
      videoLink: [null, Validators.compose([Validators.required, Validators.pattern(InputvalidationService.inputvalidation.videolink)])],
      isVisible: [null, Validators.compose([Validators.required])]

    });
  }

  ngOnInit(): void {
    // this.dataSource = new MatTableDataSource<any>(this.data)
    // this.filterData = {
    //   filterColumnNames: this.displayedColumns.map(ele => ({ "Key": ele, "Value": "" })),
    //   gridData: this.gridData,
    //   dataSource: this.dataSource,
    //   paginator: this.paginator,
    //   sort: this.sort
    // };


    // this.filterData.gridData = this.data;
    // this.filterData.dataSource = this.dataSource;
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    // this.filterData.sort = this.sort;
    // for (let col of this.filterData.filterColumnNames) {
    //   col.Value = '';
    // }
    this.getvideo()

  }

  getvideo() {
    this.service. getAlbum().subscribe({
      next: (response) => {
        this.data = response
        for (let data of this.data) {
          data.check = false;
        }
        console.log(this.data);
        this.data = this.data.reverse()

        this.dataSource = new MatTableDataSource<any>(this.data)
        this.filterData = {
          filterColumnNames: this.displayedColumns.map(ele => ({ "Key": ele, "Value": "" })),
          gridData: this.gridData,
          dataSource: this.dataSource,
          paginator: this.paginator,
          sort: this.sort
        }; 

        this.filterData.gridData = this.data;
        this.filterData.dataSource = this.dataSource;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.filterData.sort = this.sort;
        for (let col of this.filterData.filterColumnNames) {
          col.Value = '';
        }
      }
    });
  }
  compareselect(obj1: any, obj2: any) {
    return obj1 && obj2 && obj1 === obj2
  }

  ngAfterViewInit() {
    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort;

  }

  updatePagination() {

    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort;

  }

  album() {
    this.displaycontent = !this.displaycontent
  }

  ChangeActive(element: any) {

  }
  IsActiveorNot(element: any) {
    const yes = ["Yes", "Y", "yes", "y"]
    const no = ["No", "N", "no", "n"]


    return yes.includes(element)
  };
  viewdetails(element: any) {
    this.createalbum.patchValue({

      GalaryName: element.GalaryName,
      dateofcreation: element.dateofcreation,

    })
    this.issubmit = false
    this.displaycontent = true
  }
  editdetails(element: any) {

    this.uploadVideo.patchValue({

      // GalaryName: element.GalaryName,
      // dateofcreation: element.dateofcreation,
      videoId:element.videoId,
      album:Number(element.album.albumId),
      Title:element.videoTitle,
      videoLink:element.videoLink,
      isVisible:element.visable

    })
    this.iseditable = true
    this.displaycontent = true
    this.issubmit = true

  }
  deletedetails(videoId: any) {
    const body = {
      "videoId":videoId
    }
    const dialogref = this.dialog.open(DialogPopupComponent, {
      data: {
        title: "Delete Confirmation",
        message: "Are You Sure You Want To Delete this video ?"
      },
      width: "30%",
      height: "25%"
    })

    dialogref.afterClosed().subscribe((videoId: any) => {
      if (videoId) {
        this.service.deleteVideoAlbum(body).subscribe({
          next: (response) => {
            this.getvideo()
           
           
          },
          error: (error) => {
            console.error(error.message);
          }
        })
        return
      }

    })
  }

  reseteditable() {
    this.createalbum.reset()
    this.iseditable = false
    this.displaycontent = !this.displaycontent
    this.issubmit = true
    this.videoError = false
  }

  onFileChange(event: any): void {

    const temp = this.filelist
    this.filelist = Object.values(event.target.files).map((file: any, index) => {
      const { name, lastModified, lastModifiedDate, type, size } = Object(file)
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        const currentvalue = ({
          name,
          description: "",
          path: reader.result,
          file
        })
        this.filelist.push(currentvalue)
        if (Object.values(event.target.files).length - 1 === index) {
          this.filelist = [...this.filelist, ...temp]
          this.filelist = this.filelist.filter(Boolean)
        }
      }
    })

  }

  manageGallery() {
    this.router.navigate(["admin/videogallery"]);
  }

  detectchange() {
    // console.log(this.filelist);
  }


  uploadVideoSubmit() {
    this.videoError = this.filelist.length === 0
    if (this.uploadVideo.invalid)
      return this.uploadVideo.markAllAsTouched()
      const body = {
      
    
        "album": {
            "albumId":Number(this.uploadVideo.value.album),
        },
        "videoTitle":this.uploadVideo.value.Title,
        "videoLink":this.uploadVideo.value.videoLink,
        "visable":this.uploadVideo.value.isVisible
    
    }

    if (this.iseditable) {

      const body = {
        "videoId": this.uploadVideo.value.videoId,
       
        "album": {
          "albumId":Number(this.uploadVideo.value.album),
      },
      "videoTitle":this.uploadVideo.value.Title,
      "videoLink":this.uploadVideo.value.videoLink,
      "visable":this.uploadVideo.value.isVisible
        }
      
      this.service.updateVideoAlbum(body).subscribe({
        next: (response) => {
          console.log(response);
         
          // this.uploadVideo.reset()
  
          this.getvideo()
  
        },
        error: (error) => {
          console.error(error.message);
  
        }
      })
      return
    }

   
    this.service.addVideoAlbum(body).subscribe({
      next: (response) => {
        console.log(response);
       
        // this.uploadVideo.reset()

        this.getvideo()

      },
      error: (error) => {
        console.error(error.message);

      }
    })



  }


}

