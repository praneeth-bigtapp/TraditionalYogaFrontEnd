import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MycourseMaterialComponent } from './mycourse-material/mycourse-material.component';



const routes: Routes = [
  { path: 'cousermaterial', component: MycourseMaterialComponent }
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyCourseMaterialRoutingModule {
}