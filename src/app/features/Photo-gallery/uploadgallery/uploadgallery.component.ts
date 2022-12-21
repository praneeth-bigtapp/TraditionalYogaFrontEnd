import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-uploadgallery',
  templateUrl: './uploadgallery.component.html',
  styleUrls: ['./uploadgallery.component.css']
})
export class UploadgalleryComponent implements OnInit {

  filelist: any = []

  formdata = new FormData()

  constructor(
    private _snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  onFileChange(event: any): void {

    this.formdata.append("files", event.target.files)
    this.filelist = Object.values(event.target.files).map((file: any) => {
      const { name, lastModified, lastModifiedDate, type, size } = Object(file)
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {

        this.addfilestoUI(({
          name,
          description: "",
          path: reader.result,
        }))
      }
    })

  }

  addfilestoUI(value: any) {
    this.filelist.push(value)
    this.filelist = this.filelist.filter(Boolean)
  }


  openSnackBar(data: any) {
    this._snackBar.open(data.message, 'Close', {
      duration: 2 * 1000,
    });
  }


  creategallery() {

  }

  manageGallery() {
    this.router.navigate(["gallery"]);
  }

  addgallery() {

  }

  detectchange() {
    console.log(this.filelist);
  }
  removeimage(name: any) {

    this.filelist = this.filelist.filter((ele: any) => ele.name !== name)

  }

  uploadimage() {
    console.log(this.formdata.get("files"));
    // this.openSnackBar({ message: "Uploaded" })
  }

}
