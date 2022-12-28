import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { DialogPopupComponent } from 'src/app/shared/dialog-popup/dialog-popup.component';
import { ServicesService } from '../services.service';
import { ShortvideomediaComponent } from '../shortvideomedia/shortvideomedia.component';
import { map, Observable, startWith } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-glimpemedia',
  templateUrl: './glimpemedia.component.html',
  styleUrls: ['./glimpemedia.component.css']
})
export class GlimpemediaComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  displaycontent: boolean = true
  pageno: number = 1
  isothers: boolean = false
  displayedColumns: string[] = ['classMediaId', 'course', 'date', 'glimpse', "language", "Action"];
  shortvideoform!: any
  filterData: any;
  categoryerror: boolean = false
  gridData = [];
  selectedmember!: any
  filerror!: boolean
  iseditable: boolean = false
  dataSource!: any
  categorylist: any;
  issubmit: boolean = true
  glimpseform: any;
  glimpsefile: any;
  languagelist = { aa: "Afar", ab: "Abkhazian", af: "Afrikaans", am: "Amharic", ar: "Arabic", "ar-ae": "Arabic (U.A.E.)", "ar-bh": "Arabic (Bahrain)", "ar-dz": "Arabic (Algeria)", "ar-eg": "Arabic (Egypt)", "ar-iq": "Arabic (Iraq)", "ar-jo": "Arabic (Jordan)", "ar-kw": "Arabic (Kuwait)", "ar-lb": "Arabic (Lebanon)", "ar-ly": "Arabic (libya)", "ar-ma": "Arabic (Morocco)", "ar-om": "Arabic (Oman)", "ar-qa": "Arabic (Qatar)", "ar-sa": "Arabic (Saudi Arabia)", "ar-sy": "Arabic (Syria)", "ar-tn": "Arabic (Tunisia)", "ar-ye": "Arabic (Yemen)", as: "Assamese", ay: "Aymara", az: "Azeri", ba: "Bashkir", be: "Belarusian", bg: "Bulgarian", bh: "Bihari", bi: "Bislama", bn: "Bengali", bo: "Tibetan", br: "Breton", ca: "Catalan", co: "Corsican", cs: "Czech", cy: "Welsh", da: "Danish", de: "German", "de-at": "German (Austria)", "de-ch": "German (Switzerland)", "de-li": "German (Liechtenstein)", "de-lu": "German (Luxembourg)", div: "Divehi", dz: "Bhutani", el: "Greek", en: "English", "en-au": "English (Australia)", "en-bz": "English (Belize)", "en-ca": "English (Canada)", "en-gb": "English (United Kingdom)", "en-ie": "English (Ireland)", "en-jm": "English (Jamaica)", "en-nz": "English (New Zealand)", "en-ph": "English (Philippines)", "en-tt": "English (Trinidad)", "en-us": "English (United States)", "en-za": "English (South Africa)", "en-zw": "English (Zimbabwe)", eo: "Esperanto", es: "Spanish", "es-ar": "Spanish (Argentina)", "es-bo": "Spanish (Bolivia)", "es-cl": "Spanish (Chile)", "es-co": "Spanish (Colombia)", "es-cr": "Spanish (Costa Rica)", "es-do": "Spanish (Dominican Republic)", "es-ec": "Spanish (Ecuador)", "es-es": "Spanish (Espa\xf1a)", "es-gt": "Spanish (Guatemala)", "es-hn": "Spanish (Honduras)", "es-mx": "Spanish (Mexico)", "es-ni": "Spanish (Nicaragua)", "es-pa": "Spanish (Panama)", "es-pe": "Spanish (Peru)", "es-pr": "Spanish (Puerto Rico)", "es-py": "Spanish (Paraguay)", "es-sv": "Spanish (El Salvador)", "es-us": "Spanish (United States)", "es-uy": "Spanish (Uruguay)", "es-ve": "Spanish (Venezuela)", et: "Estonian", eu: "Basque", fa: "Farsi", fi: "Finnish", fj: "Fiji", fo: "Faeroese", fr: "French", "fr-be": "French (Belgium)", "fr-ca": "French (Canada)", "fr-ch": "French (Switzerland)", "fr-lu": "French (Luxembourg)", "fr-mc": "French (Monaco)", fy: "Frisian", ga: "Irish", gd: "Gaelic", gl: "Galician", gn: "Guarani", gu: "Gujarati", ha: "Hausa", he: "Hebrew", hi: "Hindi", hr: "Croatian", hu: "Hungarian", hy: "Armenian", ia: "Interlingua", id: "Indonesian", ie: "Interlingue", ik: "Inupiak", in: "Indonesian", is: "Icelandic", it: "Italian", "it-ch": "Italian (Switzerland)", iw: "Hebrew", ja: "Japanese", ji: "Yiddish", jw: "Javanese", ka: "Georgian", kk: "Kazakh", kl: "Greenlandic", km: "Cambodian", kn: "Kannada", ko: "Korean", kok: "Konkani", ks: "Kashmiri", ku: "Kurdish", ky: "Kirghiz", kz: "Kyrgyz", la: "Latin", ln: "Lingala", lo: "Laothian", ls: "Slovenian", lt: "Lithuanian", lv: "Latvian", mg: "Malagasy", mi: "Maori", mk: "FYRO Macedonian", ml: "Malayalam", mn: "Mongolian", mo: "Moldavian", mr: "Marathi", ms: "Malay", mt: "Maltese", my: "Burmese", na: "Nauru", "nb-no": "Norwegian (Bokmal)", ne: "Nepali (India)", nl: "Dutch", "nl-be": "Dutch (Belgium)", "nn-no": "Norwegian", no: "Norwegian (Bokmal)", oc: "Occitan", om: "(Afan)/Oromoor/Oriya", or: "Oriya", pa: "Punjabi", pl: "Polish", ps: "Pashto/Pushto", pt: "Portuguese", "pt-br": "Portuguese (Brazil)", qu: "Quechua", rm: "Rhaeto-Romanic", rn: "Kirundi", ro: "Romanian", "ro-md": "Romanian (Moldova)", ru: "Russian", "ru-md": "Russian (Moldova)", rw: "Kinyarwanda", sa: "Sanskrit", sb: "Sorbian", sd: "Sindhi", sg: "Sangro", sh: "Serbo-Croatian", si: "Singhalese", sk: "Slovak", sl: "Slovenian", sm: "Samoan", sn: "Shona", so: "Somali", sq: "Albanian", sr: "Serbian", ss: "Siswati", st: "Sesotho", su: "Sundanese", sv: "Swedish", "sv-fi": "Swedish (Finland)", sw: "Swahili", sx: "Sutu", syr: "Syriac", ta: "Tamil", te: "Telugu", tg: "Tajik", th: "Thai", ti: "Tigrinya", tk: "Turkmen", tl: "Tagalog", tn: "Tswana", to: "Tonga", tr: "Turkish", ts: "Tsonga", tt: "Tatar", tw: "Twi", uk: "Ukrainian", ur: "Urdu", us: "English", uz: "Uzbek", vi: "Vietnamese", vo: "Volapuk", wo: "Wolof", xh: "Xhosa", yi: "Yiddish", yo: "Yoruba", zh: "Chinese", "zh-cn": "Chinese (China)", "zh-hk": "Chinese (Hong Kong SAR)", "zh-mo": "Chinese (Macau SAR)", "zh-sg": "Chinese (Singapore)", "zh-tw": "Chinese (Taiwan)", zu: "Zulu" }
  courses: any
  languagefilter !: Observable<any>

  tabledata = [
    {
      "classmediaId": 1,
      "date": new Date(),
      "glimpse": "www.google.com",
      "course": "RYO 355",
      "language": "English"
    },
    {
      "classmediaId": 2,
      "date": new Date(),
      "glimpse": "www.google.com",
      "course": "Short Meditation",
      "language": "Tamil"
    },
    {
      "classmediaId": 3,
      "date": new Date(),
      "glimpse": "www.google.com",
      "language": "Marathi",
      "course": "Meditation",

    },
    {
      "classmediaId": 4,
      "date": new Date(),
      "glimpse": "www.google.com",
      "language": "Telugu",
      "course": "RYO 355",

    },
    {
      "classmediaId": 5,
      "date": new Date(),
      "glimpse": "www.google.com",
      "language": "English",
      "course": "RYO 355",

    },
    {
      "classmediaId": 6,
      "date": new Date(),
      "glimpse": "www.google.com",
      "language": "Malayalam",
      "course": "RYO 355",

    }
  ]

  constructor(
    private formbuilder: FormBuilder,
    private services: ServicesService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ShortvideomediaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.filterData = {
      filterColumnNames: this.displayedColumns.map(ele => ({ "Key": ele, "Value": "" })),
      gridData: this.gridData,
      dataSource: this.dataSource,
      paginator: this.paginator,
      sort: this.sort
    }
    this.glimpseform = this.formbuilder.group({
      courseMediaId: [null],
      course: [null, Validators.compose([Validators.required])],

      date: [null, Validators.compose([Validators.required])],
      file: [null, Validators.compose([Validators.required])],
      language: [null, Validators.compose([Validators.required])],


    })
    this.getallcourse()

    services.getALLGlimps().subscribe({
      next: (response) => {

        this.categorylist = response

      },
      error: (error) => {
        console.error(error.message);

      }
    })
    this.getalldata()
  }

  ngOnInit(): void {

    this.languagefilter = this.glimpseform.valueChanges.pipe(
      startWith(''),
      map((value: any) => Object.values(this.languagelist).filter((ele: any) => ele.toLowerCase().includes(value.language?.toLowerCase()))),
    )
  }

  getallcourse() {
    this.services.getcoursesdetails().subscribe({
      next: (response) => {

        this.courses = response

      },
      error: (error) => {
        console.error(error.message);
      }
    });

  }

  getalldata() {

    this.dataSource = new MatTableDataSource<any>(this.tabledata)
    this.filterData.gridData = this.tabledata;
    this.filterData.dataSource = this.dataSource;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.filterData.sort = this.sort;
    for (let col of this.filterData.filterColumnNames) {
      col.Value = '';
    }
  }
  updatePagination(col: any) {

    this.filterData.dataSource.paginator = this.paginator;
  }


  openSnackBar(data: any) {
    this._snackBar.open(data.message, 'Close', {
      duration: 2 * 1000,
    });
  }

  onpaginatechange(event: any) {
    if (event.pageIndex === 0) {
      this.pageno = 1
      return
    }
    this.pageno = (event.pageIndex * event.pageSize) + 1
    return
  }
  gobutton() {
    this.displaycontent = true
  }

  reseteditable() {
    this.glimpseform.reset()
    this.iseditable = false
    this.displaycontent = !this.displaycontent
    this.issubmit = true
  }


  viewDetails(element: any) {
    this.iseditable = false
    this.issubmit = false
    this.displaycontent = true

    this.glimpseform.setValue({
      courseMediaId:null,
      course: null,

      date: null,
      file: null,
      language: null,


    })
  }
  editdetails(element: any) {
    this.iseditable = true
    this.issubmit = false
    this.displaycontent = true
    this.glimpseform.setValue({
      courseMediaId:null,
      course: null,

      date: null,
      file: null,
      language: null,


    })
  }
  deletedetails(id: any) {

    console.log(id);

    const body = {
      "classMediaId": id
    }

    const dialogref = this.dialog.open(DialogPopupComponent, {
      data: {
        title: "Delete Confirmation",
        message: "Are You Sure You Want To Delete this media ?"
      },
      width: "30%"
    })

    dialogref.afterClosed().subscribe(data => {
      if (data) {
        this.services.postdeleteGlimps(body).subscribe({
          next: (response) => {
            this.openSnackBar(response)
            this.getalldata()
          },
          error: (error) => {
            console.error(error.message);
          }
        })
        return
      }

    })

  }
  filechange(event: any) {
    this.filerror = this.glimpseform.value.file === null ? true : false
    this.glimpsefile = event.target.files[0].name
  }
  glimpseformsubmit() {
    this.filerror = this.glimpseform.value.file === null ? true : false

    if (this.glimpseform.invalid)
      return this.glimpseform.markAllAsTouched()


    this.glimpseform.value.file = this.glimpsefile

    const { course, language, courseMediaId, date, file } = this.glimpseform.value

    if (this.iseditable) {
      const body = {
        "courseMediaId": courseMediaId,
        "date": date,
        "fileName": file

      }
      this.services.postupdateGlimps(body).subscribe({
        next: (response) => {

          this.glimpseform.reset()

          this.openSnackBar(response)
        },
        error: (error) => {
          console.error(error.message);

        }
      })

    }


    const body = {
      "date": date,
      "fileName": file
    }

    this.services.postaddGlimps(body).subscribe({
      next: (response) => {

        this.glimpseform.reset()

        this.openSnackBar(response)


      },
      error: (error) => {
        console.error(error.message);

      }
    })


  }



}
