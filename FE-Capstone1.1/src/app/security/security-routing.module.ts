import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AccessDeniedComponent} from './access-denied/access-denied.component';
import {VerifiResetPasswordComponent} from './verifi-reset-password/verifi-reset-password.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';



const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'verify-reset-password', component: VerifiResetPasswordComponent},
  {path: 'auth/access-denied', component: AccessDeniedComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
