import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreatepraticelibraryService } from '../service/createpraticelibrary.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogPopupComponent } from 'src/app/shared/dialog-popup/dialog-popup.component';
import { InputvalidationService } from 'src/app/shared/services/inputvalidation.service';

@Component({
  selector: 'app-create-pratice-library',
  templateUrl: './create-pratice-library.component.html',
  styleUrls: ['./create-pratice-library.component.css']
})
export class CreatePraticeLibraryComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;


  pageno: number = 1
  category!: string
  addmediaform!: any
  timerror!: boolean
  categoryerror: boolean = false
  displaycontent: boolean = false
  issubmit: boolean = true
  filterData: any;
  gridData = [];
  dataSource: any;
  displayedColumns: string[] = ['praticeLibaryId', 'videoLink', "duration", "title", "message", "metaKeyword", "Action"];
  data: any;
  iseditable: boolean = false
  issubcategory: boolean = false
  subcategorylist: any

  categoryList!: any
  constructor(
    private formbuilder: FormBuilder,
    private service: CreatepraticelibraryService,
    private _snackBar: MatSnackBar,

    private dialog: MatDialog,
  ) {

    this.filterData = {
      filterColumnNames: this.displayedColumns.map(ele => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    };

    this.service.getcategory().subscribe({
      next: (response) => {
        this.categoryList = response
      },
      error: (error) => {
        console.error(error.message);

      }
    })
    // this.service.getsubcategory().subscribe({
    //   next: (response) => {
    //     this.subcategorylist = response
    //   },
    //   error: (error) => {
    //     console.error(error.message);

    //   }
    // })
    this.getdata()
  }

  getdata() {
    this.service.getpraticelibrary().subscribe({
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
      },
      error: (error) => {
        console.error(error.message);

      }
    })
  }

  onpaginatechange(event: any) {

    if (event.pageIndex === 0) {
      this.pageno = 1
      return
    }
    this.pageno = (event.pageIndex * event.pageSize) + 1
    return
  }
  ngOnInit(): void {
    this.addmediaform = this.formbuilder.group({
      praticelibraryId: [null],
      category: [null, Validators.compose([Validators.required])],
      subcategory: [null],

      videolink: [null, Validators.compose([Validators.required, Validators.pattern(InputvalidationService.inputvalidation.videolink)])],
      videotitle: [null, Validators.compose([Validators.required])],
      videodescription: [null, Validators.compose([Validators.required])],
      videoduration: [null, Validators.compose([Validators.required, Validators.pattern(InputvalidationService.inputvalidation.durationvalidation)])],
      vidoemetakeywords: [null, Validators.compose([Validators.required, Validators.pattern(InputvalidationService.inputvalidation.keywordsvalidation)])]
    })
  }

  // ngAfterViewInit() {
  //   this.filterData.dataSource.paginator = this.paginator;

  // }
  updatePagination(col: any) {
    this.filterData.dataSource.paginator = this.paginator;
  }

  openSnackBar(data: any) {
    this._snackBar.open(data.message, 'Close', {
      duration: 2 * 1000,
    });
  }

  coursechange() {
    this.displaycontent = false

    if (this.category)
      this.categoryerror = false
  }

  categorychange(event: any) {

    if (event.value === 12) {
      this.issubcategory = true
      this.addmediaform.get('subcategory').addValidators(Validators.required);
      this.addmediaform.controls.subcategory.status = "INVALID"
      return
    }
    this.addmediaform.get('subcategory').removeValidators(Validators.required);
    this.addmediaform.controls.subcategory.status = "VALID"
    console.log(this.addmediaform.get("subcategory").hasValidator(Validators.required));


    this.issubcategory = false

  }

  addlibrary() {
    this.displaycontent = !this.displaycontent
  }

  compareselect(obj1: any, obj2: any) {
    return obj1 && obj2 && obj1.categoriesId === obj2
  }

  viewdetails(element: any) {
    this.addmediaform.setValue({
      praticelibraryId: element.praticeLibaryId,
      category: element.categoryId,
      subcategory: null,

      videolink: element.videoLink,
      videotitle: element.title,
      videodescription: element.message,
      videoduration: element.duration,
      vidoemetakeywords: element.metaKeyword,
    });
    if (element.subCategoryId)
      this.issubcategory = true

    this.issubmit = false
    this.displaycontent = true
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  deletedetails(id: any, category: any) {

    const body = {
      "praticeLibaryId": id,
    }

    const dialogref = this.dialog.open(DialogPopupComponent, {
      data: {
        title: "Delete Confirmation",
        message: "Are You Sure You Want To Delete this library ?"
      },
      width: "30%"
    })

    dialogref.afterClosed().subscribe(data => {
      if (data) {
        this.service.deletepraticelibrary(body, category)?.subscribe({
          next: (response) => {
            this.openSnackBar(response)
            this.addmediaform.reset()
            this.getdata()
          },
          error: (error) => {
            console.error(error.message);
          }
        })
        return
      }

    })



  }
  editdetails(element: any) {

    this.addmediaform.setValue({
      praticelibraryId: element.praticeLibaryId,
      category: element.categoryId,
      videolink: element.videoLink,
      subcategory: null,
      videotitle: element.title,
      videodescription: element.message,
      videoduration: element.duration,
      vidoemetakeywords: element.metaKeyword,
    });

    if (element.subCategoryId)
      this.issubcategory = true

    this.iseditable = true
    this.issubmit = true
    this.displaycontent = true
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

  }

  reseteditable() {
    this.addmediaform.reset()
    this.iseditable = false
    this.displaycontent = !this.displaycontent
  }

  addmedia() {
    if (this.addmediaform.valid) {

      const { praticelibraryId, category, subcategory, videolink, videotitle, videodescription, videoduration, vidoemetakeywords } = this.addmediaform.value


      const body = {
        "videoLink": videolink,
        "duration": videoduration,
        "title": videotitle,
        "message": videodescription,
        "metaKeyword": vidoemetakeywords
      }


      if (this.iseditable) {
        const body = {
          "praticeLibaryId": praticelibraryId,
          "categoryId": category,
          "videoLink": videolink,
          "duration": videoduration,
          "title": videotitle,
          "message": videodescription,
          "metaKeyword": vidoemetakeywords
        }

        this.service.updatepraticelibrary(body, category)?.subscribe({
          next: (response) => {
            this.addmediaform.reset()
            this.openSnackBar({ message: "Library Updated" })
            this.getdata()

          },
          error: (error) => {
            console.error(error.message);

          }
        })
        return
      }



      this.service.postpraticelibrary(body, category)?.subscribe({
        next: (response) => {
          this.addmediaform.reset()
          this.openSnackBar({ message: "Library Created" })
          this.getdata()
        },
        error: (error) => {
          console.error(error.message);

        }
      })

    }
    else {
      this.addmediaform.markAllAsTouched()
      console.log(this.addmediaform.controls.subcategory.status);


    }

  }
}
