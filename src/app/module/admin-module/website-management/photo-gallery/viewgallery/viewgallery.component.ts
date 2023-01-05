import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewgallery',
  templateUrl: './viewgallery.component.html',
  styleUrls: ['./viewgallery.component.css']
})
export class ViewgalleryComponent implements OnInit {


  filelist!: any
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  manageGallery() {
    this.router.navigate(["gallery"]);
  }


}
