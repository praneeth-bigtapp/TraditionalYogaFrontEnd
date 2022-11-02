import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdHocBloombergRequestComponent } from './ad-hoc-bloomberg-request/ad-hoc-bloomberg-request.component';
import { AlternatePEComponent } from './alternate-pe/alternate-pe.component';
import { MasterDataCreationComponent } from './master-data-creation/master-data-creation.component';
import { StaticMasterComponent } from './static-master/static-master.component';

const routes: Routes = [
  { path: 'dataCreation/Update', component: MasterDataCreationComponent },
  { path: 'staticMaster', component: StaticMasterComponent },
  { path: 'ad-hocBloombergRequest', component: AdHocBloombergRequestComponent },
  { path: 'alternativePE', component: AlternatePEComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityMasterRoutingModule { }
