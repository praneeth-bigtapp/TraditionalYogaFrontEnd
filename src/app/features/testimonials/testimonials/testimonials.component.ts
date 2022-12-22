import { SelectionModel } from '@angular/cdk/collections';
import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogPopupComponent } from 'src/app/shared/dialog-popup/dialog-popup.component';
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



  constructor(private formbuilder: FormBuilder, private test: TestimonialsService,private dialog: MatDialog) { }

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
      id:[null],

      Content: [null, Validators.compose([Validators.required])],
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
        this.data=this.data.reverse()
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
  viewdetails(element: any) {
    this.  testimonial.setValue({
      id:element.testimonalId,
      Content: element.content,
      name: element.givenByName,
      link: element.videoLink,
      description:element.description,
      // "content": "this is the testing content-2",
      // "description": "This is the testing Files ",
      // "video_link": "https://youtu.be/4CDe-8ngRmkKKKEEd",
      // "givenByName": "karthik"


      // fromdate: formatDate(element.fromDate, "yyyy-MM-dd", 'en'),
      // todate: formatDate(element.toDate, "yyyy-MM-dd", 'en'),
      
    });
    this.issubmit = false
    this.displaycontent = true
  }
  editdetails(element: any) {
    this.testimonial.setValue({
      id:element.testimonalId,
      Content: element.content,
      name: element.givenByName,
      link: element.videoLink,
      description:element.description,

      
    });
    this.iseditable = true
    this.displaycontent = true
    this.issubmit = true
  }
  deletedetails(id:any){ 
    console.log(id);
    const body = {
      "testimonalId": Number(id) 
    }
console.log(body);
    const dialogref = this.dialog.open(DialogPopupComponent, {
      data: {
        title: "Delete Confirmation",
        message: "Are You Sure You Want To Delete this Audio ?"
      },
      width: "30%"
    })

    dialogref.afterClosed().subscribe((id: any) => {
      if (id) {
        this.test. deleteTestimonial(body).subscribe({
          next: (response) => {
           console.log(response);
            this.testimonial.reset()
            this. getTestimonial()
          },
          error: (error) => {
            console.error(error.message);
          }
        })
        return
      }

    })

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
      "content": this.testimonial.value.Content,
      "givenByName": this.testimonial.value.name,

      "videoLink": this.testimonial.value.link,
      "description": this.testimonial.value.description,
    }
    if (this.iseditable) {
      //editable
      // const name = this.data.filter((ele: any) => ele.content.content === Content)[0].givenByName.description
const body={
      "testimonalId": this.testimonial.value.id,
      "content": this.testimonial.value.Content,
      "givenByName": this.testimonial.value.name,

      "videoLink": this.testimonial.value.link,
      "description": this.testimonial.value.description,
  }

      console.log(body);

      this.test.updatetest(body).subscribe({
        next: (response) => {
          console.log(response)
          this.testimonial.reset()
          this.getTestimonial()
        },
        error: (error) => {
          console.error(error.message);

        }
      }) 
      return
    }
    
    console.log(this.testimonial);

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

