import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/auth/auth.service';
import { ManageExemptionCourseComponent } from './manage-exemption-course/manage-exemption-course.component';
import { WorldWideApplicationsComponent } from './world-wide-applications/world-wide-applications.component';

const routes: Routes = [
  {
    path: 'worldWide',
    canActivate: [AuthGuard],
    component: WorldWideApplicationsComponent
  },
  {
    path: 'manageCourseExemptions',
    canActivate: [AuthGuard],
    component: ManageExemptionCourseComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorldWideRoutingModule { }
