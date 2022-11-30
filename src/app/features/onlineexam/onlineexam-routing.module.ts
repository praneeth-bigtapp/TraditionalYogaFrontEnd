import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlineexamComponent } from './onlineexam/onlineexam.component';

const routes: Routes = [
  { path: "onlineexam", component: OnlineexamComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnlineexamRoutingModule { }
