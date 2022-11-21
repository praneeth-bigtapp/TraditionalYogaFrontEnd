import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOfPracticeLibrarysComponent } from './list-of-practice-librarys/list-of-practice-librarys.component';

const routes: Routes = [{path:'list-of-practice-library', component:ListOfPracticeLibrarysComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListOfPracticeLibraryRoutingModule { }
