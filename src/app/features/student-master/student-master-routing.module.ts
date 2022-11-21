import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentProfileComponent } from './student-profile/student-profile.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'studentProfile' },
  { path: 'studentProfile', component: StudentProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentMasterRoutingModule { }
