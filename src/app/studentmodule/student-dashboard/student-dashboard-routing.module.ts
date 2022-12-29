import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';

const routes: Routes = [
  { path: "studentDashboard", component: StudentDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentDashboardRoutingModule { }
