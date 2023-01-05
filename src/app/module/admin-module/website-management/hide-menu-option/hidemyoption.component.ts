import { Component, OnInit } from '@angular/core';
import { WebsitemanagementService } from '../service/websitemanagement.service';

@Component({
  selector: 'app-hidemyoption',
  templateUrl: './hidemyoption.component.html',
  styleUrls: ['./hidemyoption.component.css']
})
export class HidemyoptionComponent implements OnInit {


  isRYIT200500: boolean = false
  isRYIT600800: boolean = false
  constructor(
    private webmanagementservice: WebsitemanagementService
  ) { }

  ngOnInit(): void {
  }

  checboxchange(event: any) {
    console.log(this.isRYIT200500);
    console.log(this.isRYIT600800);

  }

}
