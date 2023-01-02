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
    this.openAudioSliders()
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
      height: "50%",
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

    this.localAudioList = this.localAudioList.filter((ele: any) => ele === value)

    if (event.checked) {
      this.localAudioList.push(value)
      return
    }


  }
  playLibrary() {

  }
  openAudioCategory(data: any) {

  }
}
