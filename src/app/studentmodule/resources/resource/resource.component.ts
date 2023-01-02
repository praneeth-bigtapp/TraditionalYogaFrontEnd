import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResourcesService } from '../resources.service';

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
  }

  practiceLibraryDetails(data: any) {
    this.currentPracticeLibrary = data.categoryName || data.subCategoryName
  }

  openScriptures() {

  }
  openGlimpses() {

  }

  openAudioSliders() {

  }

  audioChangeEvent() {

  }
  changepracticeLibrary() {

  }

  audioCheckboxChange(event: any, value: any) {
    console.log(event.checked);

    this.localAudioList = this.localAudioList.filter((ele: any) => ele === value)

    if (event.checked) {
      this.localAudioList.push(value)
      return
    }


  }
  playLibrary() {

  }
}
