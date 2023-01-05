import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GratitudeMessageComponent } from './gratitude-message/gratitude-message.component';

const routes: Routes = [{path:'gratitudemessage', component:GratitudeMessageComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GratitudemessageRoutingModule { }
