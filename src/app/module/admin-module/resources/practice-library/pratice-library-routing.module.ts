import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePraticeLibraryComponent } from './create-pratice-library/create-pratice-library.component';

const routes: Routes = [{
  path: "createpraticelibrary", component: CreatePraticeLibraryComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PraticeLibraryRoutingModule { }
