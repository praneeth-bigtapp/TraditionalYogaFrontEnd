import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonationManagementComponent } from './donation-management/donation-management.component';

const routes: Routes = [{path:'Donation_Management', component:DonationManagementComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonationManagementRoutingModule { }
