import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LoginService } from './login/services/login.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangePasswordService } from './change-password/Service/change-password.service';
import { RegisterComponent } from './register/register.component';
import { BlankComponent } from './blank/blank.component';

@NgModule({
  declarations: [
    LoginComponent,
    ChangePasswordComponent,
    RegisterComponent,
    BlankComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  providers: [LoginService, ChangePasswordService]
})
export class AuthModule { }
