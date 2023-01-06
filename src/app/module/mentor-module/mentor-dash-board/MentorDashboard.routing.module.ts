import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MentorDashBoardComponent } from './mentor-dash-board/mentor-dash-board.component';
import { MentordashboardstudentdetailsComponent } from './mentordashboardstudentdetails/mentordashboardstudentdetails.component';



const routes: Routes = [
  { path: 'mentordashboard', component: MentorDashBoardComponent },
  {path: 'mentordashboardstudent',component: MentordashboardstudentdetailsComponent}
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MentorDashboardRouting {
}