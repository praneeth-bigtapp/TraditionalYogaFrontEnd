import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepliesGurujiComponent } from './replies-guruji/replies-guruji.component';



const routes: Routes = [
  { path: 'repliesguriji', component: RepliesGurujiComponent }
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepliesGurujiRoutingModule {
}