import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WebsitemanagementService } from '../service/websitemanagement.service';

@Component({
  selector: 'app-pearlwidsom',
  templateUrl: './pearlwidsom.component.html',
  styleUrls: ['./pearlwidsom.component.css']
})
export class PearlwidsomComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;



  wisdomform!: FormGroup

  filterData: any;
  gridData = [];
  dataSource: any;
  displayedColumns: string[] = ['quoteId', 'quoteTitle', 'quote', "quoteDate", "quoteType", "Action"];
  data: any;

  typelist: any[] = [{ id: "1", "name": "Testing" }]
  constructor(
    private service: WebsitemanagementService,
    private formbuilder: FormBuilder,
    private _snackBar: MatSnackBar,
  ) {

    this.filterData = {
      filterColumnNames: this.displayedColumns.map((ele: any) => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };
    this.getListofwisdom()
    this.wisdomform = this.formbuilder.group({
      quotetitle: [null, Validators.compose([Validators.required])],
      quote: [null, Validators.compose([Validators.required])],
      quotedate: [null, Validators.compose([Validators.required])],
      quotetype: [null, Validators.compose([Validators.required])],
    })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort;
  }

  getListofwisdom() {
    this.service.getpearlofwisdom().subscribe({
      next: (response) => {
        console.log(response);

        this.data = response
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

  openSnackBar(data: any) {
    this._snackBar.open(data.message, 'Close');
  }

  updatePagination(col: any) {

  }

  viewdetails(element: any) {
    console.log(element);
  }
  editdetails(element: any) {
    console.log(element);
  }
  deletedetails(element: any) {
    console.log(element);
  }

  IsActiveorNot(id: any) {
    const yes = ["Yes", "Y", "yes", "y"]
    const no = ["No", "N", "no", "n"]

    const filterdata = this.data.filter((ele: any) => ele.quoteId === id)[0].isActive

    return yes.includes(filterdata)
  };

  ChangeActive(id: any) {

    const yes = ["Yes", "Y", "yes", "y"]
    const no = ["No", "N", "no", "n"]
    this.data.map((element: any) => {
      if (element.quoteId === id) {
        element.isActive = yes.includes(element.active) ? "N" : "Y"
      }
    })
    
  }


  wisdomsubmit() {

    if (this.wisdomform.invalid)
      return this.wisdomform.markAllAsTouched()

    const { quotetitle, quote, quotedate, quotetype } = this.wisdomform.value

    console.log({ quotetitle, quote, quotedate, quotetype });


    const body = {
      "quoteTitle": quotetitle,
      "quote": quote,
      "quoteDate": quotedate,
      "quoteType": quotetype
    }

    this.service.postpearlofwisdom(body).subscribe({
      next: (response) => {
        this.openSnackBar(response)
        this.wisdomform.reset()
        this.getListofwisdom()
      },
      error: (error) => {
        console.error(error.message);
      }
    })

  }
}
