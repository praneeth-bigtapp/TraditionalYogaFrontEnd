import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewstudentRoutingModule } from './viewstudent-routing.module';
import { StudentprofileComponent } from './studentprofile/studentprofile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProfiletabComponent } from './profiletab/profiletab.component';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { CourseprofiletabComponent } from './courseprofiletab/courseprofiletab.component';
import { DonationTabComponent } from './donation-tab/donation-tab.component';
import { EpurchaseInformationComponent } from './epurchase-information/epurchase-information.component';
import { VolunteeringDetailsComponent } from './volunteering-details/volunteering-details.component';
import { PerformanceDetailsComponent } from './performance-details/performance-details.component';


@NgModule({
  declarations: [
    StudentprofileComponent,
    ProfiletabComponent,
    CourseprofiletabComponent,
    DonationTabComponent,
    EpurchaseInformationComponent,
    VolunteeringDetailsComponent,
    PerformanceDetailsComponent
  ],
  imports: [
    CommonModule,
    ViewstudentRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatRadioModule,


  ]
})
export class ViewstudentModule { }
