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
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { DataStorageService } from './shared/services/data-storage.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './core/services/auth/auth.service';
import { DatePipe, APP_BASE_HREF, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BnNgIdleService } from 'bn-ng-idle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserIdleModule } from 'angular-user-idle';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DashboardModule } from './module/admin-module/admin-dashboard/dashboard.module';
import { AdministrationModule } from './module/admin-module/admin-management/admin-management.module';
import { CoursesModule } from './module/admin-module/course-management/course-media/courses.module';
import { BlacklistUserModule } from './module/admin-module/user-management/blacklist-user/blacklist-user.module';
import { DialogComponent } from './shared/components/dialog/dialog.component';
import { DndDirective } from './shared/directives/dnd.directive';
import { SendReceiveService } from './shared/services/send-receive.service';

@NgModule({
  declarations: [
    AppComponent,
    DndDirective,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    CoreModule,
    AdministrationModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatDatepickerModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatNativeDateModule,

    // StudentMasterModule,
    DashboardModule,
  
    BlacklistUserModule,
    CoursesModule,
    SharedModule,
    HttpClientModule,
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
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, DataStorageService, SendReceiveService, AuthGuard, DatePipe, BnNgIdleService],
  // providers: [{ provide: APP_BASE_HREF, useValue: 'dm' }, { provide: LocationStrategy, useClass: HashLocationStrategy }, DataStorageService, SendReceiveService, AuthGuard, ViewDataService, DatePipe, BnNgIdleService],
  // providers: [{ provide: APP_BASE_HREF, useValue: '/inv/dm' }, DataStorageService, SendReceiveService, AuthGuard, ViewDataService, DatePipe, BnNgIdleService],
  // providers: [{ provide: APP_BASE_HREF, useValue: 'dm' }, DataStorageService, SendReceiveService, AuthGuard, ViewDataService, DatePipe, BnNgIdleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
