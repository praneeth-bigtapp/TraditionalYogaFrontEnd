import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-of-practice-librarys',
  templateUrl: './list-of-practice-librarys.component.html',
  styleUrls: ['./list-of-practice-librarys.component.css']
})
export class ListOfPracticeLibrarysComponent implements OnInit {

  data=[{'s_no':'1', 'videolink':'https://www.youtube.com/watch?time_continue=3&v=ICNy9yRkmLw', 'Duration_of_video':"30mins","title":"Test","Message":"Lorem spsm is simplay dummy test of the printing and typesetting industry's standard dummy test ever since the1500s.","Meta_Keywords":"Test,test23,test587,test8547"},
  {'s_no':'1', 'videolink':'https://www.youtube.com/watch?time_continue=3&v=ICNy9yRkmLw', 'Duration_of_video':"30mins","title":"Test","Message":"Lorem spsm is simplay dummy test of the printing and typesetting industry's standard dummy test ever since the1500s.","Meta_Keywords":"Test,test23,test587,test8547"},
  {'s_no':'2', 'videolink':'https://www.youtube.com/watch?time_continue=3&v=ICNy9yRkmLw', 'Duration_of_video':"30mins","title":"Test","Message":"Lorem spsm is simplay dummy test of the printing and typesetting industry's standard dummy test ever since the1500s.","Meta_Keywords":"Test,test23,test587,test8547"},
  {'s_no':'3', 'videolink':'https://www.youtube.com/watch?time_continue=3&v=ICNy9yRkmLw', 'Duration_of_video':"30mins","title":"Test","Message":"Lorem spsm is simplay dummy test of the printing and typesetting industry's standard dummy test ever since the1500s.","Meta_Keywords":"Test,test23,test587,test8547"},
  {'s_no':'4', 'videolink':'https://www.youtube.com/watch?time_continue=3&v=ICNy9yRkmLw', 'Duration_of_video':"30mins","title":"Test","Message":"Lorem spsm is simplay dummy test of the printing and typesetting industry's standard dummy test ever since the1500s.","Meta_Keywords":"Test,test23,test587,test8547"},
  {'s_no':'5', 'videolink':'https://www.youtube.com/watch?time_continue=3&v=ICNy9yRkmLw', 'Duration_of_video':"30mins","title":"Test","Message":"Lorem spsm is simplay dummy test of the printing and typesetting industry's standard dummy test ever since the1500s.","Meta_Keywords":"Test,test23,test587,test8547"},
  {'s_no':'6', 'videolink':'https://www.youtube.com/watch?time_continue=3&v=ICNy9yRkmLw', 'Duration_of_video':"30mins","title":"Test","Message":"Lorem spsm is simplay dummy test of the printing and typesetting industry's standard dummy test ever since the1500s.","Meta_Keywords":"Test,test23,test587,test8547"},
  {'s_no':'7', 'videolink':'https://www.youtube.com/watch?time_continue=3&v=ICNy9yRkmLw', 'Duration_of_video':"30mins","title":"Test","Message":"Lorem spsm is simplay dummy test of the printing and typesetting industry's standard dummy test ever since the1500s.","Meta_Keywords":"Test,test23,test587,test8547"}]
  displayedColumns: string[] = ['s_no', 'videolink', 'Duration_of_video',"title","Message","Meta_Keywords"];
  dataSource :any;
  constructor() { 
    this.dataSource=new MatTableDataSource<any>(this.data)

  }

  ngOnInit(): void {
  }

}
