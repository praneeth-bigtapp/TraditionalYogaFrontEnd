import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegioncreationComponent } from './regioncreation.component';

const routes: Routes = [
  {
    path: 'regioncreation',
    component: RegioncreationComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegionManagementRoutingModule { }
