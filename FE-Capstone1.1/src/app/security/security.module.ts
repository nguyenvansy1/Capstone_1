import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { VerifiResetPasswordComponent } from './verifi-reset-password/verifi-reset-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {NotifierModule} from 'angular-notifier';


@NgModule({
    declarations: [LoginComponent, AccessDeniedComponent, VerifiResetPasswordComponent, ResetPasswordComponent],
    exports: [
        LoginComponent
    ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NotifierModule
  ]
})
export class SecurityModule { }
