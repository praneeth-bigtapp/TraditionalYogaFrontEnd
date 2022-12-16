import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
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
  filterData: any
  gridData: any;


  selection = new SelectionModel<any>(true, []);

  displayedColumns: string[] = ["Checkbox", "content", "givenByName", 'createDate', 'action'];



  constructor(private formbuilder: FormBuilder, private test: TestimonialsService) { }

  ngOnInit(): void {

    this.filterData = {
      filterColumnNames: this.displayedColumns.map(ele => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    }
    this.getTestimonial();

    this.testimonial = this.formbuilder.group({

      content: [null, Validators.compose([Validators.required])],
      name: [null, Validators.compose([Validators.required])],
      link: [null, Validators.compose([Validators.required])],

      description: [null, Validators.compose([Validators.required])],

    });

  }
  // ngAfterViewInit() {
  //   this.filterData.dataSource.paginator = this.paginator;

  // }
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  reseteditable() {
    // this.addCourseForm.reset()
    this.iseditable = false
    this.displaycontent = !this.displaycontent
  }
  viewDetails(element: any) {

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

  addtestimonial() {
    this.displaycontent = !this.displaycontent

  }
  // onActivateRole(role: any, event: MatSlideToggleChange) {
  //   console.log(role);
  //   if (event.checked) {
  //     role.active = 'Y';
  //   } else {
  //     role.active = 'N';
  //   }
    // this.rolesService.activateRole(role).subscribe((response) => {
    //   this.getRoles();
    // });
  // }
  addTestdata() {

    if (this.testimonial.invalid)
      return this.testimonial.markAllAsTouched()

    const body = {
      "content": this.testimonial.value.content,
      "givenByName": this.testimonial.value.name,

      "video_link": this.testimonial.value.link,
      "description": this.testimonial.value.description,
    }
    console.log("working");

    this.test.posttestimonial(body).subscribe({
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
