import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { filter, map, Observable, startWith } from 'rxjs';
import { MappingRegionsToChiefMentorService } from '../services/mapping-regions-to-chief-mentor.service';

@Component({
  selector: 'app-regioncreation',
  templateUrl: './regioncreation.component.html',
  styleUrls: ['./regioncreation.component.css']
})
export class RegioncreationComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  selection = new SelectionModel<any>(true, []);
  selectedmember!: any

  regionfilterform!: FormGroup

  displaycontent: boolean = false

  iseditable: boolean = false




  filterData: any;
  gridData = [];
  dataSource: any;
  displayedColumns: string[] = ['regionId', "regionName", "countryName", "states", "Action"];

  data!: any
  countryList: any;
  countryfilter!: Observable<any>;
  statefilter!: Observable<any>;
  regionfilter!: Observable<any>;
  statelist: any;
  partList!: any
  constructor(
    private service: MappingRegionsToChiefMentorService,
    private _snackbar: MatSnackBar,
    private formbuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {

    this.regionfilterform = this.formbuilder.group({
      regionId: [null],
      region: [null, Validators.compose([Validators.required])],
      country: [null, Validators.compose([Validators.required])],
      part: [null, Validators.compose([Validators.required])],
      state: [null, Validators.compose([Validators.required])],
    })

    this.getregiondata()


    this.filterData = {
      filterColumnNames: this.displayedColumns.map(ele => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    }
  }

  ngOnInit(): void {

  }


  getregiondata() {
    this.service.getregion().subscribe({
      next: (value) => {
        this.data = value
        this.data = this.data.reverse()
        this.countryList = [...new Set(this.data.map((ele: any) => ele.countryName))]
        this.statelist = [...new Set(this.data.map((ele: any) => ele.states))]

        const key = "partId"
        const tempvalues = [...new Set(this.data.map((ele: any) => ele.partId))]

        this.partList = [...new Map(tempvalues.map((item: any) =>
          [item[key], item])).values()];

        this.countryfilter = this.regionfilterform.valueChanges.pipe(
          startWith(''),
          map(value => this.countryList.filter((ele: any) => ele.toLowerCase().includes(value.country?.toLowerCase()))),
        )

        this.statefilter = this.regionfilterform.valueChanges.pipe(
          startWith(''),
          map(value => this.statelist.filter((ele: any) => ele.toLowerCase().includes(value.state?.toLowerCase()))),
        )

        const regionlist = [...new Set(this.data.map((ele: any) => ele.regionName))]



        this.regionfilter = this.regionfilterform.valueChanges.pipe(
          startWith(''),
          map(value => regionlist.filter((ele: any) => ele.toLowerCase().includes(value.region?.toLowerCase()))),
        )

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
      error: (error: any) => {
        console.error(error.message);

      },
    })
  }

  countrychange(event: any) {


    this.statelist = [...new Set(this.data.filter((ele: any) => ele.countryName.toLowerCase().includes(event.target.value.toLowerCase())).map((ele: any) => ele.states))]

    this.statefilter = this.regionfilterform.valueChanges.pipe(
      startWith(''),
      map(value => this.statelist.filter((ele: any) => ele.toLowerCase().includes(value.state?.toLowerCase()))),
    )
  }

  partchange(value: any) {



    let temp = [...new Set(this.data.filter((ele: any) => ele.partId.partId === value))]

    if (this.regionfilterform.value.country)
      temp = [...new Set(temp.filter((ele: any) => ele.countryName === this.regionfilterform.value.country))]


    this.statelist = temp.map((ele: any) => ele.states)

    this.statefilter = this.regionfilterform.valueChanges.pipe(
      startWith(''),
      map(value => this.statelist.filter((ele: any) => ele.toLowerCase().includes(value.state?.toLowerCase()))),
    )
  }

  opensnackBar(data: any) {
    this._snackbar.open(data.message, "Close")
  }

  updatePagination(col: any) {
    this.ngAfterViewInit()
  }
  compareselect(obj1: any, obj2: any) {
    return obj1 && obj2 && obj1 === obj2
  }

  ngAfterViewInit() {
    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort;

  }
  addregion() {
    this.displaycontent = !this.displaycontent
  }
  viewdetails(element: any) {

  }
  deletedetails(id: any) {

    const body = {
      "regionId": id,
    }

    this.service.deleteregion(body).subscribe({
      next: (response) => {
        this.opensnackBar(response)
        this.regionfilterform.reset()
        this.getregiondata()
      },
      error: (error) => {
        console.error(error.message);
      }
    })

  }
  editdetails(element: any) {

    this.regionfilterform.setValue({
      regionId: element.regionId,
      region: element.regionName,
      country: element.countryName,
      part: element.partId.partId,
      state: element.states

    });
    this.iseditable = true
    this.displaycontent = true
  }

  reseteditable() {
    this.regionfilterform.reset()
    this.iseditable = false
  }


  filtersubmit() {

    if (this.regionfilterform.invalid)
      return this.regionfilterform.markAllAsTouched()


    this.updatePagination("")

    const { regionId, region, country, part, state } = this.regionfilterform.value
    const body = {
      "regionName": region,
      "countryName": country,
      "partId": {
        "partId": part
      },
      "states": state
    }

    if (this.iseditable) {
      //editable

      const body = {
        "regionId": regionId,
        "regionName": region,
        "countryName": country,
        "partId": {
          "partId": part
        },
        "states": state
      }

      this.service.updateregion(body).subscribe({
        next: (response) => {
          this.opensnackBar(response)
          this.regionfilterform.reset()
          this.getregiondata()
        },
        error: (error) => {
          console.error(error.message);

        }
      })
    }

    this.service.postregion(body).subscribe({
      next: (response) => {
        this.opensnackBar(response)
        this.regionfilterform.reset()
        this.getregiondata()
      },
      error: (error) => {
        console.error(error.message);

      }
    })
  }


}
