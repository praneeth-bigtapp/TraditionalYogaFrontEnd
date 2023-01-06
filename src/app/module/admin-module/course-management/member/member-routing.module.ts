import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberspageComponent } from './memberspage/memberspage.component';

const routes: Routes = [
  { path: "memberspage", component: MemberspageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
