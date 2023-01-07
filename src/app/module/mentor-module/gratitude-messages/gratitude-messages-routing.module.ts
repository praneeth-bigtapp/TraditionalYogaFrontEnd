import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GratitudeSummaryComponent } from './gratitude-summary/gratitude-summary.component';

const routes: Routes = [
  {
    path: "gratitudeSummary", component: GratitudeSummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GratitudeMessagesRoutingModule { }
