import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-sortingresources',
  templateUrl: './sortingresources.component.html',
  styleUrls: ['./sortingresources.component.css']
})
export class SortingresourcesComponent implements OnInit {



  sortingValues: any = {
    fromTime: 0,
    toTime: 0,
    fromDate: null,
    toDate: null,
    description: null,
    selectMutliple: null,
    type: null

  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SortingresourcesComponent>
  ) { }

  ngOnInit(): void {
  }


  timeChange(event: any) {
    console.log(event);
    console.log(this.sortingValues.fromDate);
    

  }
}
