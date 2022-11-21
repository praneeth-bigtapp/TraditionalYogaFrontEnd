import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BannersComponent } from './banners/banners.component';

const routes: Routes = [
  {path:'banners', component:BannersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
 
exports: [RouterModule]
})
export class BannerMainRoutingModule { }
