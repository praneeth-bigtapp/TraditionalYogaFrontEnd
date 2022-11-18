import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlacklistUsersComponent } from './blacklist-users/blacklist-users.component';

const routes: Routes = [{path:'blacklistuser', component:BlacklistUsersComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlacklistUserRoutingModule { }
