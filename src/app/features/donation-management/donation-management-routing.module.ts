import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonationManagementComponent } from './donation-management/donation-management.component';
import { DonationviewdetailsComponent } from './donationviewdetails/donationviewdetails.component';

const routes: Routes = [
  { path: 'donationManagement', component: DonationManagementComponent },
  { path: "viewdonation/:id", component: DonationviewdetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonationManagementRoutingModule { }
