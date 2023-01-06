import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PearlwidsomComponent } from './pearlwidsom.component';

const routes: Routes = [
  {
    path: 'pearlofwidsom',
    component: PearlwidsomComponent
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PearlWidsomRoutingModule { }
