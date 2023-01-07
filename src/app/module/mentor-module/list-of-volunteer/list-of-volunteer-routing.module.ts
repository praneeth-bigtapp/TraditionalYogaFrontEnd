import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VolunteerIntrestedComponent } from './volunteer-intrested/volunteer-intrested.component';

const routes: Routes = [{path:'volunteerIntrested', component:VolunteerIntrestedComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListOfVolunteerRoutingModule { }
