import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TestimonialsService } from '../testimonials.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

 
  dataSource: any;

  data!: any;
filterData:any
gridData :any;

selection = new SelectionModel<any>(true, []);

displayedColumns: string[] = ["Checkbox","content","givenByName",'createDate','action'];
  
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

  constructor(private formbuilder:FormBuilder, private test: TestimonialsService) { }

  ngOnInit(): void {

     this.filterData = {
      filterColumnNames: this.displayedColumns.map(ele => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    }
   this.getTestimonial();

   
   
  }
  ngAfterViewInit() {
    this.filterData.dataSource.paginator = this.paginator;

  }
  getTestimonial() {
    this.test.getTestimonial().subscribe({
      next: (response) => {
        this.data = response
        for (let data of this.data) {
          data.check = false;
        }
        console.log(this.data);

        this.dataSource = new MatTableDataSource<any>(this.data)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    
      }
    });
  }
  viewDetails(element:any){
  
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

}
