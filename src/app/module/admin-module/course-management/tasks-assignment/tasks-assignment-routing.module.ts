import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksAssignmentModule } from './tasks-assignment.module';
import { TasksComponent } from './tasks.component';

const routes: Routes = [
  {
    path: "tasks", component: TasksComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksAssignmentRoutingModule { }
