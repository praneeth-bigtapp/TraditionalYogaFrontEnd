import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.css']
})
export class UserFilterComponent implements OnInit { 
    data=[{"sno":"1","name":"Anji","emailId":"anji@gmail", "country":"india","Gender":"male","usersince":"2020","status":""},
    {"sno":"2","name":"Praneeth","emailId":"praneeth@gmail", "country":"Austrilia","Gender":"male","usersince":"2020","status":""},
    {"sno":"3","name":"Sumukesh","emailId":"sumukesh@gmail", "country":"india","Gender":"male","usersince":"2020","status":""},
    {"sno":"4","name":"Shekar","emailId":"shekar@gmail", "country":"india","Gender":"male","usersince":"2020","status":""},
    {"sno":"5","name":"Nikhil","emailId":"nikhil@gmail", "country":"india","Gender":"male","usersince":"2020","status":""},
    ]
    displayedColumns: string[] = ['sno', 'image', 'name',"emailId","country","Gender","usersince","status", ];
    dataSource :any;
    iseditable: boolean = false
    disableSelect = new FormControl(false);
    selection = new SelectionModel<any>(true, []);
    UserFilter!: FormGroup 
    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    @ViewChild(MatSort)
    sort!: MatSort;
    filterData: any;
    gridData: any;
    displaycontent = false
    issubmit: boolean = true
  
   
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    
  
    constructor( private formbuilder:FormBuilder) {
      this.UserFilter = this.formbuilder.group({
        courseId: [null],
        name: [null, Validators.compose([Validators.required])],
        emailId: [null, Validators.compose([Validators.required])],
        country: [null, Validators.compose([Validators.required])],
        // duration: [null, Validators.compose([Validators.required])],
        selectMob: [null, Validators.compose([Validators.required])],
        selectRegion: [null, Validators.compose([Validators.required])],
        agefrom: [null, Validators.compose([Validators.required])],
        ageto: [null, Validators.compose([Validators.required])],
        status: [null, Validators.compose([Validators.required])],
        language: [null, Validators.compose([Validators.required])],
        Gender: [null, Validators.compose([Validators.required])],
        cheifmentoruserid: [null, Validators.compose([Validators.required])],
        studentuserid: [null, Validators.compose([Validators.required])],
        mentoruserid: [null, Validators.compose([Validators.required])],
      });
     
    
     
     }
  
    ngOnInit(): void {
      this.dataSource=new MatTableDataSource<any>(this.data)
      // this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.filterData = {
        filterColumnNames: this.displayedColumns.map(ele => ({ "Key": ele, "Value": "" })),
        gridData: this.gridData,
        dataSource: this.dataSource,
        paginator: this.paginator,
        sort: this.sort
      }
      this.dataSource = new MatTableDataSource<any>(this.data)
      this.filterData.gridData = this.data;
      this.filterData.dataSource = this.dataSource;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.filterData.sort = this.sort;
      for (let col of this.filterData.filterColumnNames) {
        col.Value = '';
      }
     
    
  
      
      
    }
    ngAfterViewInit() {
      this.filterData.dataSource.paginator = this.paginator;
  
    }
    mapCourse(){
      this.displaycontent = !this.displaycontent
    }
    updatePagination() {
  
      this.dataSource.paginator = this.paginator;
    }
    
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  
    masterToggle() {
      this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach((row: any) => this.selection.select(row));
    }
    reseteditable() {
      this.UserFilter.reset()
      this.iseditable = false
      this.displaycontent = !this.displaycontent
    }
    
    filterResults(obj: any, isChecked: boolean){
      console.log(obj);
      console.log(isChecked); // {}, true || false
    } 

    viewdetails(element: any) {
      
      this.UserFilter.patchValue({
        name:element.name,
        country:element.country,
        Gender:element.Gender,
        emailId:element.emailId   
      });
     
      this.displaycontent = true
    }
  

}
