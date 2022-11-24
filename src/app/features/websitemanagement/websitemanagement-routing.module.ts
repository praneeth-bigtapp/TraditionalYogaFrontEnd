import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HidemyoptionComponent } from './hidemyoption/hidemyoption.component';

const routes: Routes = [{
  path: "hidemenuoption", component: HidemyoptionComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsitemanagementRoutingModule { }
