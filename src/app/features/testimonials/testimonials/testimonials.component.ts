import { SelectionModel } from '@angular/cdk/collections';
import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogPopupComponent } from 'src/app/shared/dialog-popup/dialog-popup.component';
import { InputvalidationService } from 'src/app/shared/services/inputvalidation.service';
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
  pageno: number = 1


  selection = new SelectionModel<any>(true, []);

  displayedColumns: string[] = ["Checkbox", "content", "givenByName", 'createdDate', 'action'];



  constructor(private formbuilder: FormBuilder, private test: TestimonialsService, private dialog: MatDialog, private _snackBar: MatSnackBar,
  ) { }

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
      id: [null],
      Content: [null, Validators.compose([Validators.required])],
      name: [null, Validators.compose([Validators.required])],
      link: [null, Validators.compose([Validators.required, Validators.pattern(InputvalidationService.inputvalidation.videolink)])],
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
        this.data = this.data.reverse()

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
    this.testimonial.reset()
    this.iseditable = false
    this.displaycontent = !this.displaycontent
  }
  viewDetails(element: any) {

  }

  onpaginatechange(event: any) {
    if (event.pageIndex === 0) {
      this.pageno = 1
      return
    }
    this.pageno = (event.pageIndex * event.pageSize) + 1

    return
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
    this.testimonial.setValue({
      id: element.testimonalId,
      Content: element.content,
      name: element.givenByName,
      link: element.videoLink,
      description: element.description,
    });
    this.issubmit = false
    this.displaycontent = true
  }
  editdetails(element: any) {
    this.testimonial.setValue({
      id: element.testimonalId,
      Content: element.content,
      name: element.givenByName,
      link: element.videoLink,
      description: element.description,


    });
    this.iseditable = true
    this.displaycontent = true
    this.issubmit = true
  }
  deletedetails(id: any) {
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
        this.test.deleteTestimonial(body).subscribe({
          next: (response) => {
            this.openSnackBar(response)
            this.getTestimonial()
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
      const body = {
        "testimonalId": this.testimonial.value.id,
        "content": this.testimonial.value.Content,
        "givenByName": this.testimonial.value.name,

        "videoLink": this.testimonial.value.link,
        "description": this.testimonial.value.description,
      }
      this.test.updatetest(body).subscribe({
        next: (response) => {
          this.openSnackBar(response)
          this.testimonial.reset()
          this.getTestimonial()
        },
        error: (error) => {
          console.error(error.message);

        }
      })
      return
    }
    this.test.posttestimonial(body).subscribe({
      next: (response) => {
        this.openSnackBar(response)
        this.testimonial.reset()

        this.getTestimonial()

      },
      error: (error) => {
        console.error(error.message);

      }
    })

  }

  IsActiveorNot(id: any) {
    const yes = ["Yes", "Y", "yes", "y"]
    const no = ["No", "N", "no", "n"]

    const filterdata = this.data.filter((ele: any) => ele.testimonalId === id)[0].isActive

    return yes.includes(filterdata)
  }

  openSnackBar(data: any) {
    this._snackBar.open(data.message, 'Close', {
      duration: 2 * 1000,
    });
  }

  onActivateMenu(element: any, event: MatSlideToggleChange) {
    console.log(element);
    const yes = ["Yes", "Y", "yes", "y"]
    const no = ["No", "N", "no", "n"]

    const body = {
      "testimonalId": element.testimonalId
    }
    const isActive = element.isActive
    if (!yes.includes(isActive)) {
      this.test.postavtive(body).subscribe({
        next: (response) => {
          this.openSnackBar(response)
          this.getTestimonial()
        },
        error: (error) => {
          console.error(error.message);

        }
      })
      return
    }
    else {

      this.test.postdeactivate(body).subscribe({
        next: (response) => {
          this.openSnackBar(response)
          this.getTestimonial()
        },
        error: (error) => {
          console.error(error.message);

        }
      })

    }
  }


}



