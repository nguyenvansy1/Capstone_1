import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminRoutingModule} from './admin/admin-routing.module';
import {LoginComponent} from './security/login/login.component';



const routes: Routes = [
  {path: 'login' , component: LoginComponent},
  {path: '' , redirectTo: '/login' , pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AdminRoutingModule ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
