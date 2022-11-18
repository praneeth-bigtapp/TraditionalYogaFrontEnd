import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BannerAddComponent } from './banner-add/banner-add.component';

const routes: Routes = [
  { path: 'addbanner', component: BannerAddComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BannerRoutingModule { }
