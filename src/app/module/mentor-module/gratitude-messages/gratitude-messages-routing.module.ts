import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GratitudeMessageExclusiveComponent } from './gratitude-message-exclusive/gratitude-message-exclusive.component';
import { GratitudeMessageInformedDeniedComponent } from './gratitude-message-informed-denied/gratitude-message-informed-denied.component';
import { GratitudeSummaryComponent } from './gratitude-summary/gratitude-summary.component';
import { GratitudeUnreadMessagesComponent } from './gratitude-unread-messages/gratitude-unread-messages.component';

const routes: Routes = [
  {
    path: "gratitudeSummary", component: GratitudeSummaryComponent
  },
  {
    path: "gratitudeUnreadMessages/:id", component: GratitudeUnreadMessagesComponent
  },
  {
    path: "gratitudeInformed&Denied/:id", component: GratitudeMessageInformedDeniedComponent
  },
  {
    path: "gratitudeMessageExclusive", component: GratitudeMessageExclusiveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GratitudeMessagesRoutingModule { }
