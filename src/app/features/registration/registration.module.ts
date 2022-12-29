import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { StudentenrollmentComponent } from './studentenrollment/studentenrollment.component';
import { DetailsStudentInformationComponent } from './details-student-information/details-student-information.component';


@NgModule({
  declarations: [
    StudentenrollmentComponent,
    DetailsStudentInformationComponent,
  ],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatDialogModule,



  ]
})
export class RegistrationModule { }
