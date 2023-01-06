import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GalleryService } from 'src/app/data/services/admin-module/website-management/photo-gallery/photo-gallery.service';
 
@Component({
  selector: 'app-uploadgallery',
  templateUrl: './uploadgallery.component.html',
  styleUrls: ['./uploadgallery.component.css']
})
export class UploadgalleryComponent implements OnInit {
  uploadForm!: FormGroup;
  filelist: any = [];
  photoList: File | any;

  albumStatus: Boolean = false;
  albumList: any
  album: any

  constructor(
    private _snackBar: MatSnackBar,
    public router: Router,
    private service: GalleryService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      album: ['null', Validators.required],
      photoGallery: [null, Validators.required],
      fileDescription: [null]
    });

    this.service.getAll().subscribe({
      next: (response) => {
        this.albumList = response;
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  submitPhoto() {
    alert("uploading");
    // const
    const formData = new FormData();
    Object.keys(this.uploadForm.controls).forEach(formControlName => {
      console.log(this.uploadForm.value.photoGallery);
    });
    console.log(this.filelist);
    console.log(this.photoList);
    formData.append('picture', this.photoList);

    this.service.getUploadImages(formData).subscribe({
      next: (response) => {
        this.openSnackBar(response);
        this.filelist.length = 0;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  onFileChange(event: any): void {
    // console.log(Object.keys());
    const temp = this.filelist;
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
    });
    // let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      this.photoList = event.target.files[0];
    }

  }

  openSnackBar(data: any) {
    this._snackBar.open(data.message, 'Close', {
      duration: 2 * 1000,
    });
  }

  albumChange() {
    this.albumStatus = true;
  }

  creategallery() {

  }

  manageGallery() {
    this.router.navigate(["gallery"]);
  }

  addGallery() {

  }

  detectchange() {
    // console.log(this.filelist);
  }
  removeImage(name: any) {
    this.filelist = this.filelist.filter((ele: any) => ele.name !== name);
  }

  uploadImage() {

    //   const formData = new FormData();
    //   const files = this.filelist.map((ele: any) => ele.file);
    //   console.log(files);
    //   formData.append('picture', files);

    //   this.service.getUploadImages(formData).subscribe({
    //     next: (response) => {
    //       this.openSnackBar(response);
    //       this.filelist.length = 0;
    //     },
    //     error: (error) => {
    //       console.error(error);

    //     }
    //   });

  }

}
