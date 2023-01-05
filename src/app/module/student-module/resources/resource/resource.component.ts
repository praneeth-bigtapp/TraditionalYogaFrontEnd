import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResourcesService } from '../resources.service';
import { SortingresourcesComponent } from '../sortingresources/sortingresources.component';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {

  audioCategoryList: any
  practiceLibraryList: any
  dharansCategoryList: any
  dummydate = new Date()
  audioValue: any
  practiceLibraryValue: any
  localAudioList: any = []
  currentPracticeLibrary: string = "Salutations"
  audioDOM: any
  audioArrayIndex: number = 0
  audioSrc = ""
  constructor(
    private service: ResourcesService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.service.getAudioCategory().subscribe({
      next: (response) => {
        console.log(response);
        this.audioCategoryList = response
      }
    })
    this.service.getPracticeLibrary().subscribe({
      next: (response) => {
        console.log(response);
        this.practiceLibraryList = response
      }
    })
    this.service.getDharanasCategory().subscribe({
      next: (response) => {
        console.log(response);
        this.dharansCategoryList = response
      }
    })
    // this.openAudioSliders()
    this.audioDOM = document.getElementsByTagName('audio')[0]
  }

  practiceLibraryDetails(data: any) {
    this.currentPracticeLibrary = data.categoryName || data.subCategoryName
  }

  openScriptures() {

  }
  openGlimpses() {

  }

  openAudioSliders() {
    const dialogref = this.dialog.open(SortingresourcesComponent, {
      data: {
        title: "Sorting"
      },
      width: "50%",
      height: "70%",
      position: {
        top: "2%"
      }
    })

    dialogref.afterClosed().subscribe(data => {
      if (data) {
      }

    })
  }

  audioChangeEvent() {

  }
  changepracticeLibrary() {

  }

  audioCheckboxChange(event: any, value: any) {
    console.log(event.checked);


    if (event.checked) {
      this.localAudioList.push(value)
    }
    else
      this.localAudioList = this.localAudioList.filter((ele: any) => ele !== value)

    // this.audioSrc = this.localAudioList[this.audioArrayIndex]




  }
  playLibrary() {

  }
  openAudioCategory(data: any) {

  }
  audioended() {
    this.audioArrayIndex = this.audioArrayIndex + 1
    this.audioSrc = this.localAudioList[this.audioArrayIndex]

  }

  audioplaying() {

  }
  audiopause() {

  }
  audioloaded() {
    console.log("loaded");

  }
}
