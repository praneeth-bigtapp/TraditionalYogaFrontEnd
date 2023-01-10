import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorldWideApplicationsComponent } from './world-wide-applications/world-wide-applications.component';

const routes: Routes = [
  {path:'worldWide', component:WorldWideApplicationsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorldWideRoutingModule { }
