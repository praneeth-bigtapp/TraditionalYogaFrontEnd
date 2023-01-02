import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewtaskComponent } from './viewtask/viewtask.component';

const routes: Routes = [{path:'viewtask', component:ViewtaskComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewTaskRoutingModule { }
