import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateScripcturesComponent } from './create-scripctures/create-scripctures.component';

const routes: Routes = [
  { path: "createscriptures", component: CreateScripcturesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScripcturesRoutingModule { }
