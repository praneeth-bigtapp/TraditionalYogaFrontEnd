import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageExemptionCourseComponent } from './manage-exemption-course/manage-exemption-course.component';
import { WorldWideApplicationsComponent } from './world-wide-applications/world-wide-applications.component';

const routes: Routes = [
  { path: 'worldWide', component: WorldWideApplicationsComponent },
  { path: 'manageCourseExemptions', component: ManageExemptionCourseComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorldWideRoutingModule { }
