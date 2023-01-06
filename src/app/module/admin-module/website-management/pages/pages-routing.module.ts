import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddpagesComponent } from './addpages/addpages.component';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [ { path: 'pages', component: PagesComponent },
{path:'addpages',component:AddpagesComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
