import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddpagesComponent } from './addpages/addpages.component';

const routes: Routes = [
  {path:'addpages',component:AddpagesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddpagesRoutingModule { }
