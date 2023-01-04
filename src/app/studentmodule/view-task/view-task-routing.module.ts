import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatusTaskComponent } from './status-task/status-task.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';

const routes: Routes = [
  { path: 'viewtask', component: ViewtaskComponent },
  { path: 'statusTask', component: StatusTaskComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewTaskRoutingModule { }
