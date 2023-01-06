import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { FilterDirective } from './directives/filter.directive';
import { InvalidRecordsComponent } from './components/invalid-records/invalid-records.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { DialogPopupComponent } from './components/dialog-popup/dialog-popup.component';
import { OtpComponent } from './components/otp/otp.component';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [
    DialogPopupComponent,
    FilterDirective,
    InvalidRecordsComponent,
    UploadFileComponent,
    NotificationComponent,
    OtpComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    // StaticDataUploadRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTooltipModule,
  ],
  exports: [DialogPopupComponent, FilterDirective, InvalidRecordsComponent, UploadFileComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }