import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MappingRegionsToChiefMentorComponent } from './mapping-regions-to-chief-mentor/mapping-regions-to-chief-mentor.component';
import { RegioncreationComponent } from './regioncreation/regioncreation.component';

const routes: Routes = [
  { path: 'mappingregionstoCheifMentor', component: MappingRegionsToChiefMentorComponent },
  { path: "regioncreation", component: RegioncreationComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MappingRegionsToChiefMentorRoutingModule { }
