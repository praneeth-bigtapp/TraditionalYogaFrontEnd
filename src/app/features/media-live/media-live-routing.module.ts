import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiveComponent } from './live/live.component';

const routes: Routes = [
  
    {path:'classmedia', component:LiveComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
 
exports: [RouterModule]
})
export class MediaLiveRoutingModule { }
