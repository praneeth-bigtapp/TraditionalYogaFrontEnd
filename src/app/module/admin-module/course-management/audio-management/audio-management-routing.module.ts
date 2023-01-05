import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AudioComponent } from './audio/audio.component';

const routes: Routes = [

  {path:'audio', component:AudioComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
 
exports: [RouterModule]
})
export class AudioMainRoutingModule { }
