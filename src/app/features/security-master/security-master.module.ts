import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityMasterRoutingModule } from './security-master-routing.module';
import { MasterDataCreationComponent } from './master-data-creation/master-data-creation.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { StaticMasterComponent } from './static-master/static-master.component';
import { AdHocBloombergRequestComponent } from './ad-hoc-bloomberg-request/ad-hoc-bloomberg-request.component';
import { AlternatePEComponent } from './alternate-pe/alternate-pe.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [
    MasterDataCreationComponent,
    StaticMasterComponent,
    AdHocBloombergRequestComponent,
    AlternatePEComponent
  ],
  imports: [
    CommonModule,
    SecurityMasterRoutingModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    SharedModule

  ],
  providers: [MasterDataCreationComponent]
})
export class SecurityMasterModule { }
