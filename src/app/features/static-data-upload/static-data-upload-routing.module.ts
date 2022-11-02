import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetMixReportComponent } from './asset-mix-report/asset-mix-report.component';
import { EntityRelatedComponent } from './entity-related/entity-related.component';
import { ReportStaticDataComponent } from './report-static-data/report-static-data.component';
import { StaticReferenceComponent } from './static-reference/static-reference.component';

const routes: Routes = [
  { path: 'entityRelated', component: EntityRelatedComponent },
  { path: 'staticReference', component: StaticReferenceComponent },
  { path: 'reportStaticData', component: ReportStaticDataComponent },
  { path: 'assetMixReport', component: AssetMixReportComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticDataUploadRoutingModule { }
