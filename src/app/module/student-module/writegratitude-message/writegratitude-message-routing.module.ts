import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WriteGratitudeComponent } from './write-gratitude/write-gratitude.component';

const routes: Routes = [{path:'writegratitude', component:WriteGratitudeComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WritegratitudeMessageRoutingModule { }
