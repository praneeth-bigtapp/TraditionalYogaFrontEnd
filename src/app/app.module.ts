import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AdministrationModule } from './features/administration/administration.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { DataStorageService } from './shared/services/data-storage.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { SecurityMasterModule } from './features/security-master/security-master.module';
import { StaticDataUploadModule } from './features/static-data-upload/static-data-upload.module';
import { DndDirective } from './dnd.directive';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SendReceiveService } from './shared/services/sendReceive.service';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './core/services/auth/auth.service';
import { ViewDataService } from './features/view-data/service/view-data.service';
import { DatePipe, APP_BASE_HREF, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BnNgIdleService } from 'bn-ng-idle';
import { DialogComponent } from './dialog/dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ViewDataComponent } from './features/view-data/view-data.component';
import { UserIdleModule } from 'angular-user-idle';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { StudentMasterModule } from './features/student-master/student-master.module';
import { BannerModule } from './features/banner/banner.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CoursesModule } from './features/courses/courses.module';
import { BlacklistUserModule } from './features/blacklist-user/blacklist-user.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    ViewDataComponent,
    DndDirective,
    DialogComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,

    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatDatepickerModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatNativeDateModule,

    AdministrationModule,


    // StudentMasterModule,
    DashboardModule,
    BlacklistUserModule,
    BannerModule,
    CoursesModule,
    SharedModule,
    CoreModule,
    HttpClientModule,
    SecurityMasterModule,
    StaticDataUploadModule,
    MatPaginatorModule,
    MatCardModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatRadioModule,
    MatTableModule,
    MatDialogModule,
    // NglrxPipesModule,
    ToastrModule.forRoot(),
    MatButtonModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    UserIdleModule.forRoot({ idle: 600, timeout: 300, ping: 120 })
  ],
  // providers: [DataStorageService, SendReceiveService, AuthGuard, ViewDataService, DatePipe, BnNgIdleService],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, DataStorageService, SendReceiveService, AuthGuard, ViewDataService, DatePipe, BnNgIdleService],
  // providers: [{ provide: APP_BASE_HREF, useValue: 'dm' }, { provide: LocationStrategy, useClass: HashLocationStrategy }, DataStorageService, SendReceiveService, AuthGuard, ViewDataService, DatePipe, BnNgIdleService],
  // providers: [{ provide: APP_BASE_HREF, useValue: '/inv/dm' }, DataStorageService, SendReceiveService, AuthGuard, ViewDataService, DatePipe, BnNgIdleService],
  // providers: [{ provide: APP_BASE_HREF, useValue: 'dm' }, DataStorageService, SendReceiveService, AuthGuard, ViewDataService, DatePipe, BnNgIdleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
