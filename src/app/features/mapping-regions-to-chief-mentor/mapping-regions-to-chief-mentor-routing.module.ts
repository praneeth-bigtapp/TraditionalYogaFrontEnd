import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MappingRegionsToChiefMentorComponent } from './mapping-regions-to-chief-mentor/mapping-regions-to-chief-mentor.component';

const routes: Routes = [{path:'mappingregionstoCM', component:MappingRegionsToChiefMentorComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MappingRegionsToChiefMentorRoutingModule { }
