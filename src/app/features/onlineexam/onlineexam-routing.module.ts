import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlineexamComponent } from './onlineexam/onlineexam.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  { path: "onlineexam", component: OnlineexamComponent },
  { path: "tasks", component: TasksComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnlineexamRoutingModule { }
