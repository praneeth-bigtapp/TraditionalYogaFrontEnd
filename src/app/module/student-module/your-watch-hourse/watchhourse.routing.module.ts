import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchHourseComponent } from './watch-hourse/watch-hourse.component';


const routes: Routes = [
  { path: 'watchhourse', component: WatchHourseComponent }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WatchhourRoutingModule {
}