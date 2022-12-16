import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup ,  FormControl, Validators} from '@angular/forms';
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
  displaycontent: boolean = false
  testimonial!: FormGroup;
  dataSource: any;
  issubmit: boolean = true
  iseditable: boolean = false

  data!: any;
filterData:any
gridData :any;


selection = new SelectionModel<any>(true, []);

displayedColumns: string[] = ["Checkbox","content","givenByName",'createDate','action'];
  
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
reseteditable() {
  // this.addCourseForm.reset()
  this.iseditable = false
  this.displaycontent = !this.displaycontent
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

        // this.dataSource = new MatTableDataSource<any>(this.data)
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
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
    });
  }
  viewDetails(element:any){
  
  }
  updatePagination() {

    this.filterData.dataSource.paginator = this.paginator;
    this.filterData.dataSource.sort = this.sort;
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

  addtestimonial(){
    this.displaycontent = !this.displaycontent

  }
  addTestdata(){
    const body = {
      // "coursesId": 1,
      
        "content": this.testimonial.value.content,
        "name": this.testimonial.value.givenByName,
   
      "link": this.testimonial.value.video_link,
      "description": this.testimonial.value.description,
      
    }
    this.test. posttestimonial(body).subscribe({
      next: (response) => {
        console.log(response)
        this.testimonial.reset()
       
        this.getTestimonial()
       
      },
      error: (error) => {
        console.error(error.message);

      }
    })

  }

}
