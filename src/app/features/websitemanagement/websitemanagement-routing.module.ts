import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HidemyoptionComponent } from './hidemyoption/hidemyoption.component';
import { PearlwidsomComponent } from './pearlwidsom/pearlwidsom.component';

const routes: Routes = [{
  path: "hidemenuoption", component: HidemyoptionComponent
},
{ path: "pearlofwidsom", component: PearlwidsomComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsitemanagementRoutingModule { }
