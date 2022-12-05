import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-uploadgallery',
  templateUrl: './uploadgallery.component.html',
  styleUrls: ['./uploadgallery.component.css']
})
export class UploadgalleryComponent implements OnInit {


  inputSubModuleId !: number

  parentpath: string = "D:\\Angular Project\\TY-Screens\\Admin_19-Sep-2022\\"



  uploadfile: any =
    [
      {
        "name": "File1",
        "path": `https://i.pinimg.com/originals/64/41/61/644161b5ce15397473f2c4a49620ee8f.gif`,
        "description": "",

      },
      {
        "name": "File2",
        "path": `https://www.nicepng.com/png/detail/244-2443893_sun-salutation-complete-sun-salutation-yoga-cartoon.png`,
        "description": ""
      },
      {
        "name": "File3",
        "path": `data:image/png;base64,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`,
        "description": ""
      },
      {
        "name": "File4",
        "path": `https://static.vecteezy.com/system/resources/previews/004/261/144/original/woman-meditating-in-nature-and-leaves-concept-illustration-for-yoga-meditation-relax-recreation-healthy-lifestyle-illustration-in-flat-cartoon-style-free-vector.jpg`,
        "description": ""
      },
      {
        "name": "File5",
        "path": `https://play-lh.googleusercontent.com/pmEnTOeRvosC1yOXFVwo15zS2uAdB9nijugU93NbrmFBYt61IVCZBzg7EZ00YTqmLw=w240-h480-rw`,
        "description": ""
      },
    ]

  constructor(
    private _snackBar: MatSnackBar,
  ) {


  }

  ngOnInit(): void {
  }



  opensnackBar(data: any) {
    this._snackBar.open(data.message, "Close")
  }


  creategallery() {

  }

  managegallery() {

  }

  addgallery() {

  }

  detectchange() {
    console.log(this.uploadfile);

  }
  removeimage(name: any) {

    this.uploadfile = this.uploadfile.filter((ele: any) => ele.name !== name)

  }

  uploadimage() {
    console.log(this.uploadfile);

    const finaldata = this.uploadfile

    this.uploadfile = []
 
    this.opensnackBar({ message: "Uploaded" })

  }

}
