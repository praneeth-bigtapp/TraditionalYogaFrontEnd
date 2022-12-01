import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  data=[{"Galleryname":"RYT 200 Course Photos","DateOfCreation":'21/07/2022 01:41:18','numOfPhotos':'17'},
  {"Galleryname":"RYT 200 Course Photos","DateOfCreation":'21/07/2022 01:41:18','numOfPhotos':'17'},
  {"Galleryname":"RYT 200 Course Photos","DateOfCreation":'21/07/2022 01:41:18','numOfPhotos':'17'},
  {"Galleryname":"RYT 200 Course Photos","DateOfCreation":'21/07/2022 01:41:18','numOfPhotos':'17'},
]
  

dataSource: any;
displayedColumns: string[] = ["image","Galleryname","DateOfCreation",'numOfPhotos','status', 'view'];

  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>(this.data)
  }


}
